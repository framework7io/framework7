import $ from 'dom7';

function initTouch() {
  const app = this;
  if (app.params.activeState) {
    $('html').addClass('watch-active-state');
  }
  if (app.device.ios && app.device.webView) {
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

  let activableElement;
  let activeTimeout;

  let needsFastClick;
  let needsFastClickTimeOut;

  let rippleWave;
  let rippleTarget;
  let rippleTransform;
  let rippleTimeout;

  function findActivableElement(el) {
    const target = $(el);
    const parents = target.parents(app.params.activeStateElements);
    let activable;
    if (target.is(app.params.activeStateElements)) {
      activable = target;
    }
    if (parents.length > 0) {
      activable = activable ? activable.add(parents) : parents;
    }
    return activable || target;
  }

  function isInsideScrollableView(el) {
    const pageContent = el.parents('.page-content, .panel');

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
    const $el = $(el);
    if (el.nodeName.toLowerCase() === 'input' && (el.type === 'file' || el.type === 'range')) return false;
    if (el.nodeName.toLowerCase() === 'select' && app.device.android) return false;
    if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
    if (app.params.fastClicksExclude && $el.is(app.params.fastClicksExclude)) return false;
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
      if (app.device.android) return false;
      return true;
    }
    if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
    return false;
  }
  function targetNeedsPrevent(el) {
    const $el = $(el);
    let prevent = true;
    if ($el.is('label') || $el.parents('label').length > 0) {
      if (app.device.android) {
        prevent = false;
      } else if (app.device.ios && $el.is('input')) {
        prevent = true;
      } else prevent = false;
    }
    return prevent;
  }

  // Mouse Handlers
  function handleMouseDown(e) {
    findActivableElement(e.target).addClass('active-state');
    if ('which' in e && e.which === 3) {
      setTimeout(() => {
        $('.active-state').removeClass('active-state');
      }, 0);
    }
    if (app.params.material && app.params.materialRipple) {
      touchStartX = e.pageX;
      touchStartY = e.pageY;
      rippleTouchStart(e.target, e.pageX, e.pageY);
    }
  }
  function handleMouseMove(e) {
    $('.active-state').removeClass('active-state');
    if (app.params.material && app.params.materialRipple) {
      rippleTouchMove();
    }
  }
  function handleMouseUp(e) {
    $('.active-state').removeClass('active-state');
    if (app.params.material && app.params.materialRipple) {
      rippleTouchEnd();
    }
  }

  // Material Touch Ripple Effect
  function findRippleElement(el) {
    const needsRipple = app.params.materialRippleElements;
    const $el = $(el);
    if ($el.is(needsRipple)) {
      if ($el.hasClass('no-ripple')) {
        return false;
      }
      return $el;
    } else if ($el.parents(needsRipple).length > 0) {
      const rippleParent = $el.parents(needsRipple).eq(0);
      if (rippleParent.hasClass('no-ripple')) {
        return false;
      }
      return rippleParent;
    }
    return false;
  }
  function createRipple(x, y, el) {
    if (!el) return;
    const box = el[0].getBoundingClientRect();
    const center = {
      x: x - box.left,
      y: y - box.top,
    };
    const width = box.width;
    const height = box.height;
    const diameter = Math.max(Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48);

    rippleWave = $(`<div class="ripple-wave" style="width: ${diameter}px; height: ${diameter}px; margin-top:-${diameter / 2}px; margin-left:-${diameter / 2}px; left:${center.x}px; top:${center.y}px;"></div>`);
    el.prepend(rippleWave);
    const clientLeft = rippleWave[0].clientLeft;
    rippleTransform = `translate3d(${-center.x + width / 2}px, ${-center.y + height / 2}px, 0) scale(1)`;
    rippleWave.transform(rippleTransform);
  }

  function removeRipple() {
    if (!rippleWave) return;
    const toRemove = rippleWave;

    let removeTimeout = setTimeout(() => {
      toRemove.remove();
    }, 400);

    rippleWave
      .addClass('ripple-wave-fill')
      .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
      .transitionEnd(() => {
        clearTimeout(removeTimeout);

        const $rippleWave = $(this)
          .addClass('ripple-wave-out')
          .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

        removeTimeout = setTimeout(() => {
          $rippleWave.remove();
        }, 700);

        setTimeout(() => {
          $rippleWave.transitionEnd(() => {
            clearTimeout(removeTimeout);
            $(this).remove();
          });
        }, 0);
      });

    rippleWave = undefined;
    rippleTarget = undefined;
  }

  function rippleTouchStart(el) {
    rippleTarget = findRippleElement(el);
    if (!rippleTarget || rippleTarget.length === 0) {
      rippleTarget = undefined;
      return;
    }
    if (!isInsideScrollableView(rippleTarget)) {
      createRipple(touchStartX, touchStartY, rippleTarget);
    } else {
      rippleTimeout = setTimeout(() => {
        createRipple(touchStartX, touchStartY, rippleTarget);
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
      createRipple(touchStartX, touchStartY, rippleTarget);
      setTimeout(removeRipple, 0);
    } else {
      removeRipple();
    }
  }

  // Send Click
  function sendClick(e) {
    const touch = e.changedTouches[0];
    const evt = document.createEvent('MouseEvents');
    let eventType = 'click';
    if (app.device.android && targetElement.nodeName.toLowerCase() === 'select') {
      eventType = 'mousedown';
    }
    evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
    evt.forwardedTouchEvent = true;
    targetElement.dispatchEvent(evt);
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
    if (app.params.tapHold) {
      if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
      tapHoldTimeout = setTimeout(() => {
        if (e && e.touches && e.touches.length > 1) return;
        tapHoldFired = true;
        e.preventDefault();
        $(e.target).trigger('taphold');
      }, app.params.tapHoldDelay);
    }
    if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
    needsFastClick = targetNeedsFastClick(e.target);

    if (!needsFastClick) {
      trackClick = false;
      return true;
    }
    if (app.device.ios || (app.device.android && 'getSelection' in window)) {
      const selection = window.getSelection();
      if (selection.rangeCount && selection.focusNode !== document.body && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
        activeSelection = true;
        return true;
      }

      activeSelection = false;
    }
    if (app.device.android) {
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
    if (app.device.ios) {
      scrollParent = undefined;
      $(targetElement).parents().each(() => {
        const parent = this;
        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
          scrollParent = parent;
          scrollParent.f7ScrollTop = scrollParent.scrollTop;
        }
      });
    }
    if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
      e.preventDefault();
    }

    if (app.params.activeState) {
      activableElement = findActivableElement(targetElement);
          // If it's inside a scrollable view, we don't trigger active-state yet,
          // because it can be a scroll instead. Based on the link:
          // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
      if (!isInsideScrollableView(activableElement)) {
        addActive();
      } else {
        activeTimeout = setTimeout(addActive, 80);
      }
    }
    if (app.params.material && app.params.materialRipple) {
      rippleTouchStart(targetElement, touchStartX, touchStartY);
    }
  }
  function handleTouchMove(e) {
    if (!trackClick) return;
    const distance = app.params.fastClicksDistanceThreshold;
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
      if (app.params.tapHold) {
        clearTimeout(tapHoldTimeout);
      }
      if (app.params.activeState) {
        clearTimeout(activeTimeout);
        removeActive();
      }
      if (app.params.material && app.params.materialRipple) {
        rippleTouchMove();
      }
    }
  }
  function handleTouchEnd(e) {
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);

    if (!trackClick) {
      if (!activeSelection && needsFastClick) {
        if (!(app.device.android && !e.cancelable)) {
          e.preventDefault();
        }
      }
      return true;
    }

    if (document.activeElement === e.target) {
      if (app.params.activeState) removeActive();
      if (app.params.material && app.params.materialRipple) {
        rippleTouchEnd();
      }
      return true;
    }

    if (!activeSelection) {
      e.preventDefault();
    }

    if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
      setTimeout(removeActive, 0);
      return true;
    }

    lastClickTime = e.timeStamp;

    trackClick = false;

    if (app.device.ios && scrollParent) {
      if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
        return false;
      }
    }

    // Add active-state here because, in a very fast tap, the timeout didn't
    // have the chance to execute. Removing active-state in a timeout gives
    // the chance to the animation execute.
    if (app.params.activeState) {
      addActive();
      setTimeout(removeActive, 0);
    }
    // Remove Ripple
    if (app.params.material && app.params.materialRipple) {
      rippleTouchEnd();
    }

      // Trigger focus when required
    if (targetNeedsFocus(targetElement)) {
      if (app.device.ios && app.device.webView) {
        if ((e.timeStamp - touchStartTime) > 159) {
          targetElement = null;
          return false;
        }
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
    sendClick(e);
    return false;
  }
  function handleTouchCancel() {
    trackClick = false;
    targetElement = null;

      // Remove Active State
    clearTimeout(activeTimeout);
    clearTimeout(tapHoldTimeout);
    if (app.params.activeState) {
      removeActive();
    }

      // Remove Ripple
    if (app.params.material && app.params.materialRipple) {
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
    if (app.params.tapHold && app.params.tapHoldPreventClicks && tapHoldFired) {
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
    }, (app.device.ios || app.device.androidChrome ? 100 : 400));

    if (app.params.tapHold) {
      tapHoldTimeout = setTimeout(() => {
        tapHoldFired = false;
      }, (app.device.ios || app.device.androidChrome ? 100 : 400));
    }

    return allowClick;
  }
  if (app.support.touch) {
    document.addEventListener('click', handleClick, true);

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('touchcancel', handleTouchCancel);
  } else if (app.params.activeState) {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }
  if (app.params.material && app.params.materialRipple) {
    document.addEventListener('contextmenu', () => {
      if (activableElement) removeActive();
      rippleTouchEnd();
    });
  }
}

export default {
  name: 'touch',
  params: {
    // Fast clicks
    fastClicks: true,
    fastClicksDistanceThreshold: 10,
    fastClicksDelayBetweenClicks: 50,
    fastClicksExclude: '', // CSS selector
    // Tap Hold
    tapHold: false,
    tapHoldDelay: 750,
    tapHoldPreventClicks: true,
    // Active State
    activeState: true,
    activeStateElements: 'a, button, label, span',
    materialRipple: true,
    materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a, .form-checkbox, .form-radio, .data-table .sortable-cell',
  },
  on: {
    init: initTouch,
  },
};
