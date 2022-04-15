/* eslint no-nested-ternary: off */
import { getDocument } from 'ssr-window';
import $ from '../../shared/dom7.js';
import { extend, deleteProps } from '../../shared/utils.js';
import Framework7Class from '../../shared/class.js';
/** @jsx $jsx */
import $jsx from '../../shared/$jsx.js';

class Gauge extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);

    const self = this;

    const defaults = extend({}, app.params.gauge);

    // Extend defaults with modules params
    self.useModulesParams(defaults);

    self.params = extend(defaults, params);

    const { el } = self.params;
    if (!el) return self;

    const $el = $(el);
    if ($el.length === 0) return self;

    if ($el[0].f7Gauge) return $el[0].f7Gauge;

    extend(self, {
      app,
      $el,
      el: $el && $el[0],
    });

    $el[0].f7Gauge = self;

    // Install Modules
    self.useModules();

    self.init();

    return self;
  }

  calcRadius() {
    const self = this;
    const { size, borderWidth } = self.params;
    return size / 2 - borderWidth / 2;
  }

  calcBorderLength() {
    const self = this;
    const radius = self.calcRadius();
    return 2 * Math.PI * radius;
  }

  render() {
    const self = this;
    if (self.params.render) return self.params.render.call(self, self);

    const {
      type,
      value,
      size,
      bgColor,
      borderBgColor,
      borderColor,
      borderWidth,
      valueText,
      valueTextColor,
      valueFontSize,
      valueFontWeight,
      labelText,
      labelTextColor,
      labelFontSize,
      labelFontWeight,
    } = self.params;

    const semiCircle = type === 'semicircle';
    const radius = self.calcRadius();
    const length = self.calcBorderLength();
    const progress = Math.max(Math.min(value, 1), 0);

    return (
      <svg
        class="gauge-svg"
        width={`${size}px`}
        height={`${semiCircle ? size / 2 : size}px`}
        viewBox={`0 0 ${size} ${semiCircle ? size / 2 : size}`}
      >
        {semiCircle && (
          <path
            class="gauge-back-semi"
            d={`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
            stroke={borderBgColor}
            stroke-width={borderWidth}
            fill={bgColor || 'none'}
          />
        )}
        {semiCircle && (
          <path
            class="gauge-front-semi"
            d={`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
            stroke={borderColor}
            stroke-width={borderWidth}
            stroke-dasharray={length / 2}
            stroke-dashoffset={(length / 2) * (1 + progress)}
            fill={borderBgColor ? 'none' : bgColor || 'none'}
          />
        )}
        {!semiCircle && borderBgColor && (
          <circle
            class="gauge-back-circle"
            stroke={borderBgColor}
            stroke-width={borderWidth}
            fill={bgColor || 'none'}
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
        )}
        {!semiCircle && (
          <circle
            class="gauge-front-circle"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            stroke={borderColor}
            stroke-width={borderWidth}
            stroke-dasharray={length}
            stroke-dashoffset={length * (1 - progress)}
            fill={borderBgColor ? 'none' : bgColor || 'none'}
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
        )}

        {valueText && (
          <text
            class="gauge-value-text"
            x="50%"
            y={semiCircle ? '100%' : '50%'}
            font-weight={valueFontWeight}
            font-size={valueFontSize}
            fill={valueTextColor}
            dy={semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0}
            text-anchor="middle"
            dominant-baseline={!semiCircle && 'middle'}
          >
            {valueText}
          </text>
        )}
        {labelText && (
          <text
            class="gauge-label-text"
            x="50%"
            y={semiCircle ? '100%' : '50%'}
            font-weight={labelFontWeight}
            font-size={labelFontSize}
            fill={labelTextColor}
            dy={semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0}
            text-anchor="middle"
            dominant-baseline={!semiCircle && 'middle'}
          >
            {labelText}
          </text>
        )}
      </svg>
    );
  }

  update(newParams = {}) {
    const self = this;
    const document = getDocument();
    const { params, $svgEl } = self;

    Object.keys(newParams).forEach((param) => {
      if (typeof newParams[param] !== 'undefined') {
        params[param] = newParams[param];
      }
    });
    if ($svgEl.length === 0) return self;

    const {
      value,
      size,
      bgColor,
      borderBgColor,
      borderColor,
      borderWidth,
      valueText,
      valueTextColor,
      valueFontSize,
      valueFontWeight,
      labelText,
      labelTextColor,
      labelFontSize,
      labelFontWeight,
    } = params;

    const length = self.calcBorderLength();
    const progress = Math.max(Math.min(value, 1), 0);
    const radius = self.calcRadius();
    const semiCircle = params.type === 'semicircle';

    const svgAttrs = {
      width: `${size}px`,
      height: `${semiCircle ? size / 2 : size}px`,
      viewBox: `0 0 ${size} ${semiCircle ? size / 2 : size}`,
    };
    Object.keys(svgAttrs).forEach((attr) => {
      $svgEl.attr(attr, svgAttrs[attr]);
    });
    if (semiCircle) {
      const backAttrs = {
        d: `M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
        stroke: borderBgColor,
        'stroke-width': borderWidth,
        fill: bgColor || 'none',
      };
      const frontAttrs = {
        d: `M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
        stroke: borderColor,
        'stroke-width': borderWidth,
        'stroke-dasharray': length / 2,
        'stroke-dashoffset': (length / 2) * (1 + progress),
        fill: borderBgColor ? 'none' : bgColor || 'none',
      };
      Object.keys(backAttrs).forEach((attr) => {
        $svgEl.find('.gauge-back-semi').attr(attr, backAttrs[attr]);
      });
      Object.keys(frontAttrs).forEach((attr) => {
        $svgEl.find('.gauge-front-semi').attr(attr, frontAttrs[attr]);
      });
    } else {
      const backAttrs = {
        stroke: borderBgColor,
        'stroke-width': borderWidth,
        fill: bgColor || 'none',
        cx: size / 2,
        cy: size / 2,
        r: radius,
      };
      const frontAttrs = {
        transform: `rotate(-90 ${size / 2} ${size / 2})`,
        stroke: borderColor,
        'stroke-width': borderWidth,
        'stroke-dasharray': length,
        'stroke-dashoffset': length * (1 - progress),
        fill: borderBgColor ? 'none' : bgColor || 'none',
        cx: size / 2,
        cy: size / 2,
        r: radius,
      };
      Object.keys(backAttrs).forEach((attr) => {
        $svgEl.find('.gauge-back-circle').attr(attr, backAttrs[attr]);
      });
      Object.keys(frontAttrs).forEach((attr) => {
        $svgEl.find('.gauge-front-circle').attr(attr, frontAttrs[attr]);
      });
    }
    if (valueText) {
      if (!$svgEl.find('.gauge-value-text').length) {
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.classList.add('gauge-value-text');
        $svgEl.append(textEl);
      }
      const textAttrs = {
        x: '50%',
        y: semiCircle ? '100%' : '50%',
        'font-weight': valueFontWeight,
        'font-size': valueFontSize,
        fill: valueTextColor,
        dy: semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0,
        'text-anchor': 'middle',
        'dominant-baseline': !semiCircle && 'middle',
      };
      Object.keys(textAttrs).forEach((attr) => {
        $svgEl.find('.gauge-value-text').attr(attr, textAttrs[attr]);
      });
      $svgEl.find('.gauge-value-text').text(valueText);
    } else {
      $svgEl.find('.gauge-value-text').remove();
    }
    if (labelText) {
      if (!$svgEl.find('.gauge-label-text').length) {
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.classList.add('gauge-label-text');
        $svgEl.append(textEl);
      }
      const labelAttrs = {
        x: '50%',
        y: semiCircle ? '100%' : '50%',
        'font-weight': labelFontWeight,
        'font-size': labelFontSize,
        fill: labelTextColor,
        dy: semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0,
        'text-anchor': 'middle',
        'dominant-baseline': !semiCircle && 'middle',
      };
      Object.keys(labelAttrs).forEach((attr) => {
        $svgEl.find('.gauge-label-text').attr(attr, labelAttrs[attr]);
      });
      $svgEl.find('.gauge-label-text').text(labelText);
    } else {
      $svgEl.find('.gauge-label-text').remove();
    }
    return self;
  }

  init() {
    const self = this;
    const $svgEl = $(self.render()).eq(0);
    $svgEl.f7Gauge = self;
    extend(self, {
      $svgEl,
      svgEl: $svgEl && $svgEl[0],
    });
    self.$el.append($svgEl);
    return self;
  }

  destroy() {
    const self = this;
    if (!self.$el || self.destroyed) return;
    self.$el.trigger('gauge:beforedestroy');
    self.emit('local::beforeDestroy gaugeBeforeDestroy', self);
    self.$svgEl.remove();
    delete self.$el[0].f7Gauge;
    deleteProps(self);
    self.destroyed = true;
  }
}
export default Gauge;
