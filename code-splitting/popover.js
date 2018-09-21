
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

  var Popover = (function (Modal$$1) {
    function Popover(app, params) {
      var extendedParams = Utils.extend(
        { on: {} },
        app.params.popover,
        params
      );

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var popover = this;

      popover.params = extendedParams;

      // Find Element
      var $el;
      if (!popover.params.el) {
        $el = $(popover.params.content);
      } else {
        $el = $(popover.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      // Find Target
      var $targetEl = $(popover.params.targetEl).eq(0);

      if ($el.length === 0) {
        return popover.destroy();
      }

      // Backdrop
      var $backdropEl;
      if (popover.params.backdrop) {
        $backdropEl = app.root.children('.popover-backdrop');
        if ($backdropEl.length === 0) {
          $backdropEl = $('<div class="popover-backdrop"></div>');
          app.root.append($backdropEl);
        }
      }

      // Find Angle
      var $angleEl;
      if ($el.find('.popover-angle').length === 0) {
        $angleEl = $('<div class="popover-angle"></div>');
        $el.prepend($angleEl);
      } else {
        $angleEl = $el.find('.popover-angle');
      }

      // Open
      var originalOpen = popover.open;

      Utils.extend(popover, {
        app: app,
        $el: $el,
        el: $el[0],
        $targetEl: $targetEl,
        targetEl: $targetEl[0],
        $angleEl: $angleEl,
        angleEl: $angleEl[0],
        $backdropEl: $backdropEl,
        backdropEl: $backdropEl && $backdropEl[0],
        type: 'popover',
        open: function open() {
          var assign;

          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];
          var targetEl = args[0];
          var animate = args[1];
          if (typeof args[0] === 'boolean') { (assign = args, animate = assign[0], targetEl = assign[1]); }
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
      popover.on('popoverOpen', function () {
        popover.resize();
        app.on('resize', handleResize);
        popover.on('popoverClose popoverBeforeDestroy', function () {
          app.off('resize', handleResize);
        });
      });

      function handleClick(e) {
        var target = e.target;
        var $target = $(target);
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

      popover.on('popoverOpened', function () {
        if (popover.params.closeByOutsideClick || popover.params.closeByBackdropClick) {
          app.on('click', handleClick);
        }
      });
      popover.on('popoverClose', function () {
        if (popover.params.closeByOutsideClick || popover.params.closeByBackdropClick) {
          app.off('click', handleClick);
        }
      });

      $el[0].f7Modal = popover;

      return popover;
    }

    if ( Modal$$1 ) Popover.__proto__ = Modal$$1;
    Popover.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    Popover.prototype.constructor = Popover;

    Popover.prototype.resize = function resize () {
      var popover = this;
      var app = popover.app;
      var $el = popover.$el;
      var $targetEl = popover.$targetEl;
      var $angleEl = popover.$angleEl;
      var ref = popover.params;
      var targetX = ref.targetX;
      var targetY = ref.targetY;
      $el.css({ left: '', top: '' });
      var ref$1 = [$el.width(), $el.height()];
      var width = ref$1[0];
      var height = ref$1[1];
      var angleSize = 0;
      var angleLeft;
      var angleTop;
      if (app.theme === 'ios') {
        $angleEl.removeClass('on-left on-right on-top on-bottom').css({ left: '', top: '' });
        angleSize = $angleEl.width() / 2;
      } else {
        $el.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({ left: '', top: '' });
      }

      var targetWidth;
      var targetHeight;
      var targetOffsetLeft;
      var targetOffsetTop;
      if ($targetEl && $targetEl.length > 0) {
        targetWidth = $targetEl.outerWidth();
        targetHeight = $targetEl.outerHeight();

        var targetOffset = $targetEl.offset();
        targetOffsetLeft = targetOffset.left - app.left;
        targetOffsetTop = targetOffset.top - app.top;

        var targetParentPage = $targetEl.parents('.page');
        if (targetParentPage.length > 0) {
          targetOffsetTop -= targetParentPage[0].scrollTop;
        }
      } else if (typeof targetX !== 'undefined' && targetY !== 'undefined') {
        targetOffsetLeft = targetX;
        targetOffsetTop = targetY;
        targetWidth = popover.params.targetWidth || 0;
        targetHeight = popover.params.targetHeight || 0;
      }

      var ref$2 = [0, 0, 0];
      var left = ref$2[0];
      var top = ref$2[1];
      var diff = ref$2[2];
      // Top Position
      var position = app.theme === 'md' ? 'bottom' : 'top';
      if (app.theme === 'md') {
        if (height < app.height - targetOffsetTop - targetHeight) {
          // On bottom
          position = 'bottom';
          top = targetOffsetTop;
        } else if (height < targetOffsetTop) {
          // On top
          top = (targetOffsetTop - height) + targetHeight;
          position = 'top';
        } else {
          // On middle
          position = 'bottom';
          top = targetOffsetTop;
        }

        if (top <= 0) {
          top = 8;
        } else if (top + height >= app.height) {
          top = app.height - height - 8;
        }

        // Horizontal Position
        left = (targetOffsetLeft + targetWidth) - width - 8;
        if (left + width >= app.width - 8) {
          left = (targetOffsetLeft + targetWidth) - width - 8;
        }
        if (left < 8) {
          left = 8;
        }
        if (position === 'top') {
          $el.addClass('popover-on-top');
        }
        if (position === 'bottom') {
          $el.addClass('popover-on-bottom');
        }
      } else {
        if ((height + angleSize) < targetOffsetTop) {
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
          if (top <= 0) {
            top = 5;
          } else if (top + height >= app.height) {
            top = app.height - height - 5;
          }
          diff -= top;
        }

        // Horizontal Position
        if (position === 'top' || position === 'bottom') {
          left = ((targetWidth / 2) + targetOffsetLeft) - (width / 2);
          diff = left;
          if (left < 5) { left = 5; }
          if (left + width > app.width) { left = app.width - width - 5; }
          if (left < 0) { left = 0; }
          if (position === 'top') {
            $angleEl.addClass('on-bottom');
          }
          if (position === 'bottom') {
            $angleEl.addClass('on-top');
          }
          diff -= left;
          angleLeft = ((width / 2) - angleSize) + diff;
          angleLeft = Math.max(Math.min(angleLeft, width - (angleSize * 2) - 13), 13);
          $angleEl.css({ left: (angleLeft + "px") });
        } else if (position === 'middle') {
          left = targetOffsetLeft - width - angleSize;
          $angleEl.addClass('on-right');
          if (left < 5 || (left + width > app.width)) {
            if (left < 5) { left = targetOffsetLeft + targetWidth + angleSize; }
            if (left + width > app.width) { left = app.width - width - 5; }
            $angleEl.removeClass('on-right').addClass('on-left');
          }
          angleTop = ((height / 2) - angleSize) + diff;
          angleTop = Math.max(Math.min(angleTop, height - (angleSize * 2) - 13), 13);
          $angleEl.css({ top: (angleTop + "px") });
        }
      }

      // Apply Styles
      $el.css({ top: (top + "px"), left: (left + "px") });
    };

    return Popover;
  }(Modal));

  var popover = {
    name: 'popover',
    params: {
      popover: {
        closeByBackdropClick: true,
        closeByOutsideClick: false,
        backdrop: true,
      },
    },
    static: {
      Popover: Popover,
    },
    create: function create() {
      var app = this;
      app.popover = Utils.extend(
        ModalMethods({
          app: app,
          constructor: Popover,
          defaultSelector: '.popover.modal-in',
        }),
        {
          open: function open(popoverEl, targetEl, animate) {
            var $popoverEl = $(popoverEl);
            var popover = $popoverEl[0].f7Modal;
            if (!popover) { popover = new Popover(app, { el: $popoverEl, targetEl: targetEl }); }
            return popover.open(targetEl, animate);
          },
        }
      );
    },
    clicks: {
      '.popover-open': function openPopover($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.popover.open(data.popover, $clickedEl, data.animate);
      },
      '.popover-close': function closePopover($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.popover.close(data.popover, data.animate);
      },
    },
  };

  return popover;
}
framework7ComponentLoader.componentName = 'popover';

