/* eslint-disable no-nested-ternary */
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
  let targetElement;
  let isMoved;
  let tapHoldFired;
  let tapHoldTimeout;
  let preventClick;

  let activableElement;
  let activeTimeout;

  let rippleWave;
  let rippleTarget;
  let rippleTimeout;

  function findActivableElement(el) {
    const target = $(el);
    const parents = target.parents(params.activeStateElements);
    if (target.closest('.no-active-state').length) {
      return null;
    }
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

  function isInsideScrollableView(el) {
    const pageContent = el.parents('.page-content');
    return pageContent.length > 0;
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
    const inScrollable = isInsideScrollableView(rippleTarget);

    if (!inScrollable) {
      removeRipple();
      createRipple(rippleTarget, touchStartX, touchStartY);
    } else {
      clearTimeout(rippleTimeout);
      rippleTimeout = setTimeout(() => {
        removeRipple();
        createRipple(rippleTarget, touchStartX, touchStartY);
      }, 80);
    }
  }
  function rippleTouchMove() {
    clearTimeout(rippleTimeout);
    removeRipple();
  }
  function rippleTouchEnd() {
    if (!rippleWave && rippleTarget && !isMoved) {
      clearTimeout(rippleTimeout);
      createRipple(rippleTarget, touchStartX, touchStartY);
      setTimeout(removeRipple, 0);
    } else {
      removeRipple();
    }
  }

  // Mouse Handlers
  function handleMouseDown(e) {
    const $activableEl = findActivableElement(e.target);
    if ($activableEl) {
      $activableEl.addClass('active-state');
      if ('which' in e && e.which === 3) {
        setTimeout(() => {
          $('.active-state').removeClass('active-state');
        }, 0);
      }
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

  function handleTouchCancel() {
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

  function handleTouchStart(e) {
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
        $(e.target).trigger('taphold', e);
        app.emit('taphold', e);
      }, params.tapHoldDelay);
    }
    targetElement = e.target;
    touchStartX = e.targetTouches[0].pageX;
    touchStartY = e.targetTouches[0].pageY;

    if (params.activeState) {
      activableElement = findActivableElement(targetElement);
      if (activableElement && !isInsideScrollableView(activableElement)) {
        addActive();
      } else if (activableElement) {
        activeTimeout = setTimeout(addActive, 80);
      }
    }
    if (useRipple) {
      rippleTouchStart(targetElement, touchStartX, touchStartY);
    }
    return true;
  }
  function handleTouchMove(e) {
    let touch;
    let distance;
    if (e.type === 'touchmove') {
      touch = e.targetTouches[0];
      distance = params.touchClicksDistanceThreshold;
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
  function handleTouchEnd(e) {
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
  function handleClick(e) {
    const isOverswipe = e && e.detail && e.detail === 'f7Overswipe';
    let localPreventClick = preventClick;
    if (targetElement && e.target !== targetElement) {
      if (isOverswipe) {
        localPreventClick = false;
      } else {
        localPreventClick = true;
      }
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
  function appGestureActive(e) {
    emitAppTouchEvent(`${e.type} ${e.type}:active`, e);
  }
  function appGesturePassive(e) {
    emitAppTouchEvent(`${e.type}:passive`, e);
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
    if (Support.touch && Support.gestures) {
      document.addEventListener('gesturestart', appGestureActive, activeListener);
      document.addEventListener('gesturechange', appGestureActive, activeListener);
      document.addEventListener('gestureend', appGestureActive, activeListener);

      document.addEventListener('gesturestart', appGesturePassive, passiveListener);
      document.addEventListener('gesturechange', appGesturePassive, passiveListener);
      document.addEventListener('gestureend', appGesturePassive, passiveListener);
    }
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
    if (Support.touch && Support.gestures) {
      document.addEventListener('gesturestart', (e) => {
        appGestureActive(e);
        appGesturePassive(e);
      }, false);
      document.addEventListener('gesturechange', (e) => {
        appGestureActive(e);
        appGesturePassive(e);
      }, false);
      document.addEventListener('gestureend', (e) => {
        appGestureActive(e);
        appGesturePassive(e);
      }, false);
    }
  }

  if (Support.touch) {
    app.on('click', handleClick);
    app.on('touchstart', handleTouchStart);
    app.on('touchmove', handleTouchMove);
    app.on('touchend', handleTouchEnd);
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
      // Clicks
      touchClicksDistanceThreshold: 5,
      // ContextMenu
      disableContextMenu: false,
      // Tap Hold
      tapHold: false,
      tapHoldDelay: 750,
      tapHoldPreventClicks: true,
      // Active State
      activeState: true,
      activeStateElements: 'a, button, label, span, .actions-button, .stepper-button, .stepper-button-plus, .stepper-button-minus, .card-expandable, .menu-item, .link, .item-link',
      mdTouchRipple: true,
      iosTouchRipple: false,
      auroraTouchRipple: false,
      touchRippleElements: '.ripple, .link, .item-link, .list-button, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell:not(.input-cell), .notification-close-button, .stepper-button, .stepper-button-minus, .stepper-button-plus, .menu-item-content',
    },
  },
  instance: {
    touchEvents: {
      start: Support.touch ? 'touchstart' : (Support.pointerEvents ? 'pointerdown' : 'mousedown'),
      move: Support.touch ? 'touchmove' : (Support.pointerEvents ? 'pointermove' : 'mousemove'),
      end: Support.touch ? 'touchend' : (Support.pointerEvents ? 'pointerup' : 'mouseup'),
    },
  },
  on: {
    init: initTouch,
  },
};
