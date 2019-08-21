import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Popover extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend(
      { on: {} },
      app.params.popover,
      params
    );

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const popover = this;

    popover.params = extendedParams;

    // Find Element
    let $el;
    if (!popover.params.el) {
      $el = $(popover.params.content).filter((elIndex, node) => node.nodeType === 1).eq(0);
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
    if (popover.params.backdrop && popover.params.backdropEl) {
      $backdropEl = $(popover.params.backdropEl);
    } else if (popover.params.backdrop) {
      $backdropEl = app.root.children('.popover-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="popover-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    // Find Angle
    let $angleEl;
    if ($el.find('.popover-angle').length === 0) {
      $angleEl = $('<div class="popover-angle"></div>');
      $el.prepend($angleEl);
    } else {
      $angleEl = $el.find('.popover-angle');
    }

    // Open
    const originalOpen = popover.open;

    Utils.extend(popover, {
      app,
      $el,
      el: $el[0],
      $targetEl,
      targetEl: $targetEl[0],
      $angleEl,
      angleEl: $angleEl[0],
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'popover',
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

    function handleClick(e) {
      const target = e.target;
      const $target = $(target);
      const keyboardOpened = !app.device.desktop && app.device.cordova && ((window.Keyboard && window.Keyboard.isVisible) || (window.cordova.plugins && window.cordova.plugins.Keyboard && window.cordova.plugins.Keyboard.isVisible));
      if (keyboardOpened) return;
      if ($target.closest(popover.el).length === 0) {
        if (
          popover.params.closeByBackdropClick
          && popover.params.backdrop
          && popover.backdropEl
          && popover.backdropEl === target
        ) {
          popover.close();
        } else if (popover.params.closeByOutsideClick) {
          popover.close();
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
        app.on('click', handleClick);
      }
    });
    popover.on('popoverClose', () => {
      if (popover.params.closeByOutsideClick || popover.params.closeByBackdropClick) {
        app.off('click', handleClick);
      }
    });

    $el[0].f7Modal = popover;

    return popover;
  }

  resize() {
    const popover = this;
    const { app, $el, $targetEl, $angleEl } = popover;
    const { targetX, targetY } = popover.params;
    $el.css({ left: '', top: '' });
    const [width, height] = [$el.width(), $el.height()];
    let angleSize = 0;
    let angleLeft;
    let angleTop;
    if (app.theme === 'ios' || app.theme === 'aurora') {
      $angleEl.removeClass('on-left on-right on-top on-bottom').css({ left: '', top: '' });
      angleSize = $angleEl.width() / 2;
    } else {
      $el.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom popover-on-middle').css({ left: '', top: '' });
    }

    let targetWidth;
    let targetHeight;
    let targetOffsetLeft;
    let targetOffsetTop;
    let safeAreaTop = parseInt($('html').css('--f7-safe-area-top'), 10);
    if (Number.isNaN(safeAreaTop)) safeAreaTop = 0;
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
    let position = app.theme === 'md' ? 'bottom' : 'top';
    if (app.theme === 'md') {
      if (height < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop + targetHeight;
      } else if (height < targetOffsetTop - safeAreaTop) {
        // On top
        top = targetOffsetTop - height;
        position = 'top';
      } else {
        // On middle
        position = 'middle';
        top = ((targetHeight / 2) + targetOffsetTop) - (height / 2);
      }
      top = Math.max(8, Math.min(top, app.height - height - 8));

      // Horizontal Position
      let hPosition;
      if (targetOffsetLeft < app.width / 2) {
        hPosition = 'right';
        left = position === 'middle'
          ? targetOffsetLeft + targetWidth
          : targetOffsetLeft;
      } else {
        hPosition = 'left';
        left = position === 'middle'
          ? targetOffsetLeft - width
          : (targetOffsetLeft + targetWidth) - width;
      }
      left = Math.max(8, Math.min(left, app.width - width - 8));
      $el.addClass(`popover-on-${position} popover-on-${hPosition}`);
    } else {
      // ios and aurora
      if ((height + angleSize) < targetOffsetTop - safeAreaTop) {
        // On top
        top = targetOffsetTop - height - angleSize;
      } else if ((height + angleSize) < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop + targetHeight + angleSize;
      } else {
        // On middle
        position = 'middle';
        top = ((targetHeight / 2) + targetOffsetTop) - (height / 2);
        diff = top;
        top = Math.max(5, Math.min(top, app.height - height - 5));
        diff -= top;
      }

      // Horizontal Position
      if (position === 'top' || position === 'bottom') {
        left = ((targetWidth / 2) + targetOffsetLeft) - (width / 2);
        diff = left;
        left = Math.max(5, Math.min(left, app.width - width - 5));
        if (position === 'top') {
          $angleEl.addClass('on-bottom');
        }
        if (position === 'bottom') {
          $angleEl.addClass('on-top');
        }
        diff -= left;
        angleLeft = ((width / 2) - angleSize) + diff;
        angleLeft = Math.max(Math.min(angleLeft, width - (angleSize * 2) - 13), 13);
        $angleEl.css({ left: `${angleLeft}px` });
      } else if (position === 'middle') {
        left = targetOffsetLeft - width - angleSize;
        $angleEl.addClass('on-right');
        if (left < 5 || (left + width > app.width)) {
          if (left < 5) left = targetOffsetLeft + targetWidth + angleSize;
          if (left + width > app.width) left = app.width - width - 5;
          $angleEl.removeClass('on-right').addClass('on-left');
        }
        angleTop = ((height / 2) - angleSize) + diff;
        angleTop = Math.max(Math.min(angleTop, height - (angleSize * 2) - 13), 13);
        $angleEl.css({ top: `${angleTop}px` });
      }
    }

    // Apply Styles
    $el.css({ top: `${top}px`, left: `${left}px` });
  }
}

export default Popover;
