
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

  var Tooltip = (function (Framework7Class$$1) {
    function Tooltip(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, app, params);

      var tooltip = this;

      var defaults = Utils.extend({}, app.params.tooltip);

      // Extend defaults with modules params
      tooltip.useModulesParams(defaults);

      tooltip.params = Utils.extend(defaults, params);

      var ref = tooltip.params;
      var targetEl = ref.targetEl;
      if (!targetEl) { return tooltip; }

      var $targetEl = $(targetEl);
      if ($targetEl.length === 0) { return tooltip; }

      if ($targetEl[0].f7Tooltip) { return $targetEl[0].f7Tooltip; }

      var $el = $(tooltip.render()).eq(0);

      Utils.extend(tooltip, {
        app: app,
        $targetEl: $targetEl,
        targetEl: $targetEl && $targetEl[0],
        $el: $el,
        el: $el && $el[0],
        text: tooltip.params.text || '',
        visible: false,
        opened: false,
      });

      $targetEl[0].f7Tooltip = tooltip;

      var touchesStart = {};
      var isTouched;
      function handleTouchStart(e) {
        if (isTouched) { return; }
        isTouched = true;
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        tooltip.show(this);
      }
      function handleTouchMove(e) {
        if (!isTouched) { return; }
        var x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        var distance = Math.pow( (
          (Math.pow( (x - touchesStart.x), 2 ))
          + (Math.pow( (y - touchesStart.y), 2 ))
        ), 0.5 );
        if (distance > 50) {
          isTouched = false;
          tooltip.hide();
        }
      }
      function handleTouchEnd() {
        if (!isTouched) { return; }
        isTouched = false;
        tooltip.hide();
      }
      function handleMouseEnter() {
        tooltip.show(this);
      }
      function handleMouseLeave() {
        tooltip.hide();
      }
      function handleTransitionEnd() {
        if (!$el.hasClass('tooltip-in')) {
          $el.removeClass('tooltip-out').remove();
        }
      }

      tooltip.attachEvents = function attachEvents() {
        $el.on('transitionend webkitTransitionEnd', handleTransitionEnd);
        if (Support.touch) {
          var passive = Support.passiveListener ? { passive: true } : false;
          $targetEl.on(app.touchEvents.start, handleTouchStart, passive);
          app.on('touchmove', handleTouchMove);
          app.on('touchend:passive', handleTouchEnd);
        } else {
          $targetEl.on('mouseenter', handleMouseEnter);
          $targetEl.on('mouseleave', handleMouseLeave);
        }
      };
      tooltip.detachEvents = function detachEvents() {
        $el.off('transitionend webkitTransitionEnd', handleTransitionEnd);
        if (Support.touch) {
          var passive = Support.passiveListener ? { passive: true } : false;
          $targetEl.off(app.touchEvents.start, handleTouchStart, passive);
          app.off('touchmove', handleTouchMove);
          app.off('touchend:passive', handleTouchEnd);
        } else {
          $targetEl.off('mouseenter', handleMouseEnter);
          $targetEl.off('mouseleave', handleMouseLeave);
        }
      };

      // Install Modules
      tooltip.useModules();

      tooltip.init();

      return tooltip;
    }

    if ( Framework7Class$$1 ) Tooltip.__proto__ = Framework7Class$$1;
    Tooltip.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Tooltip.prototype.constructor = Tooltip;

    Tooltip.prototype.position = function position (targetEl) {
      var tooltip = this;
      var $el = tooltip.$el;
      var app = tooltip.app;
      $el.css({ left: '', top: '' });
      var $targetEl = $(targetEl || tooltip.targetEl);
      var ref = [$el.width(), $el.height()];
      var width = ref[0];
      var height = ref[1];

      $el.css({ left: '', top: '' });

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
      }
      var ref$1 = [0, 0, 0];
      var left = ref$1[0];
      var top = ref$1[1];

      // Top Position
      var position = 'top';

      if (height < targetOffsetTop) {
        // On top
        top = targetOffsetTop - height;
      } else if (height < app.height - targetOffsetTop - targetHeight) {
        // On bottom
        position = 'bottom';
        top = targetOffsetTop + targetHeight;
      } else {
        // On middle
        position = 'middle';
        top = ((targetHeight / 2) + targetOffsetTop) - (height / 2);
        if (top <= 0) {
          top = 8;
        } else if (top + height >= app.height) {
          top = app.height - height - 8;
        }
      }

      // Horizontal Position
      if (position === 'top' || position === 'bottom') {
        left = ((targetWidth / 2) + targetOffsetLeft) - (width / 2);
        if (left < 8) { left = 8; }
        if (left + width > app.width) { left = app.width - width - 8; }
        if (left < 0) { left = 0; }
      } else if (position === 'middle') {
        left = targetOffsetLeft - width;
        if (left < 8 || (left + width > app.width)) {
          if (left < 8) { left = targetOffsetLeft + targetWidth; }
          if (left + width > app.width) { left = app.width - width - 8; }
        }
      }

      // Apply Styles
      $el.css({ top: (top + "px"), left: (left + "px") });
    };

    Tooltip.prototype.show = function show (aroundEl) {
      var tooltip = this;
      var app = tooltip.app;
      var $el = tooltip.$el;
      var $targetEl = tooltip.$targetEl;
      app.root.append($el);
      tooltip.position(aroundEl);
      var $aroundEl = $(aroundEl);
      tooltip.visible = true;
      tooltip.opened = true;
      $targetEl.trigger('tooltip:show', tooltip);
      $el.trigger('tooltip:show', tooltip);
      if ($aroundEl.length && $aroundEl[0] !== $targetEl[0]) {
        $aroundEl.trigger('tooltip:show', tooltip);
      }
      tooltip.emit('local::show tooltipShow', tooltip);
      $el.removeClass('tooltip-out').addClass('tooltip-in');
      return tooltip;
    };

    Tooltip.prototype.hide = function hide () {
      var tooltip = this;
      var $el = tooltip.$el;
      var $targetEl = tooltip.$targetEl;
      tooltip.visible = false;
      tooltip.opened = false;
      $targetEl.trigger('tooltip:hide', tooltip);
      $el.trigger('tooltip:hide', tooltip);
      tooltip.emit('local::hide tooltipHide', tooltip);
      $el.addClass('tooltip-out').removeClass('tooltip-in');
      return tooltip;
    };

    Tooltip.prototype.render = function render () {
      var tooltip = this;
      if (tooltip.params.render) { return tooltip.params.render.call(tooltip, tooltip); }
      var ref = tooltip.params;
      var cssClass = ref.cssClass;
      var text = ref.text;
      return ("\n      <div class=\"tooltip " + (cssClass || '') + "\">\n        <div class=\"tooltip-content\">" + (text || '') + "</div>\n      </div>\n    ").trim();
    };

    Tooltip.prototype.setText = function setText (newText) {
      var tooltip = this;
      if (typeof newText === 'undefined') {
        return tooltip;
      }
      tooltip.params.text = newText;
      tooltip.text = newText;
      if (tooltip.$el) {
        tooltip.$el.children('.tooltip-content').html(newText);
      }
      if (tooltip.opened) {
        tooltip.position();
      }
      return tooltip;
    };

    Tooltip.prototype.init = function init () {
      var tooltip = this;
      tooltip.attachEvents();
    };

    Tooltip.prototype.destroy = function destroy () {
      var tooltip = this;
      if (!tooltip.$targetEl || tooltip.destroyed) { return; }
      tooltip.$targetEl.trigger('tooltip:beforedestroy', tooltip);
      tooltip.emit('local::beforeDestroy tooltipBeforeDestroy', tooltip);
      tooltip.$el.remove();
      delete tooltip.$targetEl[0].f7Tooltip;
      tooltip.detachEvents();
      Utils.deleteProps(tooltip);
      tooltip.destroyed = true;
    };

    return Tooltip;
  }(Framework7Class));

  var tooltip = {
    name: 'tooltip',
    static: {
      Tooltip: Tooltip,
    },
    create: function create() {
      var app = this;
      app.tooltip = ConstructorMethods({
        defaultSelector: '.tooltip',
        constructor: Tooltip,
        app: app,
        domProp: 'f7Tooltip',
      });
      app.tooltip.show = function show(el) {
        var $el = $(el);
        if ($el.length === 0) { return undefined; }
        var tooltip = $el[0].f7Tooltip;
        if (!tooltip) { return undefined; }
        tooltip.show($el[0]);
        return tooltip;
      };
      app.tooltip.hide = function hide(el) {
        var $el = $(el);
        if ($el.length === 0) { return undefined; }
        var tooltip = $el[0].f7Tooltip;
        if (!tooltip) { return undefined; }
        tooltip.hide();
        return tooltip;
      };
      app.tooltip.setText = function text(el, newText) {
        var $el = $(el);
        if ($el.length === 0) { return undefined; }
        var tooltip = $el[0].f7Tooltip;
        if (!tooltip) { return undefined; }
        tooltip.setText(newText);
        return tooltip;
      };
    },
    params: {
      tooltip: {
        targetEl: null,
        text: null,
        cssClass: null,
        render: null,
      },
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.tooltip-init').each(function (index, el) {
          var text = $(el).attr('data-tooltip');
          if (!text) { return; }
          app.tooltip.create({ targetEl: el, text: text });
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.tooltip-init').each(function (index, el) {
          if (el.f7Tooltip) { el.f7Tooltip.destroy(); }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.tooltip-init').each(function (index, el) {
          var text = $(el).attr('data-tooltip');
          if (!text) { return; }
          app.tooltip.create({ targetEl: el, text: text });
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        page.$el.find('.tooltip-init').each(function (index, el) {
          if (el.f7Tooltip) { el.f7Tooltip.destroy(); }
        });
      },
    },
    vnode: {
      'tooltip-init': {
        insert: function insert(vnode) {
          var app = this;
          var el = vnode.elm;
          var text = $(el).attr('data-tooltip');
          if (!text) { return; }
          app.tooltip.create({ targetEl: el, text: text });
        },
        destroy: function destroy(vnode) {
          var el = vnode.elm;
          if (el.f7Tooltip) { el.f7Tooltip.destroy(); }
        },
      },
    },
  };

  return tooltip;
}
framework7ComponentLoader.componentName = 'tooltip';

