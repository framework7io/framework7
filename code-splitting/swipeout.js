
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var Swipeout = {
    init: function init() {
      var app = this;
      var touchesStart = {};
      var isTouched;
      var isMoved;
      var isScrolling;
      var touchStartTime;
      var touchesDiff;
      var $swipeoutEl;
      var $swipeoutContent;
      var $actionsRight;
      var $actionsLeft;
      var actionsLeftWidth;
      var actionsRightWidth;
      var translate;
      var opened;
      var openedActionsSide;
      var $leftButtons;
      var $rightButtons;
      var direction;
      var $overswipeLeftButton;
      var $overswipeRightButton;
      var overswipeLeft;
      var overswipeRight;

      function handleTouchStart(e) {
        if (!Swipeout.allow) { return; }
        isMoved = false;
        isTouched = true;
        isScrolling = undefined;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = (new Date()).getTime();
        $swipeoutEl = $(this);
      }
      function handleTouchMove(e) {
        if (!isTouched) { return; }
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        }
        if (isScrolling) {
          isTouched = false;
          return;
        }

        if (!isMoved) {
          if ($('.list.sortable-opened').length > 0) { return; }
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
          if (openedActionsSide === 'right') { translate -= actionsRightWidth; }
          else { translate += actionsLeftWidth; }
        }

        if (
          (translate > 0 && $actionsLeft.length === 0)
          || (translate < 0 && $actionsRight.length === 0)
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

        if (translate < 0) { direction = 'to-left'; }
        else if (translate > 0) { direction = 'to-right'; }
        else if (!direction) { direction = 'to-left'; }

        var buttonOffset;
        var progress;

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
          var buttonTranslate = translate;
          progress = buttonTranslate / actionsRightWidth;
          if (buttonTranslate < -actionsRightWidth) {
            buttonTranslate = -actionsRightWidth - (Math.pow( (-buttonTranslate - actionsRightWidth), 0.8 ));
            translate = buttonTranslate;
            if ($overswipeRightButton.length > 0) {
              overswipeRight = true;
            }
          }
          if (direction !== 'to-left') {
            progress = 0;
            buttonTranslate = 0;
          }
          $rightButtons.each(function (index, buttonEl) {
            var $buttonEl = $(buttonEl);
            if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
              $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
            }
            buttonOffset = buttonEl.f7SwipeoutButtonOffset;
            if ($overswipeRightButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-left') {
              $buttonEl.css({ left: ((overswipeRight ? -buttonOffset : 0) + "px") });
              if (overswipeRight) {
                $buttonEl.addClass('swipeout-overswipe-active');
              } else {
                $buttonEl.removeClass('swipeout-overswipe-active');
              }
            }
            $buttonEl.transform(("translate3d(" + (buttonTranslate - (buttonOffset * (1 + Math.max(progress, -1)))) + "px,0,0)"));
          });
        }
        if ($actionsLeft.length > 0) {
          // Show left actions
          var buttonTranslate$1 = translate;
          progress = buttonTranslate$1 / actionsLeftWidth;
          if (buttonTranslate$1 > actionsLeftWidth) {
            buttonTranslate$1 = actionsLeftWidth + (Math.pow( (buttonTranslate$1 - actionsLeftWidth), 0.8 ));
            translate = buttonTranslate$1;
            if ($overswipeLeftButton.length > 0) {
              overswipeLeft = true;
            }
          }
          if (direction !== 'to-right') {
            buttonTranslate$1 = 0;
            progress = 0;
          }
          $leftButtons.each(function (index, buttonEl) {
            var $buttonEl = $(buttonEl);
            if (typeof buttonEl.f7SwipeoutButtonOffset === 'undefined') {
              $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
            }
            buttonOffset = buttonEl.f7SwipeoutButtonOffset;
            if ($overswipeLeftButton.length > 0 && $buttonEl.hasClass('swipeout-overswipe') && direction === 'to-right') {
              $buttonEl.css({ left: ((overswipeLeft ? buttonOffset : 0) + "px") });
              if (overswipeLeft) {
                $buttonEl.addClass('swipeout-overswipe-active');
              } else {
                $buttonEl.removeClass('swipeout-overswipe-active');
              }
            }
            if ($leftButtons.length > 1) {
              $buttonEl.css('z-index', $leftButtons.length - index);
            }
            $buttonEl.transform(("translate3d(" + (buttonTranslate$1 + (buttonOffset * (1 - Math.min(progress, 1)))) + "px,0,0)"));
          });
        }
        $swipeoutEl.trigger('swipeout', progress);
        app.emit('swipeout', $swipeoutEl[0], progress);
        $swipeoutContent.transform(("translate3d(" + translate + "px,0,0)"));
      }
      function handleTouchEnd() {
        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }

        isTouched = false;
        isMoved = false;
        var timeDiff = (new Date()).getTime() - touchStartTime;
        var $actions = direction === 'to-left' ? $actionsRight : $actionsLeft;
        var actionsWidth = direction === 'to-left' ? actionsRightWidth : actionsLeftWidth;
        var action;
        var $buttons;
        var i;

        if (
          (
            timeDiff < 300
            && (
              (touchesDiff < -10 && direction === 'to-left')
              || (touchesDiff > 10 && direction === 'to-right')
            )
          )
          || (
            timeDiff >= 300
            && (Math.abs(translate) > actionsWidth / 2)
          )
        ) {
          action = 'open';
        } else {
          action = 'close';
        }
        if (timeDiff < 300) {
          if (Math.abs(translate) === 0) { action = 'close'; }
          if (Math.abs(translate) === actionsWidth) { action = 'open'; }
        }

        if (action === 'open') {
          Swipeout.el = $swipeoutEl[0];
          $swipeoutEl.trigger('swipeout:open');
          app.emit('swipeoutOpen', $swipeoutEl[0]);
          $swipeoutEl.addClass('swipeout-opened swipeout-transitioning');
          var newTranslate = direction === 'to-left' ? -actionsWidth : actionsWidth;
          $swipeoutContent.transform(("translate3d(" + newTranslate + "px,0,0)"));
          $actions.addClass('swipeout-actions-opened');
          $buttons = direction === 'to-left' ? $rightButtons : $leftButtons;
          if ($buttons) {
            for (i = 0; i < $buttons.length; i += 1) {
              $($buttons[i]).transform(("translate3d(" + newTranslate + "px,0,0)"));
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

        var buttonOffset;
        if ($leftButtons && $leftButtons.length > 0 && $leftButtons !== $buttons) {
          $leftButtons.each(function (index, buttonEl) {
            var $buttonEl = $(buttonEl);
            buttonOffset = buttonEl.f7SwipeoutButtonOffset;
            if (typeof buttonOffset === 'undefined') {
              $buttonEl[0].f7SwipeoutButtonOffset = actionsLeftWidth - buttonEl.offsetLeft - buttonEl.offsetWidth;
            }
            $buttonEl.transform(("translate3d(" + buttonOffset + "px,0,0)"));
          });
        }
        if ($rightButtons && $rightButtons.length > 0 && $rightButtons !== $buttons) {
          $rightButtons.each(function (index, buttonEl) {
            var $buttonEl = $(buttonEl);
            buttonOffset = buttonEl.f7SwipeoutButtonOffset;
            if (typeof buttonOffset === 'undefined') {
              $buttonEl[0].f7SwipeoutButtonOffset = buttonEl.offsetLeft;
            }
            $buttonEl.transform(("translate3d(" + (-buttonOffset) + "px,0,0)"));
          });
        }
        $swipeoutContent.transitionEnd(function () {
          if ((opened && action === 'open') || (!opened && action === 'close')) { return; }
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

      var passiveListener = app.support.passiveListener ? { passive: true } : false;

      app.on('touchstart', function (e) {
        if (Swipeout.el) {
          var $targetEl = $(e.target);
          if (!(
            $(Swipeout.el).is($targetEl[0])
            || $targetEl.parents('.swipeout').is(Swipeout.el)
            || $targetEl.hasClass('modal-in')
            || ($targetEl.attr('class') || '').indexOf('-backdrop') > 0
            || $targetEl.hasClass('actions-modal')
            || $targetEl.parents('.actions-modal.modal-in, .dialog.modal-in').length > 0
          )) {
            app.swipeout.close(Swipeout.el);
          }
        }
      });
      $(doc).on(app.touchEvents.start, 'li.swipeout', handleTouchStart, passiveListener);
      app.on('touchmove:active', handleTouchMove);
      app.on('touchend:passive', handleTouchEnd);
    },
    allow: true,
    el: undefined,
    open: function open() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var app = this;
      var el = args[0];
      var side = args[1];
      var callback = args[2];
      if (typeof args[1] === 'function') {
        (assign = args, el = assign[0], callback = assign[1], side = assign[2]);
      }
      var $el = $(el).eq(0);

      if ($el.length === 0) { return; }
      if (!$el.hasClass('swipeout') || $el.hasClass('swipeout-opened')) { return; }
      if (!side) {
        if ($el.find('.swipeout-actions-right').length > 0) { side = 'right'; }
        else { side = 'left'; }
      }
      var $swipeoutActions = $el.find((".swipeout-actions-" + side));
      var $swipeoutContent = $el.find('.swipeout-content');
      if ($swipeoutActions.length === 0) { return; }
      $el.trigger('swipeout:open').addClass('swipeout-opened').removeClass('swipeout-transitioning');
      app.emit('swipeoutOpen', $el[0]);
      $swipeoutActions.addClass('swipeout-actions-opened');
      var $buttons = $swipeoutActions.children('a');
      var swipeoutActionsWidth = $swipeoutActions.outerWidth();
      var translate = side === 'right' ? -swipeoutActionsWidth : swipeoutActionsWidth;
      if ($buttons.length > 1) {
        $buttons.each(function (buttonIndex, buttonEl) {
          var $buttonEl = $(buttonEl);
          if (side === 'right') {
            $buttonEl.transform(("translate3d(" + (-buttonEl.offsetLeft) + "px,0,0)"));
          } else {
            $buttonEl.css('z-index', $buttons.length - buttonIndex).transform(("translate3d(" + (swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft) + "px,0,0)"));
          }
        });
      }
      $el.addClass('swipeout-transitioning');
      $swipeoutContent.transitionEnd(function () {
        $el.trigger('swipeout:opened');
        app.emit('swipeoutOpened', $el[0]);
        if (callback) { callback.call($el[0]); }
      });
      Utils.nextFrame(function () {
        $buttons.transform(("translate3d(" + translate + "px,0,0)"));
        $swipeoutContent.transform(("translate3d(" + translate + "px,0,0)"));
      });
      Swipeout.el = $el[0];
    },
    close: function close(el, callback) {
      var app = this;
      var $el = $(el).eq(0);
      if ($el.length === 0) { return; }
      if (!$el.hasClass('swipeout-opened')) { return; }
      var side = $el.find('.swipeout-actions-opened').hasClass('swipeout-actions-right') ? 'right' : 'left';
      var $swipeoutActions = $el.find('.swipeout-actions-opened').removeClass('swipeout-actions-opened');
      var $buttons = $swipeoutActions.children('a');
      var swipeoutActionsWidth = $swipeoutActions.outerWidth();
      Swipeout.allow = false;
      $el.trigger('swipeout:close');
      app.emit('swipeoutClose', $el[0]);
      $el.removeClass('swipeout-opened').addClass('swipeout-transitioning');

      var closeTimeout;
      function onSwipeoutClose() {
        Swipeout.allow = true;
        if ($el.hasClass('swipeout-opened')) { return; }
        $el.removeClass('swipeout-transitioning');
        $buttons.transform('');
        $el.trigger('swipeout:closed');
        app.emit('swipeoutClosed', $el[0]);
        if (callback) { callback.call($el[0]); }
        if (closeTimeout) { clearTimeout(closeTimeout); }
      }
      $el.find('.swipeout-content').transform('').transitionEnd(onSwipeoutClose);
      closeTimeout = setTimeout(onSwipeoutClose, 500);

      $buttons.each(function (index, buttonEl) {
        var $buttonEl = $(buttonEl);
        if (side === 'right') {
          $buttonEl.transform(("translate3d(" + (-buttonEl.offsetLeft) + "px,0,0)"));
        } else {
          $buttonEl.transform(("translate3d(" + (swipeoutActionsWidth - buttonEl.offsetWidth - buttonEl.offsetLeft) + "px,0,0)"));
        }
        $buttonEl.css({ left: '0px' }).removeClass('swipeout-overswipe-active');
      });
      if (Swipeout.el && Swipeout.el === $el[0]) { Swipeout.el = undefined; }
    },
    delete: function delete$1(el, callback) {
      var app = this;
      var $el = $(el).eq(0);
      if ($el.length === 0) { return; }
      Swipeout.el = undefined;
      $el.trigger('swipeout:delete');
      app.emit('swipeoutDelete', $el[0]);
      $el.css({ height: (($el.outerHeight()) + "px") });
      $el.transitionEnd(function () {
        $el.trigger('swipeout:deleted');
        app.emit('swipeoutDeleted', $el[0]);
        if (callback) { callback.call($el[0]); }
        if ($el.parents('.virtual-list').length > 0) {
          var virtualList = $el.parents('.virtual-list')[0].f7VirtualList;
          var virtualIndex = $el[0].f7VirtualListIndex;
          if (virtualList && typeof virtualIndex !== 'undefined') { virtualList.deleteItem(virtualIndex); }
        } else if (app.params.swipeout.removeElements) {
          if (app.params.swipeout.removeElementsWithTimeout) {
            setTimeout(function () {
              $el.remove();
            }, app.params.swipeout.removeElementsTimeout);
          } else {
            $el.remove();
          }
        } else {
          $el.removeClass('swipeout-deleting swipeout-transitioning');
        }
      });
      // eslint-disable-next-line
      // $el[0]._clientLeft = $el[0].clientLeft;
      Utils.nextFrame(function () {
        $el
          .addClass('swipeout-deleting swipeout-transitioning')
          .css({ height: '0px' })
          .find('.swipeout-content')
          .transform('translate3d(-100%,0,0)');
      });
    },
  };
  var swipeout = {
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
    create: function create() {
      var app = this;
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
        get: function () { return Swipeout.el; },
        set: function set(el) {
          Swipeout.el = el;
        },
      });
      Object.defineProperty(app.swipeout, 'allow', {
        enumerable: true,
        configurable: true,
        get: function () { return Swipeout.allow; },
        set: function set(allow) {
          Swipeout.allow = allow;
        },
      });
    },
    clicks: {
      '.swipeout-open': function openSwipeout($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.swipeout.open(data.swipeout, data.side);
      },
      '.swipeout-close': function closeSwipeout($clickedEl) {
        var app = this;
        var $swipeoutEl = $clickedEl.closest('.swipeout');
        if ($swipeoutEl.length === 0) { return; }
        app.swipeout.close($swipeoutEl);
      },
      '.swipeout-delete': function deleteSwipeout($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        var $swipeoutEl = $clickedEl.closest('.swipeout');
        if ($swipeoutEl.length === 0) { return; }
        var confirm = data.confirm;
        var confirmTitle = data.confirmTitle;
        if (data.confirm) {
          app.dialog.confirm(confirm, confirmTitle, function () {
            app.swipeout.delete($swipeoutEl);
          });
        } else {
          app.swipeout.delete($swipeoutEl);
        }
      },
    },
    on: {
      init: function init() {
        var app = this;
        if (!app.params.swipeout) { return; }
        app.swipeout.init();
      },
    },
  };

  return swipeout;
}
framework7ComponentLoader.componentName = 'swipeout';

