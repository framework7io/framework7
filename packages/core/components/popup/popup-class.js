import $ from 'dom7';
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
      $el,
      el: $el[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popup',
    });

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
    if (popup.params.closeOnEscape) {
      popup.on('popupOpen', () => {
        $(document).on('keydown', onKeyDown);
      });
      popup.on('popupClose', () => {
        $(document).off('keydown', onKeyDown);
      });
    }

    popup.on('popupOpened', () => {
      $el.removeClass('swipe-close-to-bottom swipe-close-to-top');
      if (popup.params.closeByBackdropClick) {
        app.on('click', handleClick);
      }
    });
    popup.on('popupClose', () => {
      if (popup.params.closeByBackdropClick) {
        app.off('click', handleClick);
      }
    });

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
      const direction = touchesDiff < 0 ? 'to-bottom' : 'to-top';
      $el.transition(0);

      if (typeof popup.params.swipeToClose === 'string' && direction !== popup.params.swipeToClose) {
        $el.transform('');
        return;
      }

      if (!isMoved) {
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
            isTouched = false;
            isMoved = false;
            return;
          }
        }
        isMoved = true;
      }
      e.preventDefault();
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
      const direction = touchesDiff < 0 ? 'to-bottom' : 'to-top';
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

    $el[0].f7Modal = popup;

    return popup;
  }
}
export default Popup;
