/* eslint-disable no-nested-ternary */
import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { getSupport } from '../../shared/get-support.js';
import { getDevice } from '../../shared/get-device.js';
import { extend } from '../../shared/utils.js';

function initTouch() {
  const app = this;
  const device = getDevice();
  const support = getSupport();
  const window = getWindow();
  const document = getDocument();
  const params = app.params.touch;
  const useRipple = params[`${app.theme}TouchRipple`];

  if (device.ios && device.webView) {
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
          if (
            activable.eq(i).hasClass('prevent-active-state-propagation') ||
            activable.eq(i).hasClass('no-active-state-propagation')
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
    rippleWave = app.touchRipple.create(app, $el, x, y);
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
    if (!params.activeStateOnMouseMove) {
      $('.active-state').removeClass('active-state');
    }
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

  let isScrolling;
  let isSegmentedStrong = false;
  let segmentedStrongEl = null;

  const touchMoveActivableIos = '.dialog-button, .actions-button';
  let isTouchMoveActivable = false;
  let touchmoveActivableEl = null;

  function handleTouchStart(e) {
    isMoved = false;
    tapHoldFired = false;
    preventClick = false;
    isScrolling = undefined;
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
    isSegmentedStrong = e.target.closest(
      '.segmented-strong .button-active, .segmented-strong .tab-link-active',
    );
    isTouchMoveActivable = app.theme === 'ios' && e.target.closest(touchMoveActivableIos);
    if (isSegmentedStrong) {
      segmentedStrongEl = isSegmentedStrong.closest('.segmented-strong');
    }

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
    let shouldRemoveActive = true;

    if (e.type === 'touchmove') {
      touch = e.targetTouches[0];
      distance = params.touchClicksDistanceThreshold;
    }

    const touchCurrentX = e.targetTouches[0].pageX;
    const touchCurrentY = e.targetTouches[0].pageY;

    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(
        isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX)
      );
    }

    if (isTouchMoveActivable || (!isScrolling && isSegmentedStrong && segmentedStrongEl)) {
      if (e.cancelable) e.preventDefault();
    }

    if (!isScrolling && isSegmentedStrong && segmentedStrongEl) {
      const elementFromPoint = document.elementFromPoint(
        e.targetTouches[0].clientX,
        e.targetTouches[0].clientY,
      );
      const buttonEl = elementFromPoint.closest(
        '.segmented-strong .button:not(.button-active):not(.tab-link-active)',
      );
      if (buttonEl && segmentedStrongEl.contains(buttonEl)) {
        $(buttonEl).trigger('click', 'f7Segmented');
        targetElement = buttonEl;
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
      // Keep active state on touchMove (for dialog and actions buttons)
      if (isTouchMoveActivable) {
        const elementFromPoint = document.elementFromPoint(
          e.targetTouches[0].clientX,
          e.targetTouches[0].clientY,
        );
        touchmoveActivableEl = elementFromPoint.closest(touchMoveActivableIos);
        if (
          touchmoveActivableEl &&
          activableElement &&
          activableElement[0] === touchmoveActivableEl
        ) {
          shouldRemoveActive = false;
        } else if (touchmoveActivableEl) {
          setTimeout(() => {
            activableElement = findActivableElement(touchmoveActivableEl);
            addActive();
          });
        }
      }
      if (params.tapHold) {
        clearTimeout(tapHoldTimeout);
      }
      if (params.activeState && shouldRemoveActive) {
        clearTimeout(activeTimeout);
        removeActive();
      }
      if (useRipple) {
        rippleTouchMove();
      }
    }
  }
  function handleTouchEnd(e) {
    isScrolling = undefined;
    isSegmentedStrong = false;
    segmentedStrongEl = null;
    isTouchMoveActivable = false;
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);
    if (touchmoveActivableEl) {
      $(touchmoveActivableEl).trigger('click', 'f7TouchMoveActivable');
      touchmoveActivableEl = null;
    }
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
    const isSegmented = e && e.detail && e.detail === 'f7Segmented';
    // eslint-disable-next-line
    const isTouchMoveActivable = e && e.detail && e.detail === 'f7TouchMoveActivable';
    let localPreventClick = preventClick;
    if (targetElement && e.target !== targetElement) {
      if (isOverswipe || isSegmented || isTouchMoveActivable) {
        localPreventClick = false;
      } else {
        localPreventClick = true;
      }
    } else if (isTouchMoveActivable) {
      localPreventClick = false;
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
        device.ios || device.androidChrome ? 100 : 400,
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

  const passiveListener = support.passiveListener ? { passive: true } : false;
  const passiveListenerCapture = support.passiveListener ? { passive: true, capture: true } : true;
  const activeListener = support.passiveListener ? { passive: false } : false;
  const activeListenerCapture = support.passiveListener ? { passive: false, capture: true } : true;

  document.addEventListener('click', appClick, true);

  if (support.passiveListener) {
    document.addEventListener(app.touchEvents.start, appTouchStartActive, activeListenerCapture);
    document.addEventListener(app.touchEvents.move, appTouchMoveActive, activeListener);
    document.addEventListener(app.touchEvents.end, appTouchEndActive, activeListener);

    document.addEventListener(app.touchEvents.start, appTouchStartPassive, passiveListenerCapture);
    document.addEventListener(app.touchEvents.move, appTouchMovePassive, passiveListener);
    document.addEventListener(app.touchEvents.end, appTouchEndPassive, passiveListener);
  } else {
    document.addEventListener(
      app.touchEvents.start,
      (e) => {
        appTouchStartActive(e);
        appTouchStartPassive(e);
      },
      true,
    );
    document.addEventListener(
      app.touchEvents.move,
      (e) => {
        appTouchMoveActive(e);
        appTouchMovePassive(e);
      },
      false,
    );
    document.addEventListener(
      app.touchEvents.end,
      (e) => {
        appTouchEndActive(e);
        appTouchEndPassive(e);
      },
      false,
    );
  }

  if (support.touch) {
    app.on('click', handleClick);
    app.on('touchstart', handleTouchStart);
    app.on('touchmove', handleTouchMove);
    app.on('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true });
  } else if (params.activeState) {
    app.on('touchstart', handleMouseDown);
    app.on('touchmove', handleMouseMove);
    app.on('touchend', handleMouseUp);
    document.addEventListener('pointercancel', handleMouseUp, { passive: true });
  }
  document.addEventListener('contextmenu', (e) => {
    if (
      params.disableContextMenu &&
      (device.ios ||
        device.android ||
        device.cordova ||
        (window.Capacitor && window.Capacitor.isNative))
    ) {
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
      activeStateElements:
        'a, button, label, span, .actions-button, .stepper-button, .stepper-button-plus, .stepper-button-minus, .card-expandable, .menu-item, .link, .item-link, .accordion-item-toggle',
      activeStateOnMouseMove: false,
      mdTouchRipple: true,
      iosTouchRipple: false,
      touchRippleElements:
        '.ripple, .link, .item-link, .list label.item-content, .list-button, .links-list a, .button, button, .input-clear-button, .dialog-button, .tab-link, .item-radio, .item-checkbox, .actions-button, .searchbar-disable-button, .fab a, .checkbox, .radio, .data-table .sortable-cell:not(.input-cell), .notification-close-button, .stepper-button, .stepper-button-minus, .stepper-button-plus, .menu-item-content, .list.accordion-list .accordion-item-toggle',
      touchRippleInsetElements:
        '.ripple-inset, .icon-only, .searchbar-disable-button, .input-clear-button, .notification-close-button, .md .navbar .link.back',
    },
  },
  create() {
    const app = this;
    const support = getSupport();
    extend(app, {
      touchEvents: {
        start: support.touch ? 'touchstart' : support.pointerEvents ? 'pointerdown' : 'mousedown',
        move: support.touch ? 'touchmove' : support.pointerEvents ? 'pointermove' : 'mousemove',
        end: support.touch ? 'touchend' : support.pointerEvents ? 'pointerup' : 'mouseup',
      },
    });
  },
  on: {
    init: initTouch,
  },
};
