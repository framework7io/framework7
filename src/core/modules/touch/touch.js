import { window, document } from 'ssr-window';
import $ from 'dom7';
import Support from '../../utils/support';
import Device from '../../utils/device';

function initTouch() {
  const app = this;
  const params = app.params.touch;
  const useRipple = params[`${app.theme}TouchRipple`];

  if (Device.ios && Device.webView) {
    // Strange hack required for iOS 8 webview to work on inputs
    window.addEventListener('touchstart', () => {});
  }

  let touchStartX;
  let touchStartY;
  let touchStartTime;
  let targetElement;
  let trackClick;
  let activeSelection;
  let scrollParent;
  let lastClickTime;
  let isMoved;
  let tapHoldFired;
  let tapHoldTimeout;
  let preventClick;

  let activableElement;
  let activeTimeout;

  let needsFastClick;
  let needsFastClickTimeOut;

  let rippleWave;
  let rippleTarget;
  let rippleTimeout;

  function findActivableElement(el) {
    const target = $(el);
    const parents = target.parents(params.activeStateElements);
    let activable;
    if (target.is(params.activeStateElements)) {
      activable = target;
    }
    if (parents.length > 0) {
      activable = activable ? activable.add(parents) : parents;
    }
    if (activable && activable.length > 1) {
      const newActivable = [];
      let preventPropagation;
      for (let i = 0; i < activable.length; i += 1) {
        if (!preventPropagation) {
          newActivable.push(activable[i]);
          if (activable.eq(i).hasClass('prevent-active-state-propagation')
            || activable.eq(i).hasClass('no-active-state-propagation')
          ) {
            preventPropagation = true;
          }
        }
      }
      activable = $(newActivable);
    }
    return activable || target;
  }

  function isInsideScrollableViewLight(el) {
    const pageContent = el.parents('.page-content');
    return pageContent.length > 0;
  }
  function isInsideScrollableView(el) {
    const pageContent = el.parents('.page-content');

    if (pageContent.length === 0) {
      return false;
    }

    // This event handler covers the "tap to stop scrolling".
    if (pageContent.prop('scrollHandlerSet') !== 'yes') {
      pageContent.on('scroll', () => {
        clearTimeout(activeTimeout);
        clearTimeout(rippleTimeout);
      });
      pageContent.prop('scrollHandlerSet', 'yes');
    }

    return true;
  }
  function addActive() {
    if (!activableElement) return;
    activableElement.addClass('active-state');
  }
  function removeActive() {
    if (!activableElement) return;
    activableElement.removeClass('active-state');
    activableElement = null;
  }
  function isFormElement(el) {
    const nodes = ('input select textarea label').split(' ');
    if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) return true;
    return false;
  }
  function androidNeedsBlur(el) {
    const noBlur = ('button input textarea select').split(' ');
    if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
      if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
        return false;
      }
      return true;
    }
    return false;
  }
  function targetNeedsFastClick(el) {
    /*
    if (
      Device.ios
      &&
      (
        Device.osVersion.split('.')[0] > 9
        ||
        (Device.osVersion.split('.')[0] * 1 === 9 && Device.osVersion.split('.')[1] >= 1)
      )
    ) {
      return false;
    }
    */
    const $el = $(el);
    if (el.nodeName.toLowerCase() === 'input' && (el.type === 'file' || el.type === 'range')) return false;
    if (el.nodeName.toLowerCase() === 'select' && Device.android) return false;
    if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
    if (params.fastClicksExclude && $el.closest(params.fastClicksExclude).length > 0) return false;

    return true;
  }
  function targetNeedsFocus(el) {
    if (document.activeElement === el) {
      return false;
    }
    const tag = el.nodeName.toLowerCase();
    const skipInputs = ('button checkbox file image radio submit').split(' ');
    if (el.disabled || el.readOnly) return false;
    if (tag === 'textarea') return true;
    if (tag === 'select') {
      if (Device.android) return false;
      return true;
    }
    if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
    return false;
  }
  function targetNeedsPrevent(el) {
    const $el = $(el);
    let prevent = true;
    if ($el.is('label') || $el.parents('label').length > 0) {
      if (Device.android) {
        prevent = false;
      } else if (Device.ios && $el.is('input')) {
        prevent = true;
      } else prevent = false;
    }
    return prevent;
  }

  // Ripple handlers
  function findRippleElement(el) {
    const rippleElements = params.touchRippleElements;
    const $el = $(el);
    if ($el.is(rippleElements)) {
      if ($el.hasClass('no-ripple')) {
        return false;
      }
      return $el;
    }
    if ($el.parents(rippleElements).length > 0) {
      const rippleParent = $el.parents(rippleElements).eq(0);
      if (rippleParent.hasClass('no-ripple')) {
        return false;
      }
      return rippleParent;
    }
    return false;
  }
  function createRipple($el, x, y) {
    if (!$el) return;
    rippleWave = app.touchRipple.create($el, x, y);
  }

  function removeRipple() {
    if (!rippleWave) return;
    rippleWave.remove();
    rippleWave = undefined;
    rippleTarget = undefined;
  }
  function rippleTouchStart(el) {
    rippleTarget = findRippleElement(el);
    if (!rippleTarget || rippleTarget.length === 0) {
      rippleTarget = undefined;
      return;
    }
    const inScrollable = params.fastClicks
      ? isInsideScrollableView(rippleTarget)
      : isInsideScrollableViewLight(rippleTarget);

    if (!inScrollable) {
      createRipple(rippleTarget, touchStartX, touchStartY);
    } else {
      rippleTimeout = setTimeout(() => {
        createRipple(rippleTarget, touchStartX, touchStartY);
      }, 80);
    }
  }
  function rippleTouchMove() {
    clearTimeout(rippleTimeout);
    removeRipple();
  }
  function rippleTouchEnd() {
    if (rippleWave) {
      removeRipple();
    } else if (rippleTarget && !isMoved) {
      clearTimeout(rippleTimeout);
      createRipple(rippleTarget, touchStartX, touchStartY);
      setTimeout(removeRipple, 0);
    } else {
      removeRipple();
    }
  }

  // Mouse Handlers
  function handleMouseDown(e) {
    findActivableElement(e.target).addClass('active-state');
    if ('which' in e && e.which === 3) {
      setTimeout(() => {
        $('.active-state').removeClass('active-state');
      }, 0);
    }
    if (useRipple) {
      touchStartX = e.pageX;
      touchStartY = e.pageY;
      rippleTouchStart(e.target, e.pageX, e.pageY);
    }
  }
  function handleMouseMove() {
    $('.active-state').removeClass('active-state');
    if (useRipple) {
      rippleTouchMove();
    }
  }
  function handleMouseUp() {
    $('.active-state').removeClass('active-state');
    if (useRipple) {
      rippleTouchEnd();
    }
  }

  // Send Click
  function sendClick(e) {
    const touch = e.changedTouches[0];
    const evt = document.createEvent('MouseEvents');
    let eventType = 'click';
    if (Device.android && targetElement.nodeName.toLowerCase() === 'select') {
      eventType = 'mousedown';
    }
    evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    evt.forwardedTouchEvent = true;

    if (app.device.ios && window.navigator.standalone) {
      // Fix the issue happens in iOS home screen apps where the wrong element is selected during a momentum scroll.
      // Upon tapping, we give the scrolling time to stop, then we grab the element based where the user tapped.
      setTimeout(() => {
        targetElement = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
        if (targetElement) {
          targetElement.dispatchEvent(evt);
        }
      }, 10);
    } else {
      targetElement.dispatchEvent(evt);
    }
  }

  // Touch Handlers
  function handleTouchStart(e) {
    isMoved = false;
    tapHoldFired = false;
    if (e.targetTouches.length > 1) {
      if (activableElement) removeActive();
      return true;
    }
    if (e.touches.length > 1 && activableElement) {
      removeActive();
    }
    if (params.tapHold) {
      if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
      tapHoldTimeout = setTimeout(() => {
        if (e && e.touches && e.touches.length > 1) return;
        tapHoldFired = true;
        e.preventDefault();
        $(e.target).trigger('taphold');
      }, params.tapHoldDelay);
    }
    if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
    needsFastClick = targetNeedsFastClick(e.target);

    if (!needsFastClick) {
      trackClick = false;
      return true;
    }
    if (Device.ios || (Device.android && 'getSelection' in window)) {
      const selection = window.getSelection();
      if (
        selection.rangeCount
        && selection.focusNode !== document.body
        && (!selection.isCollapsed || document.activeElement === selection.focusNode)
      ) {
        activeSelection = true;
        return true;
      }

      activeSelection = false;
    }
    if (Device.android) {
      if (androidNeedsBlur(e.target)) {
        document.activeElement.blur();
      }
    }

    trackClick = true;
    targetElement = e.target;
    touchStartTime = (new Date()).getTime();
    touchStartX = e.targetTouches[0].pageX;
    touchStartY = e.targetTouches[0].pageY;

    // Detect scroll parent
    if (Device.ios) {
      scrollParent = undefined;
      $(targetElement).parents().each(() => {
        const parent = this;
        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
          scrollParent = parent;
          scrollParent.f7ScrollTop = scrollParent.scrollTop;
        }
      });
    }
    if ((touchStartTime - lastClickTime) < params.fastClicksDelayBetweenClicks) {
      e.preventDefault();
    }

    if (params.activeState) {
      activableElement = findActivableElement(targetElement);
      activeTimeout = setTimeout(addActive, 0);
    }
    if (useRipple) {
      rippleTouchStart(targetElement, touchStartX, touchStartY);
    }
    return true;
  }
  function handleTouchMove(e) {
    if (!trackClick) return;
    const distance = params.fastClicksDistanceThreshold;
    if (distance) {
      const pageX = e.targetTouches[0].pageX;
      const pageY = e.targetTouches[0].pageY;
      if (Math.abs(pageX - touchStartX) > distance || Math.abs(pageY - touchStartY) > distance) {
        isMoved = true;
      }
    } else {
      isMoved = true;
    }
    if (isMoved) {
      trackClick = false;
      targetElement = null;
      isMoved = true;
      if (params.tapHold) {
        clearTimeout(tapHoldTimeout);
      }
      if (params.activeState) {
        clearTimeout(activeTimeout);
        removeActive();
      }
      if (useRipple) {
        rippleTouchMove();
      }
    }
  }
  function handleTouchEnd(e) {
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);

    const touchEndTime = (new Date()).getTime();

    if (!trackClick) {
      if (!activeSelection && needsFastClick) {
        if (!(Device.android && !e.cancelable) && e.cancelable) {
          e.preventDefault();
        }
      }
      if (params.activeState) removeActive();
      if (useRipple) {
        rippleTouchEnd();
      }
      return true;
    }

    if (document.activeElement === e.target) {
      if (params.activeState) removeActive();
      if (useRipple) {
        rippleTouchEnd();
      }
      return true;
    }

    if (!activeSelection) {
      e.preventDefault();
    }

    if ((touchEndTime - lastClickTime) < params.fastClicksDelayBetweenClicks) {
      setTimeout(removeActive, 0);
      if (useRipple) {
        rippleTouchEnd();
      }
      return true;
    }

    lastClickTime = touchEndTime;

    trackClick = false;

    if (Device.ios && scrollParent) {
      if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
        return false;
      }
    }

    // Add active-state here because, in a very fast tap, the timeout didn't
    // have the chance to execute. Removing active-state in a timeout gives
    // the chance to the animation execute.
    if (params.activeState) {
      addActive();
      setTimeout(removeActive, 0);
    }
    // Remove Ripple
    if (useRipple) {
      rippleTouchEnd();
    }

    // Trigger focus when required
    if (targetNeedsFocus(targetElement)) {
      if (Device.ios && Device.webView) {
        targetElement.focus();
        return false;
      }

      targetElement.focus();
    }

    // Blur active elements
    if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
      document.activeElement.blur();
    }

    // Send click
    e.preventDefault();
    if (params.tapHoldPreventClicks && tapHoldFired) {
      return false;
    }
    sendClick(e);
    return false;
  }
  function handleTouchCancel() {
    trackClick = false;
    targetElement = null;

    // Remove Active State
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);
    if (params.activeState) {
      removeActive();
    }

    // Remove Ripple
    if (useRipple) {
      rippleTouchEnd();
    }
  }

  function handleClick(e) {
    let allowClick = false;
    if (trackClick) {
      targetElement = null;
      trackClick = false;
      return true;
    }
    if ((e.target.type === 'submit' && e.detail === 0) || e.target.type === 'file') {
      return true;
    }
    if (!targetElement) {
      if (!isFormElement(e.target)) {
        allowClick = true;
      }
    }
    if (!needsFastClick) {
      allowClick = true;
    }
    if (document.activeElement === targetElement) {
      allowClick = true;
    }
    if (e.forwardedTouchEvent) {
      allowClick = true;
    }
    if (!e.cancelable) {
      allowClick = true;
    }
    if (params.tapHold && params.tapHoldPreventClicks && tapHoldFired) {
      allowClick = false;
    }
    if (!allowClick) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      if (targetElement) {
        if (targetNeedsPrevent(targetElement) || isMoved) {
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
      targetElement = null;
    }
    needsFastClickTimeOut = setTimeout(() => {
      needsFastClick = false;
    }, (Device.ios || Device.androidChrome ? 100 : 400));

    if (params.tapHold) {
      tapHoldTimeout = setTimeout(() => {
        tapHoldFired = false;
      }, (Device.ios || Device.androidChrome ? 100 : 400));
    }

    return allowClick;
  }

  function handleTouchStartLight(e) {
    isMoved = false;
    tapHoldFired = false;
    preventClick = false;
    if (e.targetTouches.length > 1) {
      if (activableElement) removeActive();
      return true;
    }
    if (e.touches.length > 1 && activableElement) {
      removeActive();
    }
    if (params.tapHold) {
      if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
      tapHoldTimeout = setTimeout(() => {
        if (e && e.touches && e.touches.length > 1) return;
        tapHoldFired = true;
        e.preventDefault();
        preventClick = true;
        $(e.target).trigger('taphold');
      }, params.tapHoldDelay);
    }
    targetElement = e.target;
    touchStartX = e.targetTouches[0].pageX;
    touchStartY = e.targetTouches[0].pageY;

    if (params.activeState) {
      activableElement = findActivableElement(targetElement);
      if (!isInsideScrollableViewLight(activableElement)) {
        addActive();
      } else {
        activeTimeout = setTimeout(addActive, 80);
      }
    }
    if (useRipple) {
      rippleTouchStart(targetElement, touchStartX, touchStartY);
    }
    return true;
  }
  function handleTouchMoveLight(e) {
    let distance = 0;
    let touch;
    if (e.type === 'touchmove') {
      touch = e.targetTouches[0];
      if (touch && touch.touchType === 'stylus') {
        distance = 5;
      }
    }

    if (distance && touch) {
      const pageX = touch.pageX;
      const pageY = touch.pageY;
      if (Math.abs(pageX - touchStartX) > distance || Math.abs(pageY - touchStartY) > distance) {
        isMoved = true;
      }
    } else {
      isMoved = true;
    }
    if (isMoved) {
      preventClick = true;
      if (params.tapHold) {
        clearTimeout(tapHoldTimeout);
      }
      if (params.activeState) {
        clearTimeout(activeTimeout);
        removeActive();
      }
      if (useRipple) {
        rippleTouchMove();
      }
    }
  }
  function handleTouchEndLight(e) {
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);
    if (document.activeElement === e.target) {
      if (params.activeState) removeActive();
      if (useRipple) {
        rippleTouchEnd();
      }
      return true;
    }
    if (params.activeState) {
      addActive();
      setTimeout(removeActive, 0);
    }
    if (useRipple) {
      rippleTouchEnd();
    }
    if ((params.tapHoldPreventClicks && tapHoldFired) || preventClick) {
      if (e.cancelable) e.preventDefault();
      preventClick = true;
      return false;
    }
    return true;
  }
  function handleClickLight(e) {
    let localPreventClick = preventClick;
    if (targetElement && e.target !== targetElement) {
      localPreventClick = true;
    }
    if (params.tapHold && params.tapHoldPreventClicks && tapHoldFired) {
      localPreventClick = true;
    }
    if (localPreventClick) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
    }

    if (params.tapHold) {
      tapHoldTimeout = setTimeout(
        () => {
          tapHoldFired = false;
        },
        (Device.ios || Device.androidChrome ? 100 : 400)
      );
    }
    preventClick = false;
    targetElement = null;

    return !localPreventClick;
  }

  function emitAppTouchEvent(name, e) {
    app.emit({
      events: name,
      data: [e],
    });
  }
  function appClick(e) {
    emitAppTouchEvent('click', e);
  }
  function appTouchStartActive(e) {
    emitAppTouchEvent('touchstart touchstart:active', e);
  }
  function appTouchMoveActive(e) {
    emitAppTouchEvent('touchmove touchmove:active', e);
  }
  function appTouchEndActive(e) {
    emitAppTouchEvent('touchend touchend:active', e);
  }
  function appTouchStartPassive(e) {
    emitAppTouchEvent('touchstart:passive', e);
  }
  function appTouchMovePassive(e) {
    emitAppTouchEvent('touchmove:passive', e);
  }
  function appTouchEndPassive(e) {
    emitAppTouchEvent('touchend:passive', e);
  }

  const passiveListener = Support.passiveListener ? { passive: true } : false;
  const activeListener = Support.passiveListener ? { passive: false } : false;

  document.addEventListener('click', appClick, true);

  if (Support.passiveListener) {
    document.addEventListener(app.touchEvents.start, appTouchStartActive, activeListener);
    document.addEventListener(app.touchEvents.move, appTouchMoveActive, activeListener);
    document.addEventListener(app.touchEvents.end, appTouchEndActive, activeListener);

    document.addEventListener(app.touchEvents.start, appTouchStartPassive, passiveListener);
    document.addEventListener(app.touchEvents.move, appTouchMovePassive, passiveListener);
    document.addEventListener(app.touchEvents.end, appTouchEndPassive, passiveListener);
  } else {
    document.addEventListener(app.touchEvents.start, (e) => {
      appTouchStartActive(e);
      appTouchStartPassive(e);
    }, false);
    document.addEventListener(app.touchEvents.move, (e) => {
      appTouchMoveActive(e);
      appTouchMovePassive(e);
    }, false);
    document.addEventListener(app.touchEvents.end, (e) => {
      appTouchEndActive(e);
      appTouchEndPassive(e);
    }, false);
  }

  if (Support.touch) {
    if (params.fastClicks) {
      app.on('click', handleClick);
      app.on('touchstart', handleTouchStart);
      app.on('touchmove', handleTouchMove);
      app.on('touchend', handleTouchEnd);
    } else {
      app.on('click', handleClickLight);
      app.on('touchstart', handleTouchStartLight);
      app.on('touchmove', handleTouchMoveLight);
      app.on('touchend', handleTouchEndLight);
    }

    document.addEventListener('touchcancel', handleTouchCancel, { passive: true });
  } else if (params.activeState) {
    app.on('touchstart', handleMouseDown);
    app.on('touchmove', handleMouseMove);
    app.on('touchend', handleMouseUp);
  }
  document.addEventListener('contextmenu', (e) => {
    if (params.disableContextMenu && (Device.ios || Device.android || Device.cordova)) {
      e.preventDefault();
    }
    if (useRipple) {
      if (activableElement) removeActive();
      rippleTouchEnd();
    }
  });
}

export default {
  name: 'touch',
  params: {
    touch: {
      // Fast clicks
      fastClicks: false,
      fastClicksDistanceThreshold: 10,
      fastClicksDelayBetweenClicks: 50,
      fastClicksExclude: '', // CSS selector
      // ContextMenu
      disableContextMenu: false,
      // Tap Hold
      tapHold: false,
      tapHoldDelay: 750,
      tapHoldPreventClicks: true,
      // Active State
      activeState: true,
      activeStateElements: 'a, button, label, span, .actions-button, .stepper-button, .stepper-button-plus, .stepper-button-minus, .card-expandable, .menu-item',
      mdTouchRipple: true,
      iosTouchRipple: false,
      auroraTouchRipple: false,
      touchRippleElements: '.ripple, .link, .item-link, .list-button, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell:not(.input-cell), .notification-close-button, .stepper-button, .stepper-button-minus, .stepper-button-plus, .menu-item-content',
    },
  },
  instance: {
    touchEvents: {
      start: Support.touch ? 'touchstart' : 'mousedown',
      move: Support.touch ? 'touchmove' : 'mousemove',
      end: Support.touch ? 'touchend' : 'mouseup',
    },
  },
  on: {
    init: initTouch,
  },
};
