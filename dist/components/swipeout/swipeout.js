import $ from 'dom7';
import Utils from '../../utils/utils';

const Swipeout = {
  init() {
    const app = this;
    const touchesStart = {};
    let isTouched;
    let isMoved;
    let isScrolling;
    let touchStartTime;
    let touchesDiff;
    let $swipeoutEl;
    let $swipeoutContent;
    let $actionsRight;
    let $actionsLeft;
    let actionsLeftWidth;
    let actionsRightWidth;
    let translate;
    let opened;
    let openedActionsSide;
    let $leftButtons;
    let $rightButtons;
    let direction;
    let $overswipeLeftButton;
    let $overswipeRightButton;
    let overswipeLeft;
    let overswipeRight;

    function handleTouchStart(e) {
      if (!Swipeout.allow) return;
      isMoved = false;
      isTouched = true;
      isScrolling = undefined;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchStartTime = (new Date()).getTime();
      $swipeoutEl = $(this);
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }

      if (!isMoved) {
        if ($('.list.sortable-opened').length > 0) return;
        $swipeoutContent = $swipeoutEl.find('.swipeout-content');
        $actionsRight = $swipeoutEl.find('.swipeout-actions-right');
        $actionsLeft = $swipeoutEl.find('.swipeout-actions-left');
        actionsLeftWidth = null;
        actionsRightWidth = null;
        $leftButtons = null;
        $rightButtons = null;
        $overswipeRightButton = null;
        $overswipeLeftButton = null;
        if ($actionsLeft.length > 0) {
          actionsLeftWidth = $actionsLeft.outerWidth();
          $leftButtons = $actionsLeft.children('a');
          $overswipeLeftButton = $actionsLeft.find('.swipeout-overswipe');
        }
        if ($actionsRight.length > 0) {
          actionsRightWidth = $actionsRight.outerWidth();
          $rightButtons = $actionsRight.children('a');
          $overswipeRightButton = $actionsRight.find('.swipeout-overswipe');
        }
        opened = $swipeoutEl.hasClass('swipeout-opened');
        if (opened) {
          openedActionsSide = $swipeoutEl.find('.swipeout-actions-left.swipeout-actions-opened').length > 0 ? 'left' : 'right';
        }
        $swipeoutEl.removeClass('swipeout-transitioning');
        if (!app.params.swipeout.noFollow) {
          $swipeoutEl.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
          $swipeoutEl.removeClass('swipeout-opened');
        }
      }
      isMoved = true;
      e.preventDefault();

      touchesDiff = pageX - touchesStart.x;
      translate = touchesDiff;

      if (opened) {
        if (openedActionsSide === 'right') translate -= actionsRightWidth;
        else translate += actionsLeftWidth;
      }

      if (
        (translate > 0 && $actionsLeft.length === 0)
        ||
        (translate < 0 && $actionsRight.length === 0)
      ) {
        if (!opened) {
          isTouched = false;
          isMoved = false;
          $swipeoutContent.transform('');
          if ($rightButtons && $rightButtons.length > 0) {
            $rightButtons.transform('');
          }
          if ($leftButtons && $leftButtons.length > 0) {
            $leftButtons.transform('');
          }
          return;
        }
        translate = 0;
      }

      if (translate < 0) direction = 'to-left';
      else if (translate > 0) direction = 'to-right';
      else if (!direction) direction = 'to-left';

      let buttonOffset;
      let progress;

      e.f7PreventSwipePanel = true;
      if (app.params.swipeout.noFollow) {
        if (opened) {
          if (openedActionsSide === 'right' && touchesDiff > 0) {
            app.swipeout.close($swipeoutEl);
          }
          if (openedActionsSide === 'left' && touchesDiff < 0) {
            app.swipeout.close($swipeoutEl);
          }
        } else {
          if (touchesDiff < 0 && $actionsRight.length > 0) {
            app.swipeout.open($swipeoutEl, 'right');
          }
          if (touchesDiff > 0 && $actionsLeft.length > 0) {
            app.swipeout.open($swipeoutEl, 'left');
          }
        }
        isTouched = false;
        isMoved = false;
        return;
      }
      overswipeLeft = false;
      overswipeRight = false;
      if ($actionsRight.length > 0) {
        // Show right actions
        let buttonTranslate = translate;
        progress = buttonTranslate / actionsRightWidth;
        if (buttonTranslate < -actionsRightWidth) {
          buttonTranslate = -actionsRightWidth - ((-buttonTranslate - actionsRightWidth) ** 0.8);
          translate = buttonTranslate;
          if ($overswipeRightButton.length > 0) {
            overswipeRight = true;
          }
        }
        if (direction !== 'to-left') {
          progress = 0;
          buttonTranslate = 0;
        }
        $rightButtons.each((index, buttonEl) => {
          const $buttonEl = $(buttonEl);
          if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
          }
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if ($overswipeRightButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-left') {
            $buttonEl.css({ left: `${overswipeRight ? -buttonOffset : 0}px` });
            if (overswipeRight) {
              $buttonEl.addClass('swipeout-overswipe-active');
            } else {
              $buttonEl.removeClass('swipeout-overswipe-active');
            }
          }
          $buttonEl.transform(`translate3d(${buttonTranslate - (buttonOffset * (1 + Math.max(progress, -1)))}px,0,0)`);
        });
      }
      if ($actionsLeft.length > 0) {
        // Show left actions
        let buttonTranslate = translate;
        progress = buttonTranslate / actionsLeftWidth;
        if (buttonTranslate > actionsLeftWidth) {
          buttonTranslate = actionsLeftWidth + ((buttonTranslate - actionsLeftWidth) ** 0.8);
          translate = buttonTranslate;
          if ($overswipeLeftButton.length > 0) {
            overswipeLeft = true;
          }
        }
        if (direction !== 'to-right') {
          buttonTranslate = 0;
          progress = 0;
        }
        $leftButtons.each((index, buttonEl) => {
          const $buttonEl = $(buttonEl);
          if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
          }
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if ($overswipeLeftButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-right') {
            $buttonEl.css({ left: `${overswipeLeft ? buttonOffset : 0}px` });
            if (overswipeLeft) {
              $buttonEl.addClass('swipeout-overswipe-active');
            } else {
              $buttonEl.removeClass('swipeout-overswipe-active');
            }
          }
          if ($leftButtons.length > 1) {
            $buttonEl.css('z-index', $leftButtons.length - index);
          }
          $buttonEl.transform(`translate3d(${buttonTranslate + (buttonOffset * (1 - Math.min(progress, 1)))}px,0,0)`);
        });
      }
      $swipeoutEl.trigger('swipeout', progress);
      app.emit('swipeout', $swipeoutEl[0], progress);
      $swipeoutContent.transform(`translate3d(${translate}px,0,0)`);
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }

      isTouched = false;
      isMoved = false;
      const timeDiff = (new Date()).getTime() - touchStartTime;
      const $actions = direction === 'to-left' ? $actionsRight : $actionsLeft;
      const actionsWidth = direction === 'to-left' ? actionsRightWidth : actionsLeftWidth;
      let action;
      let $buttons;
      let i;

      if (
        (
          timeDiff < 300
          &&
          (
            (touchesDiff < -10 && direction === 'to-left')
            ||
            (touchesDiff > 10 && direction === 'to-right')
          )
        )
        ||
        (
          timeDiff >= 300
          &&
          (Math.abs(translate) > actionsWidth / 2)
        )
      ) {
        action = 'open';
      } else {
        action = 'close';
      }
      if (timeDiff < 300) {
        if (Math.abs(translate) === 0) action = 'close';
        if (Math.abs(translate) === actionsWidth) action = 'open';
      }

      if (action === 'open') {
        Swipeout.el = $swipeoutEl[0];
        $swipeoutEl.trigger('swipeout:open');
        app.emit('swipeoutOpen', $swipeoutEl[0]);
        $swipeoutEl.addClass('swipeout-opened swipeout-transitioning');
        const newTranslate = direction === 'to-left' ? -actionsWidth : actionsWidth;
        $swipeoutContent.transform(`translate3d(${newTranslate}px,0,0)`);
        $actions.addClass('swipeout-actions-opened');
        $buttons = direction === 'to-left' ? $rightButtons : $leftButtons;
        if ($buttons) {
          for (i = 0; i < $buttons.length; i += 1) {
            $($buttons[i]).transform(`translate3d(${newTranslate}px,0,0)`);
          }
        }
        if (overswipeRight) {
          $actionsRight.find('.swipeout-overswipe')[0].click();
        }
        if (overswipeLeft) {
          $actionsLeft.find('.swipeout-overswipe')[0].click();
        }
      } else {
        $swipeoutEl.trigger('swipeout:close');
        app.emit('swipeoutClose', $swipeoutEl[0]);
        Swipeout.el = undefined;
        $swipeoutEl.addClass('swipeout-transitioning').removeClass('swipeout-opened');
        $swipeoutContent.transform('');
        $actions.removeClass('swipeout-actions-opened');
      }

      let buttonOffset;
      if ($leftButtons && $leftButtons.length > 0 && $leftButtons !== $buttons) {
        $leftButtons.each((index, buttonEl) => {
          const $buttonEl = $(buttonEl);
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if (typeof buttonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
          }
          $buttonEl.transform(`translate3d(${buttonOffset}px,0,0)`);
        });
      }
      if ($rightButtons && $rightButtons.length > 0 && $rightButtons !== $buttons) {
        $rightButtons.each((index, buttonEl) => {
          const $buttonEl = $(buttonEl);
          buttonOffset = buttonEl.f7SwipeoutButtonOffset;
          if (typeof buttonOffset === 'undefined') {
            $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
          }
          $buttonEl.transform(`translate3d(${-buttonOffset}px,0,0)`);
        });
      }
      $swipeoutContent.transitionEnd(() => {
        if ((opened && action === 'open') || (!opened && action === 'close')) return;
        $swipeoutEl.trigger(action === 'open' ? 'swipeout:opened' : 'swipeout:closed');
        app.emit(action === 'open' ? 'swipeoutOpened' : 'swipeoutClosed', $swipeoutEl[0]);
        $swipeoutEl.removeClass('swipeout-transitioning');
        if (opened && action === 'close') {
          if ($actionsRight.length > 0) {
            $rightButtons.transform('');
          }
          if ($actionsLeft.length > 0) {
            $leftButtons.transform('');
          }
        }
      });
    }

    const passiveListener = app.support.passiveListener ? { passive: true } : false;

    app.on('touchstart', (e) => {
      if (Swipeout.el) {
        const $targetEl = $(e.target);
        if (!(
          $(Swipeout.el).is($targetEl[0]) ||
          $targetEl.parents('.swipeout').is(Swipeout.el) ||
          $targetEl.hasClass('modal-in') ||
          $targetEl[0].className.indexOf('-backdrop') > 0 ||
          $targetEl.hasClass('actions-modal') ||
          $targetEl.parents('.actions-modal.modal-in, .dialog.modal-in').length > 0
        )) {
          app.swipeout.close(Swipeout.el);
        }
      }
    });
    $(document).on(app.touchEvents.start, 'li.swipeout', handleTouchStart, passiveListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
  },
  allow: true,
  el: undefined,
  open(...args) {
    const app = this;
    let [el, side, callback] = args;
    if (typeof args[1] === 'function') {
      [el, callback, side] = args;
    }
    const $el = $(el).eq(0);

    if ($el.length === 0) return;
    if (!$el.hasClass('swipeout') || $el.hasClass('swipeout-opened')) return;
    if (!side) {
      if ($el.find('.swipeout-actions-right').length > 0) side = 'right';
      else side = 'left';
    }
    const $swipeoutActions = $el.find(`.swipeout-actions-${side}`);
    const $swipeoutContent = $el.find('.swipeout-content');
    if ($swipeoutActions.length === 0) return;
    $el.trigger('swipeout:open').addClass('swipeout-opened').removeClass('swipeout-transitioning');
    app.emit('swipeoutOpen', $el[0]);
    $swipeoutActions.addClass('swipeout-actions-opened');
    const $buttons = $swipeoutActions.children('a');
    const swipeoutActionsWidth = $swipeoutActions.outerWidth();
    const translate = side === 'right' ? -swipeoutActionsWidth : swipeoutActionsWidth;
    if ($buttons.length > 1) {
      $buttons.each((buttonIndex, buttonEl) => {
        const $buttonEl = $(buttonEl);
        if (side === 'right') {
          $buttonEl.transform(`translate3d(${-buttonEl.offsetLeft}px,0,0)`);
        } else {
          $buttonEl.css('z-index', $buttons.length - buttonIndex).transform(`translate3d(${swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft}px,0,0)`);
        }
      });
    }
    $el.addClass('swipeout-transitioning');
    $swipeoutContent.transitionEnd(() => {
      $el.trigger('swipeout:opened');
      app.emit('swipeoutOpened', $el[0]);
      if (callback) callback.call($el[0]);
    });
    Utils.nextFrame(() => {
      $buttons.transform(`translate3d(${translate}px,0,0)`);
      $swipeoutContent.transform(`translate3d(${translate}px,0,0)`);
    });
    Swipeout.el = $el[0];
  },
  close(el, callback) {
    const app = this;
    const $el = $(el).eq(0);
    if ($el.length === 0) return;
    if (!$el.hasClass('swipeout-opened')) return;
    const side = $el.find('.swipeout-actions-opened').hasClass('swipeout-actions-right') ? 'right' : 'left';
    const $swipeoutActions = $el.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
    const $buttons = $swipeoutActions.children('a');
    const swipeoutActionsWidth = $swipeoutActions.outerWidth();
    Swipeout.allow = false;
    $el.trigger('swipeout:close');
    app.emit('swipeoutClose', $el[0]);
    $el.removeClass('swipeout-opened').addClass('swipeout-transitioning');

    let closeTimeout;
    function onSwipeoutClose() {
      Swipeout.allow = true;
      if ($el.hasClass('swipeout-opened')) return;
      $el.removeClass('swipeout-transitioning');
      $buttons.transform('');
      $el.trigger('swipeout:closed');
      app.emit('swipeoutClosed', $el[0]);
      if (callback) callback.call($el[0]);
      if (closeTimeout) clearTimeout(closeTimeout);
    }
    $el.find('.swipeout-content').transform('').transitionEnd(onSwipeoutClose);
    closeTimeout = setTimeout(onSwipeoutClose, 500);

    $buttons.each((index, buttonEl) => {
      const $buttonEl = $(buttonEl);
      if (side === 'right') {
        $buttonEl.transform(`translate3d(${-buttonEl.offsetLeft}px,0,0)`);
      } else {
        $buttonEl.transform(`translate3d(${swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft}px,0,0)`);
      }
      $buttonEl.css({ left: '0px' }).removeClass('swipeout-overswipe-active');
    });
    if (Swipeout.el && Swipeout.el === $el[0]) Swipeout.el = undefined;
  },
  delete(el, callback) {
    const app = this;
    const $el = $(el).eq(0);
    if ($el.length === 0) return;
    Swipeout.el = undefined;
    $el.trigger('swipeout:delete');
    app.emit('swipeoutDelete', $el[0]);
    $el.css({ height: `${$el.outerHeight()}px` });
    $el.transitionEnd(() => {
      $el.trigger('swipeout:deleted');
      app.emit('swipeoutDeleted', $el[0]);
      if (callback) callback.call($el[0]);
      if ($el.parents('.virtual-list').length > 0) {
        const virtualList = $el.parents('.virtual-list')[0].f7VirtualList;
        const virtualIndex = $el[0].f7VirtualListIndex;
        if (virtualList && typeof virtualIndex !== 'undefined') virtualList.deleteItem(virtualIndex);
      } else if (app.params.swipeout.removeElements) {
        if (app.params.swipeout.removeElementsWithTimeout) {
          setTimeout(() => {
            $el.remove();
          }, app.params.swipeout.removeElementsTimeout);
        } else {
          $el.remove();
        }
      } else {
        $el.removeClass('swipeout-deleting swipeout-transitioning');
      }
    });
    Utils.nextFrame(() => {
      $el
        .addClass('swipeout-deleting swipeout-transitioning')
        .css({ height: '0px' })
        .find('.swipeout-content')
        .transform('translate3d(-100%,0,0)');
    });
  },
};
export default {
  name: 'swipeout',
  params: {
    swipeout: {
      actionsNoFold: false,
      noFollow: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
    },
  },
  create() {
    const app = this;
    Utils.extend(app, {
      swipeout: {
        init: Swipeout.init.bind(app),
        open: Swipeout.open.bind(app),
        close: Swipeout.close.bind(app),
        delete: Swipeout.delete.bind(app),
      },
    });
    Object.defineProperty(app.swipeout, 'el', {
      enumerable: true,
      configurable: true,
      get: () => Swipeout.el,
      set(el) {
        Swipeout.el = el;
      },
    });
    Object.defineProperty(app.swipeout, 'allow', {
      enumerable: true,
      configurable: true,
      get: () => Swipeout.allow,
      set(allow) {
        Swipeout.allow = allow;
      },
    });
  },
  clicks: {
    '.swipeout-open': function openSwipeout($clickedEl, data = {}) {
      const app = this;
      app.swipeout.open(data.swipeout, data.side);
    },
    '.swipeout-close': function closeSwipeout($clickedEl) {
      const app = this;
      const $swipeoutEl = $clickedEl.closest('.swipeout');
      if ($swipeoutEl.length === 0) return;
      app.swipeout.close($swipeoutEl);
    },
    '.swipeout-delete': function deleteSwipeout($clickedEl, data = {}) {
      const app = this;
      const $swipeoutEl = $clickedEl.closest('.swipeout');
      if ($swipeoutEl.length === 0) return;
      const { confirm, confirmTitle } = data;
      if (data.confirm) {
        app.dialog.confirm(confirm, confirmTitle, () => {
          app.swipeout.delete($swipeoutEl);
        });
      } else {
        app.swipeout.delete($swipeoutEl);
      }
    },
  },
  on: {
    init() {
      const app = this;
      if (!app.params.swipeout) return;
      app.swipeout.init();
    },
  },
};
