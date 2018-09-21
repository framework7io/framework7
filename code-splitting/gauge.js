
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

  /* eslint no-nested-ternary: off */

  var Gauge = (function (Framework7Class$$1) {
    function Gauge(app, params) {
      if ( params === void 0 ) params = {};

      // Extends with open/close Modal methods;
      Framework7Class$$1.call(this, app, params);

      var gauge = this;

      var defaults = Utils.extend({}, app.params.gauge);

      // Extend defaults with modules params
      gauge.useModulesParams(defaults);

      gauge.params = Utils.extend(defaults, params);

      var ref = gauge.params;
      var el = ref.el;
      if (!el) { return gauge; }

      var $el = $(el);
      if ($el.length === 0) { return gauge; }

      if ($el[0].f7Gauge) { return $el[0].f7Gauge; }

      Utils.extend(gauge, {
        app: app,
        $el: $el,
        el: $el && $el[0],
      });

      $el[0].f7Gauge = gauge;

      // Install Modules
      gauge.useModules();

      gauge.init();

      return gauge;
    }

    if ( Framework7Class$$1 ) Gauge.__proto__ = Framework7Class$$1;
    Gauge.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Gauge.prototype.constructor = Gauge;

    Gauge.prototype.calcRadius = function calcRadius () {
      var gauge = this;
      var ref = gauge.params;
      var size = ref.size;
      var borderWidth = ref.borderWidth;
      return (size / 2) - (borderWidth / 2);
    };

    Gauge.prototype.calcBorderLength = function calcBorderLength () {
      var gauge = this;
      var radius = gauge.calcRadius();
      return 2 * Math.PI * radius;
    };

    Gauge.prototype.render = function render () {
      var gauge = this;
      if (gauge.params.render) { return gauge.params.render.call(gauge, gauge); }

      var ref = gauge.params;
      var type = ref.type;
      var value = ref.value;
      var size = ref.size;
      var bgColor = ref.bgColor;
      var borderBgColor = ref.borderBgColor;
      var borderColor = ref.borderColor;
      var borderWidth = ref.borderWidth;
      var valueText = ref.valueText;
      var valueTextColor = ref.valueTextColor;
      var valueFontSize = ref.valueFontSize;
      var valueFontWeight = ref.valueFontWeight;
      var labelText = ref.labelText;
      var labelTextColor = ref.labelTextColor;
      var labelFontSize = ref.labelFontSize;
      var labelFontWeight = ref.labelFontWeight;

      var semiCircle = type === 'semicircle';
      var radius = gauge.calcRadius();
      var length = gauge.calcBorderLength();
      var progress = Math.max(Math.min(value, 1), 0);

      return ("\n      <svg class=\"gauge-svg\" width=\"" + size + "px\" height=\"" + (semiCircle ? size / 2 : size) + "px\" viewBox=\"0 0 " + size + " " + (semiCircle ? size / 2 : size) + "\">\n        " + (semiCircle ? ("\n          <path\n            class=\"gauge-back-semi\"\n            d=\"M" + (size - (borderWidth / 2)) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0\"\n            stroke=\"" + borderBgColor + "\"\n            stroke-width=\"" + borderWidth + "\"\n            fill=\"" + (bgColor || 'none') + "\"\n          />\n          <path\n            class=\"gauge-front-semi\"\n            d=\"M" + (size - (borderWidth / 2)) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0\"\n            stroke=\"" + borderColor + "\"\n            stroke-width=\"" + borderWidth + "\"\n            stroke-dasharray=\"" + (length / 2) + "\"\n            stroke-dashoffset=\"" + ((length / 2) * (1 + progress)) + "\"\n            fill=\"" + (borderBgColor ? 'none' : (bgColor || 'none')) + "\"\n          />\n        ") : ("\n          " + (borderBgColor ? ("\n            <circle\n              class=\"gauge-back-circle\"\n              stroke=\"" + borderBgColor + "\"\n              stroke-width=\"" + borderWidth + "\"\n              fill=\"" + (bgColor || 'none') + "\"\n              cx=\"" + (size / 2) + "\"\n              cy=\"" + (size / 2) + "\"\n              r=\"" + radius + "\"\n            ></circle>\n          ") : '') + "\n          <circle\n            class=\"gauge-front-circle\"\n            transform=\"" + ("rotate(-90 " + (size / 2) + " " + (size / 2) + ")") + "\"\n            stroke=\"" + borderColor + "\"\n            stroke-width=\"" + borderWidth + "\"\n            stroke-dasharray=\"" + length + "\"\n            stroke-dashoffset=\"" + (length * (1 - progress)) + "\"\n            fill=\"" + (borderBgColor ? 'none' : bgColor || 'none') + "\"\n            cx=\"" + (size / 2) + "\"\n            cy=\"" + (size / 2) + "\"\n            r=\"" + radius + "\"\n          ></circle>\n        ")) + "\n        " + (valueText ? ("\n          <text\n            class=\"gauge-value-text\"\n            x=\"50%\"\n            y=\"" + (semiCircle ? '100%' : '50%') + "\"\n            font-weight=\"" + valueFontWeight + "\"\n            font-size=\"" + valueFontSize + "\"\n            fill=\"" + valueTextColor + "\"\n            dy=\"" + (semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0) + "\"\n            text-anchor=\"middle\"\n            dominant-baseline=\"" + (!semiCircle && 'middle') + "\"\n          >" + valueText + "</text>\n        ") : '') + "\n        " + (labelText ? ("\n          <text\n            class=\"gauge-label-text\"\n            x=\"50%\"\n            y=\"" + (semiCircle ? '100%' : '50%') + "\"\n            font-weight=\"" + labelFontWeight + "\"\n            font-size=\"" + labelFontSize + "\"\n            fill=\"" + labelTextColor + "\"\n            dy=\"" + (semiCircle ? -5 : (valueText ? ((valueFontSize / 2) + 10) : 0)) + "\"\n            text-anchor=\"middle\"\n            dominant-baseline=\"" + (!semiCircle && 'middle') + "\"\n          >" + labelText + "</text>\n        ") : '') + "\n      </svg>\n    ").trim();
    };

    Gauge.prototype.update = function update (newParams) {
      if ( newParams === void 0 ) newParams = {};

      var gauge = this;
      var params = gauge.params;
      var $gaugeSvgEl = gauge.$gaugeSvgEl;

      Object.keys(newParams).forEach(function (param) {
        if (typeof newParams[param] !== 'undefined') {
          params[param] = newParams[param];
        }
      });
      if ($gaugeSvgEl.length === 0) { return gauge; }

      var value = params.value;
      var size = params.size;
      var bgColor = params.bgColor;
      var borderBgColor = params.borderBgColor;
      var borderColor = params.borderColor;
      var borderWidth = params.borderWidth;
      var valueText = params.valueText;
      var valueTextColor = params.valueTextColor;
      var valueFontSize = params.valueFontSize;
      var valueFontWeight = params.valueFontWeight;
      var labelText = params.labelText;
      var labelTextColor = params.labelTextColor;
      var labelFontSize = params.labelFontSize;
      var labelFontWeight = params.labelFontWeight;

      var length = gauge.calcBorderLength();
      var progress = Math.max(Math.min(value, 1), 0);
      var radius = gauge.calcRadius();
      var semiCircle = params.type === 'semicircle';

      var svgAttrs = {
        width: (size + "px"),
        height: ((semiCircle ? size / 2 : size) + "px"),
        viewBox: ("0 0 " + size + " " + (semiCircle ? size / 2 : size)),
      };
      Object.keys(svgAttrs).forEach(function (attr) {
        $gaugeSvgEl.attr(attr, svgAttrs[attr]);
      });
      if (semiCircle) {
        var backAttrs = {
          d: ("M" + (size - (borderWidth / 2)) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0"),
          stroke: borderBgColor,
          'stroke-width': borderWidth,
          fill: bgColor || 'none',
        };
        var frontAttrs = {
          d: ("M" + (size - (borderWidth / 2)) + "," + (size / 2) + " a1,1 0 0,0 -" + (size - borderWidth) + ",0"),
          stroke: borderColor,
          'stroke-width': borderWidth,
          'stroke-dasharray': length / 2,
          'stroke-dashoffset': (length / 2) * (progress - 1),
          fill: borderBgColor ? 'none' : (bgColor || 'none'),
        };
        Object.keys(backAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-back-semi').attr(attr, backAttrs[attr]);
        });
        Object.keys(frontAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-front-semi').attr(attr, frontAttrs[attr]);
        });
      } else {
        var backAttrs$1 = {
          stroke: borderBgColor,
          'stroke-width': borderWidth,
          fill: bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius,
        };
        var frontAttrs$1 = {
          transform: ("rotate(-90 " + (size / 2) + " " + (size / 2) + ")"),
          stroke: borderColor,
          'stroke-width': borderWidth,
          'stroke-dasharray': length,
          'stroke-dashoffset': length * (1 - progress),
          fill: borderBgColor ? 'none' : bgColor || 'none',
          cx: size / 2,
          cy: size / 2,
          r: radius,
        };
        Object.keys(backAttrs$1).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-back-circle').attr(attr, backAttrs$1[attr]);
        });
        Object.keys(frontAttrs$1).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-front-circle').attr(attr, frontAttrs$1[attr]);
        });
      }
      if (valueText) {
        if (!$gaugeSvgEl.find('.gauge-value-text').length) {
          $gaugeSvgEl.append('<text class="gauge-value-text"></text>');
        }
        var textAttrs = {
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          'font-weight': valueFontWeight,
          'font-size': valueFontSize,
          fill: valueTextColor,
          dy: semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0,
          'text-anchor': 'middle',
          'dominant-baseline': !semiCircle && 'middle',
        };
        Object.keys(textAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-value-text').attr(attr, textAttrs[attr]);
        });
        $gaugeSvgEl.find('.gauge-value-text').text(valueText);
      } else {
        $gaugeSvgEl.find('.gauge-value-text').remove();
      }
      if (labelText) {
        if (!$gaugeSvgEl.find('.gauge-label-text').length) {
          $gaugeSvgEl.append('<text class="gauge-label-text"></text>');
        }
        var labelAttrs = {
          x: '50%',
          y: semiCircle ? '100%' : '50%',
          'font-weight': labelFontWeight,
          'font-size': labelFontSize,
          fill: labelTextColor,
          dy: semiCircle ? -5 : (valueText ? ((valueFontSize / 2) + 10) : 0),
          'text-anchor': 'middle',
          'dominant-baseline': !semiCircle && 'middle',
        };
        Object.keys(labelAttrs).forEach(function (attr) {
          $gaugeSvgEl.find('.gauge-label-text').attr(attr, labelAttrs[attr]);
        });
        $gaugeSvgEl.find('.gauge-label-text').text(labelText);
      } else {
        $gaugeSvgEl.find('.gauge-label-text').remove();
      }
      return gauge;
    };

    Gauge.prototype.init = function init () {
      var gauge = this;
      var $gaugeSvgEl = $(gauge.render()).eq(0);
      $gaugeSvgEl.f7Gauge = gauge;
      Utils.extend(gauge, {
        $gaugeSvgEl: $gaugeSvgEl,
        gaugeSvgEl: $gaugeSvgEl && $gaugeSvgEl[0],
      });
      gauge.$el.append($gaugeSvgEl);
      return gauge;
    };

    Gauge.prototype.destroy = function destroy () {
      var gauge = this;
      if (!gauge.$el || gauge.destroyed) { return; }
      gauge.$el.trigger('gauge:beforedestroy', gauge);
      gauge.emit('local::beforeDestroy gaugeBeforeDestroy', gauge);
      gauge.$gaugeSvgEl.remove();
      delete gauge.$el[0].f7Gauge;
      Utils.deleteProps(gauge);
      gauge.destroyed = true;
    };

    return Gauge;
  }(Framework7Class));

  var gauge = {
    name: 'gauge',
    static: {
      Gauge: Gauge,
    },
    create: function create() {
      var app = this;
      app.gauge = ConstructorMethods({
        defaultSelector: '.gauge',
        constructor: Gauge,
        app: app,
        domProp: 'f7Gauge',
      });
      app.gauge.update = function update(el, newParams) {
        var $el = $(el);
        if ($el.length === 0) { return undefined; }
        var gauge = app.gauge.get(el);
        if (!gauge) { return undefined; }
        gauge.update(newParams);
        return gauge;
      };
    },
    params: {
      gauge: {
        el: null,
        type: 'circle',
        value: 0,
        size: 200,
        bgColor: 'transparent',
        borderBgColor: '#eeeeee',
        borderColor: '#000000',
        borderWidth: 10,
        valueText: null,
        valueTextColor: '#000000',
        valueFontSize: 31,
        valueFontWeight: 500,
        labelText: null,
        labelTextColor: '#888888',
        labelFontSize: 14,
        labelFontWeight: 400,
      },
    },
    on: {
      tabMounted: function tabMounted(tabEl) {
        var app = this;
        $(tabEl).find('.gauge-init').each(function (index, el) {
          app.gauge.create(Utils.extend({ el: el }, $(el).dataset() || {}));
        });
      },
      tabBeforeRemove: function tabBeforeRemove(tabEl) {
        $(tabEl).find('.gauge-init').each(function (index, el) {
          if (el.f7Gauge) { el.f7Gauge.destroy(); }
        });
      },
      pageInit: function pageInit(page) {
        var app = this;
        page.$el.find('.gauge-init').each(function (index, el) {
          app.gauge.create(Utils.extend({ el: el }, $(el).dataset() || {}));
        });
      },
      pageBeforeRemove: function pageBeforeRemove(page) {
        page.$el.find('.gauge-init').each(function (index, el) {
          if (el.f7Gauge) { el.f7Gauge.destroy(); }
        });
      },
    },
    vnode: {
      'gauge-init': {
        insert: function insert(vnode) {
          var app = this;
          var el = vnode.elm;
          app.gauge.create(Utils.extend({ el: el }, $(el).dataset() || {}));
        },
        destroy: function destroy(vnode) {
          var el = vnode.elm;
          if (el.f7Gauge) { el.f7Gauge.destroy(); }
        },
      },
    },
  };

  return gauge;
}
framework7ComponentLoader.componentName = 'gauge';

