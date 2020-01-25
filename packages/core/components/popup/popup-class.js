import $ from 'dom7';
import { window, document } from 'ssr-window';
import Utils from '../../utils/utils';
import Support from '../../utils/support';
import Modal from '../modal/modal-class';

class Popup extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend(
      { on: {} },
      app.params.popup,
      params
    );

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const popup = this;

    popup.params = extendedParams;

    // Find Element
    let $el;
    if (!popup.params.el) {
      $el = $(popup.params.content).filter((elIndex, node) => node.nodeType === 1).eq(0);
    } else {
      $el = $(popup.params.el).eq(0);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return popup.destroy();
    }

    let $backdropEl;
    if (popup.params.backdrop && popup.params.backdropEl) {
      $backdropEl = $(popup.params.backdropEl);
    } else if (popup.params.backdrop) {
      $backdropEl = app.root.children('.popup-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="popup-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    Utils.extend(popup, {
      app,
      push: $el.hasClass('popup-push') || popup.params.push,
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popup',
      $htmlEl: $('html'),
    });

    if (popup.params.push) {
      $el.addClass('popup-push');
    }

    function handleClick(e) {
      const target = e.target;
      const $target = $(target);
      const keyboardOpened = !app.device.desktop && app.device.cordova && ((window.Keyboard && window.Keyboard.isVisible) || (window.cordova.plugins && window.cordova.plugins.Keyboard && window.cordova.plugins.Keyboard.isVisible));
      if (keyboardOpened) return;
      if ($target.closest(popup.el).length === 0) {
        if (
          popup.params
          && popup.params.closeByBackdropClick
          && popup.params.backdrop
          && popup.backdropEl
          && popup.backdropEl === target
        ) {
          let needToClose = true;
          popup.$el.nextAll('.popup.modal-in').each((index, popupEl) => {
            const popupInstance = popupEl.f7Modal;
            if (!popupInstance) return;
            if (
              popupInstance.params.closeByBackdropClick
              && popupInstance.params.backdrop
              && popupInstance.backdropEl === popup.backdropEl
            ) {
              needToClose = false;
            }
          });
          if (needToClose) {
            popup.close();
          }
        }
      }
    }

    function onKeyDown(e) {
      const keyCode = e.keyCode;
      if (keyCode === 27 && popup.params.closeOnEscape) {
        popup.close();
      }
    }

    let pushOffset;
    let isPush;

    function pushViewScale(offset) {
      return (app.height - offset * 2) / app.height;
    }

    let allowSwipeToClose = true;
    let isTouched = false;
    let startTouch;
    let currentTouch;
    let isScrolling;
    let touchStartTime;
    let touchesDiff;
    let isMoved = false;
    let pageContentEl;
    let pageContentScrollTop;
    let pageContentOffsetHeight;
    let pageContentScrollHeight;
    let popupHeight;
    let $pushViewEl;

    function handleTouchStart(e) {
      if (isTouched || !allowSwipeToClose || !popup.params.swipeToClose) return;
      if (popup.params.swipeHandler && $(e.target).closest(popup.params.swipeHandler).length === 0) {
        return;
      }
      isTouched = true;
      isMoved = false;
      startTouch = {
        x: e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX,
        y: e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY,
      };
      touchStartTime = Utils.now();
      isScrolling = undefined;
      if (!popup.params.swipeHandler && e.type === 'touchstart') {
        pageContentEl = $(e.target).closest('.page-content')[0];
      }
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      currentTouch = {
        x: e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX,
        y: e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY,
      };

      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(currentTouch.x - startTouch.x) > Math.abs(currentTouch.y - startTouch.y));
      }
      if (isScrolling) {
        isTouched = false;
        isMoved = false;
        return;
      }

      touchesDiff = startTouch.y - currentTouch.y;
      if (isPush && pushOffset && touchesDiff > 0) {
        touchesDiff = 0;
      }
      const direction = touchesDiff < 0 ? 'to-bottom' : 'to-top';
      $el.transition(0);

      if (typeof popup.params.swipeToClose === 'string' && direction !== popup.params.swipeToClose) {
        $el.transform('');
        $el.transition('');
        return;
      }

      if (!isMoved) {
        if (isPush && pushOffset) {
          popupHeight = $el[0].offsetHeight;
          $pushViewEl = app.root.children('.view, .views');
        }
        if (pageContentEl) {
          pageContentScrollTop = pageContentEl.scrollTop;
          pageContentScrollHeight = pageContentEl.scrollHeight;
          pageContentOffsetHeight = pageContentEl.offsetHeight;
          if (
            !(pageContentScrollHeight === pageContentOffsetHeight)
            && !(direction === 'to-bottom' && pageContentScrollTop === 0)
            && !(direction === 'to-top' && pageContentScrollTop === (pageContentScrollHeight - pageContentOffsetHeight))
          ) {
            $el.transform('');
            $el.transition('');
            isTouched = false;
            isMoved = false;
            return;
          }
        }
        isMoved = true;
      }
      e.preventDefault();
      if (isPush && pushOffset) {
        const pushProgress = 1 - Math.abs(touchesDiff / popupHeight);
        const scale = 1 - (1 - pushViewScale(pushOffset)) * pushProgress;
        $pushViewEl.transition(0).transform(`translate3d(0,0,0) scale(${scale})`);
      }
      $el.transition(0).transform(`translate3d(0,${-touchesDiff}px,0)`);
    }
    function handleTouchEnd() {
      isTouched = false;
      if (!isMoved) {
        return;
      }
      isMoved = false;
      allowSwipeToClose = false;
      $el.transition('');
      if (isPush && pushOffset) {
        $pushViewEl.transition('').transform('');
      }
      const direction = touchesDiff <= 0 ? 'to-bottom' : 'to-top';
      if ((typeof popup.params.swipeToClose === 'string' && direction !== popup.params.swipeToClose)) {
        $el.transform('');
        allowSwipeToClose = true;
        return;
      }
      const diff = Math.abs(touchesDiff);
      const timeDiff = (new Date()).getTime() - touchStartTime;
      if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
        Utils.nextTick(() => {
          if (direction === 'to-bottom') {
            $el.addClass('swipe-close-to-bottom');
          } else {
            $el.addClass('swipe-close-to-top');
          }
          $el.transform('');
          popup.close();
          allowSwipeToClose = true;
        });
        return;
      }
      allowSwipeToClose = true;
      $el.transform('');
    }

    const passive = Support.passiveListener ? { passive: true } : false;
    if (popup.params.swipeToClose) {
      $el.on(app.touchEvents.start, handleTouchStart, passive);
      app.on('touchmove', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
      popup.once('popupDestroy', () => {
        $el.off(app.touchEvents.start, handleTouchStart, passive);
        app.off('touchmove', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      });
    }

    popup.on('open', () => {
      if (popup.params.closeOnEscape) {
        $(document).on('keydown', onKeyDown);
      }
      if (popup.push) {
        isPush = popup.push && (
          (app.width < 630 || app.height < 630)
          || $el.hasClass('popup-tablet-fullscreen')
        );
      }
      if (isPush) {
        pushOffset = parseInt($el.css('--f7-popup-push-offset'), 10);
        if (Number.isNaN(pushOffset)) pushOffset = 0;
        if (pushOffset) {
          $el.addClass('popup-push');
          popup.$htmlEl.addClass('with-modal-popup-push');
          popup.$htmlEl[0].style.setProperty('--f7-popup-push-scale', pushViewScale(pushOffset));
        }
      }
    });
    popup.on('opened', () => {
      $el.removeClass('swipe-close-to-bottom swipe-close-to-top');
      if (popup.params.closeByBackdropClick) {
        app.on('click', handleClick);
      }
    });
    popup.on('close', () => {
      if (popup.params.closeOnEscape) {
        $(document).off('keydown', onKeyDown);
      }
      if (popup.params.closeByBackdropClick) {
        app.off('click', handleClick);
      }
      if (isPush && pushOffset) {
        popup.$htmlEl.removeClass('with-modal-popup-push');
        popup.$htmlEl.addClass('with-modal-popup-push-closing');
      }
    });
    popup.on('closed', () => {
      if (isPush && pushOffset) {
        popup.$htmlEl.removeClass('with-modal-popup-push-closing');
        popup.$htmlEl[0].style.removeProperty('--f7-popup-push-scale');
      }
    });

    $el[0].f7Modal = popup;

    return popup;
  }
}
export default Popup;
