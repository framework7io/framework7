import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { f7 } from '../shared/f7.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
  tooltip?: boolean;
  datasets?: {value: number; color?: string; label?: string}[];
  formatTooltip?: (data: {index: number; value: number; label: string; color: string; percentage: number}) => void;
  onSelect? : (index: number | null, item: {value: number; label: string; color: string}) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const PieChart = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    size = 320,
    tooltip = false,
    datasets = [],
    formatTooltip,
    children,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const [currentIndex, setCurrentIndex] = useState(null);
  const previousIndex = useRef(null);
  const elRef = useRef(null);
  const f7Tooltip = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const getSummValue = () => {
    let summ = 0;
    datasets
      .map((d) => d.value || 0)
      .forEach((value) => {
        summ += value;
      });
    return summ;
  };

  const getPaths = () => {
    const paths = [];

    let cumulativePercentage = 0;

    function getCoordinatesForPercentage(percentage) {
      const x = Math.cos(2 * Math.PI * percentage) * (size / 3);
      const y = Math.sin(2 * Math.PI * percentage) * (size / 3);
      return [x, y];
    }

    datasets.forEach(({ value, label, color }) => {
      const percentage = value / getSummValue();

      const [startX, startY] = getCoordinatesForPercentage(cumulativePercentage);
      cumulativePercentage += percentage;
      const [endX, endY] = getCoordinatesForPercentage(cumulativePercentage);
      const largeArcFlag = percentage > 0.5 ? 1 : 0;
      const points = [
        `M ${startX} ${startY}`, // Move
        `A ${size / 3} ${size / 3} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
        'L 0 0', // Line
      ].join(' ');

      paths.push({
        points,
        label,
        color,
      });
    });
    return paths;
  };

  const formatTooltipText = () => {
    if (currentIndex === null) return '';
    const { value, label, color } = datasets[currentIndex];
    const percentage = (value / getSummValue()) * 100;

    const round = (v) => {
      if (parseInt(v, 10) === v) return v;
      return Math.round(v * 100) / 100;
    };

    if (formatTooltip) {
      return formatTooltip({
        index: currentIndex,
        value,
        label,
        color,
        percentage,
      });
    }

    const tooltipText = `${label ? `${label}: ` : ''}${round(value)} (${round(percentage)}%)`;

    return `
      <div class="pie-chart-tooltip-label">
        <span class="pie-chart-tooltip-color" style="background-color: ${color};"></span> ${tooltipText}
      </div>
    `;
  };

  const setTooltip = () => {
    if (currentIndex === null && !f7Tooltip.current) return;
    if (!tooltip || !elRef.current || !f7) return;
    if (currentIndex !== null && !f7Tooltip.current) {
      f7Tooltip.current = f7.tooltip.create({
        trigger: 'manual',
        containerEl: elRef.current,
        targetEl: elRef.current.querySelector(`path[data-index="${currentIndex}"]`),
        text: formatTooltipText(),
        cssClass: 'pie-chart-tooltip',
      });
      f7Tooltip.current.show();
      return;
    }
    if (!f7Tooltip.current) return;
    if (currentIndex !== null) {
      f7Tooltip.current.setText(formatTooltipText());
      f7Tooltip.current.setTargetEl(
        elRef.current.querySelector(`path[data-index="${currentIndex}"]`),
      );

      f7Tooltip.current.show();
    } else {
      f7Tooltip.current.hide();
    }
  };

  useEffect(() => {
    if (previousIndex.current === currentIndex) return;
    previousIndex.current = currentIndex;
    emit(props, 'select', currentIndex, datasets[currentIndex]);
    setTooltip();
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (f7Tooltip.current && f7Tooltip.current.destroy) {
        f7Tooltip.current.destroy();
      }
      f7Tooltip.current = null;
    };
  }, []);

  const classes = classNames('pie-chart', className);

  const paths = getPaths();

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={`-${size / 3} -${size / 3} ${(size * 2) / 3} ${(size * 2) / 3}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {paths.map((path, index) => (
          <path
            key={path.label || index}
            d={path.points}
            fill={path.color}
            data-index={index}
            className={classNames({
              'pie-chart-hidden': currentIndex !== null && currentIndex !== index,
            })}
            onClick={() => setCurrentIndex(index)}
            onMouseEnter={() => setCurrentIndex(index)}
            onMouseLeave={() => setCurrentIndex(null)}
          />
        ))}
      </svg>
      {children}
    </div>
  );
});

PieChart.displayName = 'f7-pie-chart';

export default PieChart;
