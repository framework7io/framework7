
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

  var Toggle = (function (Framework7Class$$1) {
    function Toggle(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);
      var toggle = this;

      var defaults = {};

      // Extend defaults with modules params
      toggle.useModulesParams(defaults);

      toggle.params = Utils.extend(defaults, params);

      var el = toggle.params.el;
      if (!el) { return toggle; }

      var $el = $(el);
      if ($el.length === 0) { return toggle; }

      if ($el[0].f7Toggle) { return $el[0].f7Toggle; }

      var $inputEl = $el.children('input[type="checkbox"]');

      Utils.extend(toggle, {
        app: app,
        $el: $el,
        el: $el[0],
        $inputEl: $inputEl,
        inputEl: $inputEl[0],
        disabled: $el.hasClass('disabled') || $inputEl.hasClass('disabled') || $inputEl.attr('disabled') || $inputEl[0].disabled,
      });

      Object.defineProperty(toggle, 'checked', {
        enumerable: true,
        configurable: true,
        set: function set(checked) {
          if (!toggle || typeof toggle.$inputEl === 'undefined') { return; }
          if (toggle.checked === checked) { return; }
          $inputEl[0].checked = checked;
          toggle.$inputEl.trigger('change');
        },
        get: function get() {
          return $inputEl[0].checked;
        },
      });

      $el[0].f7Toggle = toggle;

      var isTouched;
      var touchesStart = {};
      var isScrolling;
      var touchesDiff;
      var toggleWidth;
      var touchStartTime;
      var touchStartChecked;
      function handleTouchStart(e) {
        if (isTouched || toggle.disabled) { return; }
        touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchesDiff = 0;

        isTouched = true;
        isScrolling = undefined;
        touchStartTime = Utils.now();
        touchStartChecked = toggle.checked;

        toggleWidth = $el[0].offsetWidth;
        Utils.nextTick(function () {
          if (isTouched) {
            $el.addClass('toggle-active-state');
          }
        });
      }
      function handleTouchMove(e) {
        if (!isTouched || toggle.disabled) { return; }
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        var inverter = app.rtl ? -1 : 1;

        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
        }
        if (isScrolling) {
          isTouched = false;
          return;
        }
        e.preventDefault();

        touchesDiff = pageX - touchesStart.x;


        var changed;
        if (touchesDiff * inverter < 0 && Math.abs(touchesDiff) > toggleWidth / 3 && touchStartChecked) {
          changed = true;
        }
        if (touchesDiff * inverter > 0 && Math.abs(touchesDiff) > toggleWidth / 3 && !touchStartChecked) {
          changed = true;
        }
        if (changed) {
          touchesStart.x = pageX;
          toggle.checked = !touchStartChecked;
          touchStartChecked = !touchStartChecked;
        }
      }
      function handleTouchEnd() {
        if (!isTouched || toggle.disabled) {
          if (isScrolling) { $el.removeClass('toggle-active-state'); }
          isTouched = false;
          return;
        }
        var inverter = app.rtl ? -1 : 1;
        isTouched = false;

        $el.removeClass('toggle-active-state');

        var changed;
        if ((Utils.now() - touchStartTime) < 300) {
          if (touchesDiff * inverter < 0 && touchStartChecked) {
            changed = true;
          }
          if (touchesDiff * inverter > 0 && !touchStartChecked) {
            changed = true;
          }
          if (changed) {
            toggle.checked = !touchStartChecked;
          }
        }
      }
      function handleInputChange() {
        toggle.$el.trigger('toggle:change', toggle);
        toggle.emit('local::change toggleChange', toggle);
      }
      toggle.attachEvents = function attachEvents() {
        if (Support.touch) {
          var passive = Support.passiveListener ? { passive: true } : false;
          $el.on(app.touchEvents.start, handleTouchStart, passive);
          app.on('touchmove', handleTouchMove);
          app.on('touchend:passive', handleTouchEnd);
        }
        toggle.$inputEl.on('change', handleInputChange);
      };
      toggle.detachEvents = function detachEvents() {
        if (Support.touch) {
          var passive = Support.passiveListener ? { passive: true } : false;
          $el.off(app.touchEvents.start, handleTouchStart, passive);
          app.off('touchmove', handleTouchMove);
          app.off('touchend:passive', handleTouchEnd);
        }
        toggle.$inputEl.off('change', handleInputChange);
      };

      // Install Modules
      toggle.useModules();

      // Init
      toggle.init();
    }

    if ( Framework7Class$$1 ) Toggle.__proto__ = Framework7Class$$1;
    Toggle.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Toggle.prototype.constructor = Toggle;

    Toggle.prototype.toggle = function toggle () {
      var toggle = this;
      toggle.checked = !toggle.checked;
    };

    Toggle.prototype.init = function init () {
      var toggle = this;
      toggle.attachEvents();
    };

    Toggle.prototype.destroy = function destroy () {
      var toggle = this;
      toggle.$el.trigger('toggle:beforedestroy', toggle);
      toggle.emit('local::beforeDestroy toggleBeforeDestroy', toggle);
      delete toggle.$el[0].f7Toggle;
      toggle.detachEvents();
      Utils.deleteProps(toggle);
      toggle = null;
    };

    return Toggle;
  }(Framework7Class));

  var toggle = {
    name: 'toggle',
    create: function create() {
      var app = this;
      app.toggle = ConstructorMethods({
        defaultSelector: '.toggle',
        constructor: Toggle,
        app: app,
        domProp: 'f7Toggle',
      });
    },
    static: {
      Toggle: Toggle,
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.toggle-init').each(function (index, toggleEl) { return app.toggle.create({ el: toggleEl }); });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.toggle-init').each(function (index, toggleEl) {
          if (toggleEl.f7Toggle) { toggleEl.f7Toggle.destroy(); }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.toggle-init').each(function (index, toggleEl) { return app.toggle.create({ el: toggleEl }); });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        page.$el.find('.toggle-init').each(function (index, toggleEl) {
          if (toggleEl.f7Toggle) { toggleEl.f7Toggle.destroy(); }
        });
      },
    },
    vnode: {
      'toggle-init': {
        insert: function insert(vnode) {
          var app = this;
          var toggleEl = vnode.elm;
          app.toggle.create({ el: toggleEl });
        },
        destroy: function destroy(vnode) {
          var toggleEl = vnode.elm;
          if (toggleEl.f7Toggle) { toggleEl.f7Toggle.destroy(); }
        },
      },
    },
  };

  return toggle;
}
framework7ComponentLoader.componentName = 'toggle';

