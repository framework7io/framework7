/* eslint no-nested-ternary: off */
/* eslint react/no-unknown-property: off */
/* eslint consistent-return: off */
import Utils from '../utils/utils';

export default {
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    type: {
      type: String,
      default: 'circle',
    },
    value: {
      type: [Number, String],
      default: 0,
    },
    size: {
      type: [Number, String],
      default: 200,
    },
    bgColor: {
      type: String,
      default: 'transparent',
    },
    borderBgColor: {
      type: String,
      default: '#eeeeee',
    },
    borderColor: {
      type: String,
      default: '#000000',
    },
    borderWidth: {
      type: [Number, String],
      default: 10,
    },
    valueText: [Number, String],
    valueTextColor: {
      type: String,
      default: '#000000',
    },
    valueFontSize: {
      type: [Number, String],
      default: 31,
    },
    valueFontWeight: {
      type: [Number, String],
      default: 500,
    },
    labelText: String,
    labelTextColor: {
      type: String,
      default: '#888888',
    },
    labelFontSize: {
      type: [Number, String],
      default: 14,
    },
    labelFontWeight: {
      type: [Number, String],
      default: 400,
    },
  },
  name: 'f7-gauge',
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,

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
    } = props;

    const classes = Utils.classNames(
      className,
      'gauge',
    );

    const semiCircle = type === 'semicircle';
    const radius = (size / 2) - (borderWidth / 2);
    const length = 2 * Math.PI * radius;
    const progress = Math.max(Math.min(value, 1), 0);

    return (
      <div id={id} style={style} className={classes}>
        <svg
          className="gauge-svg"
          width={`${size}px`}
          height={`${semiCircle ? size / 2 : size}px`}
          viewBox={`0 0 ${size} ${semiCircle ? size / 2 : size}`}
        >
          {semiCircle && (
            <path
              className="gauge-back-semi"
              d={`M${size - (borderWidth / 2)},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
              stroke={borderBgColor}
              strokeWidth={borderWidth}
              fill={bgColor || 'none'}
            />
          )}
          {semiCircle && (
            <path
              className="gauge-front-semi"
              d={`M${size - (borderWidth / 2)},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
              stroke={borderColor}
              strokeWidth={borderWidth}
              strokeDasharray={length / 2}
              strokeDashoffset={(length / 2) * (1 + progress)}
              fill={borderBgColor ? 'none' : (bgColor || 'none')}
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
            >{valueText}</text>
          )}
          {labelText && (
            <text
              className="gauge-label-text"
              x="50%"
              y={semiCircle ? '100%' : '50%'}
              fontWeight={labelFontWeight}
              fontSize={labelFontSize}
              fill={labelTextColor}
              dy={semiCircle ? -5 : (valueText ? ((valueFontSize / 2) + 10) : 0)}
              textAnchor="middle"
              dominantBaseline={!semiCircle ? 'middle' : null}
            >{labelText}</text>
          )}
        </svg>
      </div>
    );
  },
};
