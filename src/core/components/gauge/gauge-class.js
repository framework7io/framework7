/* eslint no-nested-ternary: off */
import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Gauge extends Framework7Class {
  constructor(app, params = {}) {
    // Extends with open/close Modal methods;
    super(params, [app]);

    const gauge = this;

    const defaults = Utils.extend({}, app.params.gauge);

    // Extend defaults with modules params
    gauge.useModulesParams(defaults);

    gauge.params = Utils.extend(defaults, params);

    const { el } = gauge.params;
    if (!el) return gauge;

    const $el = $(el);
    if ($el.length === 0) return gauge;

    if ($el[0].f7Gauge) return $el[0].f7Gauge;

    Utils.extend(gauge, {
      app,
      $el,
      el: $el && $el[0],
    });

    $el[0].f7Gauge = gauge;

    // Install Modules
    gauge.useModules();

    gauge.init();

    return gauge;
  }

  calcRadius() {
    const gauge = this;
    const { size, borderWidth } = gauge.params;
    return (size / 2) - (borderWidth / 2);
  }

  calcBorderLength() {
    const gauge = this;
    const radius = gauge.calcRadius();
    return 2 * Math.PI * radius;
  }

  render() {
    const gauge = this;
    if (gauge.params.render) return gauge.params.render.call(gauge, gauge);

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
    } = gauge.params;

    const semiCircle = type === 'semicircle';
    const radius = gauge.calcRadius();
    const length = gauge.calcBorderLength();
    const progress = Math.max(Math.min(value, 1), 0);

    return `
      <svg class="gauge-svg" width="${size}px" height="${semiCircle ? size / 2 : size}px" viewBox="0 0 ${size} ${semiCircle ? size / 2 : size}">
        ${semiCircle ? `
          <path
            class="gauge-back-semi"
            d="M${size - (borderWidth / 2)},${size / 2} a1,1 0 0,0 -${size - borderWidth},0"
            stroke="${borderBgColor}"
            stroke-width="${borderWidth}"
            fill="${bgColor || 'none'}"
          />
          <path
            class="gauge-front-semi"
            d="M${size - (borderWidth / 2)},${size / 2} a1,1 0 0,0 -${size - borderWidth},0"
            stroke="${borderColor}"
            stroke-width="${borderWidth}"
            stroke-dasharray="${length / 2}"
            stroke-dashoffset="${(length / 2) * (1 + progress)}"
            fill="${borderBgColor ? 'none' : (bgColor || 'none')}"
          />
        ` : `
          ${borderBgColor ? `
            <circle
              class="gauge-back-circle"
              stroke="${borderBgColor}"
              stroke-width="${borderWidth}"
              fill="${bgColor || 'none'}"
              cx="${size / 2}"
              cy="${size / 2}"
              r="${radius}"
            ></circle>
          ` : ''}
          <circle
            class="gauge-front-circle"
            transform="${`rotate(-90 ${size / 2} ${size / 2})`}"
            stroke="${borderColor}"
            stroke-width="${borderWidth}"
            stroke-dasharray="${length}"
            stroke-dashoffset="${length * (1 - progress)}"
            fill="${borderBgColor ? 'none' : bgColor || 'none'}"
            cx="${size / 2}"
            cy="${size / 2}"
            r="${radius}"
          ></circle>
        `}
        ${valueText ? `
          <text
            class="gauge-value-text"
            x="50%"
            y="${semiCircle ? '100%' : '50%'}"
            font-weight="${valueFontWeight}"
            font-size="${valueFontSize}"
            fill="${valueTextColor}"
            dy="${semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0}"
            text-anchor="middle"
            dominant-baseline="${!semiCircle && 'middle'}"
          >${valueText}</text>
        ` : ''}
        ${labelText ? `
          <text
            class="gauge-label-text"
            x="50%"
            y="${semiCircle ? '100%' : '50%'}"
            font-weight="${labelFontWeight}"
            font-size="${labelFontSize}"
            fill="${labelTextColor}"
            dy="${semiCircle ? -5 : (valueText ? ((valueFontSize / 2) + 10) : 0)}"
            text-anchor="middle"
            dominant-baseline="${!semiCircle && 'middle'}"
          >${labelText}</text>
        ` : ''}
      </svg>
    `.trim();
  }

  update(newParams = {}) {
    const gauge = this;
    const { params, $gaugeSvgEl } = gauge;

    Object.keys(newParams).forEach((param) => {
      if (typeof newParams[param] !== 'undefined') {
        params[param] = newParams[param];
      }
    });
    if ($gaugeSvgEl.length === 0) return gauge;

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

    const length = gauge.calcBorderLength();
    const progress = Math.max(Math.min(value, 1), 0);
    const radius = gauge.calcRadius();
    const semiCircle = params.type === 'semicircle';

    const svgAttrs = {
      width: `${size}px`,
      height: `${semiCircle ? size / 2 : size}px`,
      viewBox: `0 0 ${size} ${semiCircle ? size / 2 : size}`,
    };
    Object.keys(svgAttrs).forEach((attr) => {
      $gaugeSvgEl.attr(attr, svgAttrs[attr]);
    });
    if (semiCircle) {
      const backAttrs = {
        d: `M${size - (borderWidth / 2)},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
        stroke: borderBgColor,
        'stroke-width': borderWidth,
        fill: bgColor || 'none',
      };
      const frontAttrs = {
        d: `M${size - (borderWidth / 2)},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`,
        stroke: borderColor,
        'stroke-width': borderWidth,
        'stroke-dasharray': length / 2,
        'stroke-dashoffset': (length / 2) * (1 + progress),
        fill: borderBgColor ? 'none' : (bgColor || 'none'),
      };
      Object.keys(backAttrs).forEach((attr) => {
        $gaugeSvgEl.find('.gauge-back-semi').attr(attr, backAttrs[attr]);
      });
      Object.keys(frontAttrs).forEach((attr) => {
        $gaugeSvgEl.find('.gauge-front-semi').attr(attr, frontAttrs[attr]);
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
        $gaugeSvgEl.find('.gauge-back-circle').attr(attr, backAttrs[attr]);
      });
      Object.keys(frontAttrs).forEach((attr) => {
        $gaugeSvgEl.find('.gauge-front-circle').attr(attr, frontAttrs[attr]);
      });
    }
    if (valueText) {
      if (!$gaugeSvgEl.find('.gauge-value-text').length) {
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.classList.add('gauge-value-text');
        $gaugeSvgEl.append(textEl);
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
        $gaugeSvgEl.find('.gauge-value-text').attr(attr, textAttrs[attr]);
      });
      $gaugeSvgEl.find('.gauge-value-text').text(valueText);
    } else {
      $gaugeSvgEl.find('.gauge-value-text').remove();
    }
    if (labelText) {
      if (!$gaugeSvgEl.find('.gauge-label-text').length) {
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.classList.add('gauge-label-text');
        $gaugeSvgEl.append(textEl);
      }
      const labelAttrs = {
        x: '50%',
        y: semiCircle ? '100%' : '50%',
        'font-weight': labelFontWeight,
        'font-size': labelFontSize,
        fill: labelTextColor,
        dy: semiCircle ? -5 : (valueText ? ((valueFontSize / 2) + 10) : 0),
        'text-anchor': 'middle',
        'dominant-baseline': !semiCircle && 'middle',
      };
      Object.keys(labelAttrs).forEach((attr) => {
        $gaugeSvgEl.find('.gauge-label-text').attr(attr, labelAttrs[attr]);
      });
      $gaugeSvgEl.find('.gauge-label-text').text(labelText);
    } else {
      $gaugeSvgEl.find('.gauge-label-text').remove();
    }
    return gauge;
  }

  init() {
    const gauge = this;
    const $gaugeSvgEl = $(gauge.render()).eq(0);
    $gaugeSvgEl.f7Gauge = gauge;
    Utils.extend(gauge, {
      $gaugeSvgEl,
      gaugeSvgEl: $gaugeSvgEl && $gaugeSvgEl[0],
    });
    gauge.$el.append($gaugeSvgEl);
    return gauge;
  }

  destroy() {
    const gauge = this;
    if (!gauge.$el || gauge.destroyed) return;
    gauge.$el.trigger('gauge:beforedestroy');
    gauge.emit('local::beforeDestroy gaugeBeforeDestroy', gauge);
    gauge.$gaugeSvgEl.remove();
    delete gauge.$el[0].f7Gauge;
    Utils.deleteProps(gauge);
    gauge.destroyed = true;
  }
}
export default Gauge;
