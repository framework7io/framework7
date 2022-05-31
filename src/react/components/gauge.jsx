/* eslint no-nested-ternary: off */
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  type? : string
  value? : number | string
  size? : number | string
  bgColor? : string
  borderBgColor? : string
  borderColor? : string
  borderWidth? : number | string
  valueText? : number | string
  valueTextColor? : string
  valueFontSize? : number | string
  valueFontWeight? : number | string
  labelText? : string
  labelTextColor? : string
  labelFontSize? : number | string
  labelFontWeight? : number | string
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const Gauge = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    type = 'circle',
    value = 0,
    size = 200,
    bgColor = 'transparent',
    borderBgColor = '#eeeeee',
    borderColor = '#000000',
    borderWidth = 10,
    valueText,
    valueTextColor = '#000000',
    valueFontSize = 31,
    valueFontWeight = 500,
    labelText,
    labelTextColor = '#888888',
    labelFontSize = 14,
    labelFontWeight = 400,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'gauge');

  const semiCircle = type === 'semicircle';
  const radius = size / 2 - borderWidth / 2;
  const length = 2 * Math.PI * radius;
  const progress = Math.max(Math.min(value, 1), 0);

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      <svg
        className="gauge-svg"
        width={`${size}px`}
        height={`${semiCircle ? size / 2 : size}px`}
        viewBox={`0 0 ${size} ${semiCircle ? size / 2 : size}`}
      >
        {semiCircle && (
          <path
            className="gauge-back-semi"
            d={`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
            stroke={borderBgColor}
            strokeWidth={borderWidth}
            fill={bgColor || 'none'}
          />
        )}
        {semiCircle && (
          <path
            className="gauge-front-semi"
            d={`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
            stroke={borderColor}
            strokeWidth={borderWidth}
            strokeDasharray={length / 2}
            strokeDashoffset={(length / 2) * (1 + progress)}
            fill={borderBgColor ? 'none' : bgColor || 'none'}
          />
        )}
        {!semiCircle && borderBgColor && (
          <circle
            className="gauge-back-circle"
            stroke={borderBgColor}
            strokeWidth={borderWidth}
            fill={bgColor || 'none'}
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
        )}
        {!semiCircle && (
          <circle
            className="gauge-front-circle"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            stroke={borderColor}
            strokeWidth={borderWidth}
            strokeDasharray={length}
            strokeDashoffset={length * (1 - progress)}
            fill={borderBgColor ? 'none' : bgColor || 'none'}
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
        )}
        {valueText && (
          <text
            className="gauge-value-text"
            x="50%"
            y={semiCircle ? '100%' : '50%'}
            fontWeight={valueFontWeight}
            fontSize={valueFontSize}
            fill={valueTextColor}
            dy={semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0}
            textAnchor="middle"
            dominantBaseline={!semiCircle ? 'middle' : null}
          >
            {valueText}
          </text>
        )}
        {labelText && (
          <text
            className="gauge-label-text"
            x="50%"
            y={semiCircle ? '100%' : '50%'}
            fontWeight={labelFontWeight}
            fontSize={labelFontSize}
            fill={labelTextColor}
            dy={semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0}
            textAnchor="middle"
            dominantBaseline={!semiCircle ? 'middle' : null}
          >
            {labelText}
          </text>
        )}
      </svg>
    </div>
  );
});

Gauge.displayName = 'f7-gauge';

export default Gauge;
