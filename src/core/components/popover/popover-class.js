import { getWindow, getDocument } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { extend } from '../../shared/utils.js';
import { getDevice } from '../../shared/get-device.js';
import Modal from '../modal/modal-class.js';

class Popover extends Modal {
  constructor(app, params) {
    const extendedParams = extend({ on: {} }, app.params.popover, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const popover = this;

    const device = getDevice();
    const window = getWindow();
    const document = getDocument();

    popover.params = extendedParams;

    // Find Element
    let $el;
    if (!popover.params.el) {
      $el = $(popover.params.content)
        .filter((node) => node.nodeType === 1)
        .eq(0);
    } else {
      $el = $(popover.params.el).eq(0);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    // Find Target
    const $targetEl = $(popover.params.targetEl).eq(0);

    if ($el.length === 0) {
      return popover.destroy();
    }

    // Backdrop
    let $backdropEl;
    const forceBackdropUnique =
      popover.params.backdrop &&
      app.$el.find('.popover.modal-in').filter((anotherPopoverEl) => anotherPopoverEl !== $el[0])
        .length > 0;
    if (popover.params.backdrop && popover.params.backdropEl) {
      $backdropEl = $(popover.params.backdropEl);
    } else if (popover.params.backdrop) {
      if (popover.params.backdropUnique || forceBackdropUnique) {
        $backdropEl = $('<div class="popover-backdrop popover-backdrop-unique"></div>');
        $backdropEl[0].f7PopoverRef = popover;
        popover.$containerEl.append($backdropEl);
      } else {
        $backdropEl = popover.$containerEl.children('.popover-backdrop');
      }
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="popover-backdrop"></div>');
        popover.$containerEl.append($backdropEl);
      }
    }

    // Find Arrow
    let $arrowEl;
    if ($el.find('.popover-arrow').length === 0 && popover.params.arrow) {
      $arrowEl = $('<div class="popover-arrow"></div>');
      $el.prepend($arrowEl);
    } else {
      $arrowEl = $el.find('.popover-arrow');
    }

    // Open
    const originalOpen = popover.open;

    extend(popover, {
      app,
      $el,
      el: $el[0],
      $targetEl,
      targetEl: $targetEl[0],
      $arrowEl,
      arrowEl: $arrowEl[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popover',
      forceBackdropUnique,
      open(...args) {
        let [targetEl, animate] = args;
        if (typeof args[0] === 'boolean') [animate, targetEl] = args;
        if (targetEl) {
          popover.$targetEl = $(targetEl);
          popover.targetEl = popover.$targetEl[0];
        }
        return originalOpen.call(popover, animate);
      },
    });

    function handleResize() {
      popover.resize();
    }
    popover.on('popoverOpen', () => {
      popover.resize();
      app.on('resize', handleResize);
      $(window).on('keyboardDidShow keyboardDidHide', handleResize);
      popover.on('popoverClose popoverBeforeDestroy', () => {
        app.off('resize', handleResize);
        $(window).off('keyboardDidShow keyboardDidHide', handleResize);
      });
    });

    let touchStartTarget = null;
    function handleTouchStart(e) {
      touchStartTarget = e.target;
    }

    function handleClick(e) {
      const target = e.target;
      const $target = $(target);
      const keyboardOpened =
        !device.desktop &&
        device.cordova &&
        ((window.Keyboard && window.Keyboard.isVisible) ||
          (window.cordova.plugins &&
            window.cordova.plugins.Keyboard &&
            window.cordova.plugins.Keyboard.isVisible));
      if (keyboardOpened) return;
      if ($target.closest(popover.el).length === 0) {
        if (
          popover.params.closeByBackdropClick &&
          popover.params.backdrop &&
          popover.backdropEl &&
          popover.backdropEl === target &&
          touchStartTarget === target
        ) {
          popover.close();
        } else if (popover.params.closeByOutsideClick && touchStartTarget === target) {
          const isAnotherPopoverBackdrop =
            ($target.hasClass('popover-backdrop-unique') && target.f7PopoverRef !== popover) ||
            ($target.hasClass('popover-backdrop') && target !== popover.backdropEl);
          const isAnotherPopoverTarget =
            target.closest('.popover') && target.closest('.popover') !== popover.$el[0];
          if (!isAnotherPopoverBackdrop && !isAnotherPopoverTarget) {
            popover.close();
          }
        }
      }
    }

    function onKeyDown(e) {
      const keyCode = e.keyCode;
      if (keyCode === 27 && popover.params.closeOnEscape) {
        popover.close();
      }
    }

    if (popover.params.closeOnEscape) {
      popover.on('popoverOpen', () => {
        $(document).on('keydown', onKeyDown);
      });
      popover.on('popoverClose', () => {
        $(document).off('keydown', onKeyDown);
      });
    }

    popover.on('popoverOpened', () => {
      if (popover.params.closeByOutsideClick || popover.params.closeByBackdropClick) {
        app.on('touchstart', handleTouchStart);
        app.on('click', handleClick);
      }
    });
    popover.on('popoverClose', () => {
      if (popover.params.closeByOutsideClick || popover.params.closeByBackdropClick) {
        app.off('touchstart', handleTouchStart);
        app.off('click', handleClick);
      }
    });

    $el[0].f7Modal = popover;

    return popover;
  }

  resize() {
    const popover = this;
    const { app, $el, $targetEl, $arrowEl } = popover;
    const { targetX, targetY, verticalPosition } = popover.params;
    $el.css({ left: '', top: '' });
    const [width, height] = [$el.width(), $el.height()];
    let arrowSize = 0;
    let arrowLeft;
    let arrowTop;
    const hasArrow = $arrowEl.length > 0;
    const arrowMin = app.theme === 'ios' ? 13 : 24;
    if (hasArrow) {
      $arrowEl.removeClass('on-left on-right on-top on-bottom').css({ left: '', top: '' });
      arrowSize = $arrowEl.width() / 2;
    }
    $el
      .removeClass(
        'popover-on-left popover-on-right popover-on-top popover-on-bottom popover-on-middle',
      )
      .css({ left: '', top: '' });

    let targetWidth;
    let targetHeight;
    let targetOffsetLeft;
    let targetOffsetTop;
    let safeAreaTop = parseInt($('html').css('--f7-safe-area-top'), 10);
    let safeAreaLeft = parseInt($('html').css('--f7-safe-area-left'), 10);
    let safeAreaRight = parseInt($('html').css('--f7-safe-area-right'), 10);
    if (Number.isNaN(safeAreaTop)) safeAreaTop = 0;
    if (Number.isNaN(safeAreaLeft)) safeAreaLeft = 0;
    if (Number.isNaN(safeAreaRight)) safeAreaRight = 0;
    if ($targetEl && $targetEl.length > 0) {
      targetWidth = $targetEl.outerWidth();
      targetHeight = $targetEl.outerHeight();

      const targetOffset = $targetEl.offset();
      targetOffsetLeft = targetOffset.left - app.left;
      targetOffsetTop = targetOffset.top - app.top;

      const targetParentPage = $targetEl.parents('.page');
      if (targetParentPage.length > 0) {
        targetOffsetTop -= targetParentPage[0].scrollTop;
      }
    } else if (typeof targetX !== 'undefined' && targetY !== 'undefined') {
      targetOffsetLeft = targetX;
      targetOffsetTop = targetY;
      targetWidth = popover.params.targetWidth || 0;
      targetHeight = popover.params.targetHeight || 0;
    }

    let [left, top, diff] = [0, 0, 0];
    // Top Position
    const forcedPosition = verticalPosition === 'auto' ? false : verticalPosition;
    let position = forcedPosition || 'top';

    if (
      forcedPosition === 'top' ||
      (!forcedPosition && height + arrowSize < targetOffsetTop - safeAreaTop)
    ) {
      // On top
      top = targetOffsetTop - height - arrowSize;
    } else if (
      forcedPosition === 'bottom' ||
      (!forcedPosition && height + arrowSize < app.height - targetOffsetTop - targetHeight)
    ) {
      // On bottom
      position = 'bottom';
      top = targetOffsetTop + targetHeight + arrowSize;
    } else {
      // On middle
      position = 'middle';
      top = targetHeight / 2 + targetOffsetTop - height / 2;
      diff = top;
      top = Math.max(5, Math.min(top, app.height - height - 5));
      diff -= top;
    }

    // Horizontal Position
    if (position === 'top' || position === 'bottom') {
      left = targetWidth / 2 + targetOffsetLeft - width / 2;
      diff = left;
      left = Math.max(5, Math.min(left, app.width - width - 5));
      if (safeAreaLeft) {
        left = Math.max(left, safeAreaLeft);
      }
      if (safeAreaRight && left + width > app.width - 5 - safeAreaRight) {
        left = app.width - 5 - safeAreaRight - width;
      }

      diff -= left;
      if (hasArrow) {
        if (position === 'top') {
          $arrowEl.addClass('on-bottom');
        }
        if (position === 'bottom') {
          $arrowEl.addClass('on-top');
        }
        arrowLeft = width / 2 - arrowSize + diff;
        arrowLeft = Math.max(Math.min(arrowLeft, width - arrowSize * 2 - arrowMin), arrowMin);
        $arrowEl.css({ left: `${arrowLeft}px` });
      }
    } else if (position === 'middle') {
      left = targetOffsetLeft - width - arrowSize;
      if (hasArrow) $arrowEl.addClass('on-right');
      if (left < 5 || left + width + safeAreaRight > app.width || left < safeAreaLeft) {
        if (left < 5) left = targetOffsetLeft + targetWidth + arrowSize;
        if (left + width + safeAreaRight > app.width) left = app.width - width - 5 - safeAreaRight;
        if (left < safeAreaLeft) left = safeAreaLeft;
        if (hasArrow) $arrowEl.removeClass('on-right').addClass('on-left');
      }
      if (hasArrow) {
        arrowTop = height / 2 - arrowSize + diff;
        arrowTop = Math.max(Math.min(arrowTop, height - arrowSize * 2 - arrowMin), arrowMin);
        $arrowEl.css({ top: `${arrowTop}px` });
      }
    }

    // Horizontal Position
    let hPosition;
    if (targetOffsetLeft < app.width / 2) {
      hPosition = 'right';
    } else {
      hPosition = 'left';
    }
    $el.addClass(`popover-on-${position} popover-on-${hPosition}`);

    // Apply Styles
    $el.css({ top: `${top}px`, left: `${left}px` });
  }
}

export default Popover;
