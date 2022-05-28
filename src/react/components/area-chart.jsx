import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { f7 } from '../shared/f7.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  lineChart?: boolean;
  datasets?: {values: number[]; color?: string; label?: any}[];
  axis?: boolean;
  axisLabels?: any[];
  tooltip?: boolean;
  legend?: boolean;
  toggleDatasets?: boolean;
  width?: number;
  height?: number;
  maxAxisLabels?: number;
  formatAxisLabel?: (label: any) => string;
  formatLegendLabel?: (label: any) => string;
  formatTooltip?: (data: {index: number; total: number; datasets: {label: any; color: string; value: number}[]}) => string;
  formatTooltipAxisLabel?: (label: any) => string;
  formatTooltipTotal?: (total: number) => string;
  formatTooltipDataset?: (label: any, value: number, color: string) => string;
  onSelect? : (index: number | null) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const AreaChart = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    lineChart = false,
    datasets = [],
    axis = false,
    axisLabels = [],
    tooltip = false,
    legend = false,
    toggleDatasets = false,
    width = 640,
    height = 320,
    maxAxisLabels = 8,
    formatAxisLabel: formatAxisLabelProp,
    formatLegendLabel: formatLegendLabelProp,
    formatTooltip: formatTooltipProp,
    formatTooltipAxisLabel,
    formatTooltipTotal,
    formatTooltipDataset,
    children,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(null);
  const previousIndex = useRef(null);
  const [hiddenDatasets, setHiddenDatasets] = useState([]);

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const svgElRef = useRef(null);
  const f7Tooltip = useRef(null);
  const linesOffsets = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const getVisibleLegends = () => {
    if (!maxAxisLabels || axisLabels.length <= maxAxisLabels) return axisLabels;
    const skipStep = Math.ceil(axisLabels.length / maxAxisLabels);
    const filtered = axisLabels.filter((label, index) => index % skipStep === 0);
    return filtered;
  };

  const getSummValues = () => {
    const summValues = [];
    datasets
      .filter((dataset, index) => !hiddenDatasets.includes(index))
      .forEach(({ values }) => {
        values.forEach((value, valueIndex) => {
          if (!summValues[valueIndex]) summValues[valueIndex] = 0;
          summValues[valueIndex] += value;
        });
      });
    return summValues;
  };

  const getChartData = () => {
    const data = [];
    if (!datasets.length) {
      return data;
    }
    const lastValues = datasets[0].values.map(() => 0);
    let maxValue = 0;
    if (lineChart) {
      datasets.forEach(({ values }) => {
        const datasetMaxValue = Math.max(...values);
        if (datasetMaxValue > maxValue) maxValue = datasetMaxValue;
      });
    } else {
      maxValue = Math.max(...getSummValues());
    }

    datasets
      .filter((dataset, index) => !hiddenDatasets.includes(index))
      .forEach(({ label, values, color }) => {
        const points = values.map((originalValue, valueIndex) => {
          lastValues[valueIndex] += originalValue;
          const value = lineChart ? originalValue : lastValues[valueIndex];
          const x = (valueIndex / (values.length - 1)) * width;
          const y = height - (value / maxValue) * height;
          if (lineChart) {
            return `${valueIndex === 0 ? 'M' : 'L'}${x},${y}`;
          }
          return `${x} ${y}`;
        });
        if (!lineChart) {
          points.push(`${width} ${height} 0 ${height}`);
        }

        data.push({
          label,
          points: points.join(' '),
          color,
        });
      });
    return data.reverse();
  };

  const getVerticalLines = () => {
    const lines = [];
    if (!datasets.length) {
      return lines;
    }
    const values = datasets[0].values;
    values.forEach((value, valueIndex) => {
      const x = (valueIndex / (values.length - 1)) * width;
      lines.push(x);
    });
    return lines;
  };

  const toggleDataset = (index) => {
    if (!toggleDatasets) return;
    if (hiddenDatasets.includes(index)) {
      hiddenDatasets.splice(hiddenDatasets.indexOf(index), 1);
    } else {
      hiddenDatasets.push(index);
    }
    setHiddenDatasets([...hiddenDatasets]);
  };

  const formatAxisLabel = (label) => {
    if (formatAxisLabelProp) return formatAxisLabelProp(label);
    return label;
  };

  const formatLegendLabel = (label) => {
    if (formatLegendLabelProp) return formatLegendLabelProp(label);
    return label;
  };

  const calcLinesOffsets = () => {
    const lines = svgElRef.current.querySelectorAll('line');
    linesOffsets.current = [];
    for (let i = 0; i < lines.length; i += 1) {
      linesOffsets.current.push(lines[i].getBoundingClientRect().left);
    }
  };

  const formatTooltip = () => {
    if (currentIndex === null) return '';
    let total = 0;
    const currentValues = datasets
      .filter((dataset, index) => !hiddenDatasets.includes(index))
      .map((dataset) => ({
        color: dataset.color,
        label: dataset.label,
        value: dataset.values[currentIndex],
      }));
    currentValues.forEach((dataset) => {
      total += dataset.value;
    });
    if (formatTooltipProp) {
      return formatTooltipProp({
        index: currentIndex,
        total,
        datasets: currentValues,
      });
    }
    let labelText = formatTooltipAxisLabel
      ? formatTooltipAxisLabel(axisLabels[currentIndex])
      : formatAxisLabel(axisLabels[currentIndex]);
    if (!labelText) labelText = '';
    const totalText = formatTooltipTotal ? formatTooltipTotal(total) : total;
    // prettier-ignore
    const datasetsText = currentValues.length > 0 ? `
      <ul class="area-chart-tooltip-list">
        ${currentValues
          .map(({ label, color, value }) => {
            const valueText = formatTooltipDataset
              ? formatTooltipDataset(label, value, color)
              : `${label}: ${value}`;
            return `
              <li><span style="background-color: ${color};"></span>${valueText}</li>
            `;
          }).join('')}
      </ul>` : '';
    // prettier-ignore
    return `
      <div class="area-chart-tooltip-label">${labelText}</div>
      <div class="area-chart-tooltip-total">${totalText}</div>
      ${datasetsText}
    `;
  };

  const setTooltip = () => {
    if (!tooltip) return;
    const hasVisibleDataSets =
      datasets.filter((dataset, index) => !hiddenDatasets.includes(index)).length > 0;
    if (!hasVisibleDataSets) {
      if (f7Tooltip.current && f7Tooltip.current.hide) f7Tooltip.current.hide();
      return;
    }

    if (currentIndex !== null && !f7Tooltip.current) {
      f7Tooltip.current = f7.tooltip.create({
        trigger: 'manual',
        containerEl: elRef.current,
        targetEl: svgElRef.current.querySelector(`line[data-index="${currentIndex}"]`),
        text: formatTooltip(),
        cssClass: 'area-chart-tooltip',
      });
      if (f7Tooltip.current && f7Tooltip.current.show) {
        f7Tooltip.current.show();
      }
      return;
    }
    if (!f7Tooltip.current || !f7Tooltip.current.hide || !f7Tooltip.current.show) {
      return;
    }
    if (currentIndex !== null) {
      f7Tooltip.current.setText(formatTooltip());
      f7Tooltip.current.setTargetEl(
        svgElRef.current.querySelector(`line[data-index="${currentIndex}"]`),
      );
      f7Tooltip.current.show();
    } else {
      f7Tooltip.current.hide();
    }
  };

  const onMouseEnter = () => {
    calcLinesOffsets();
  };

  const onMouseMove = (e) => {
    if (!linesOffsets.current) {
      calcLinesOffsets();
    }
    let currentLeft = e.pageX;
    if (typeof currentLeft === 'undefined') currentLeft = 0;
    const distances = linesOffsets.current.map((left) => Math.abs(currentLeft - left));
    const minDistance = Math.min(...distances);
    const closestIndex = distances.indexOf(minDistance);
    setCurrentIndex(closestIndex);
  };

  const onMouseLeave = () => {
    setCurrentIndex(null);
  };

  const attachEvents = () => {
    if (!svgElRef.current) return;
    svgElRef.current.addEventListener('mouseenter', onMouseEnter);
    svgElRef.current.addEventListener('mousemove', onMouseMove);
    svgElRef.current.addEventListener('mouseleave', onMouseLeave);
  };

  const detachEvents = () => {
    if (!svgElRef.current) return;
    svgElRef.current.removeEventListener('mouseenter', onMouseEnter);
    svgElRef.current.removeEventListener('mousemove', onMouseMove);
    svgElRef.current.removeEventListener('mouseleave', onMouseLeave);
  };

  useEffect(() => {
    if (previousIndex.current === currentIndex) return;
    previousIndex.current = currentIndex;
    emit(props, 'select', currentIndex);
    setTooltip();
  }, [currentIndex]);

  useEffect(() => {
    attachEvents();
    return detachEvents;
  });

  useEffect(() => {
    return () => {
      if (f7Tooltip.current && f7Tooltip.current.destroy) {
        f7Tooltip.current.destroy();
      }
      f7Tooltip.current = null;
    };
  }, []);

  const classes = classNames('area-chart', className);

  const chartData = getChartData();
  const verticalLines = getVerticalLines();
  const visibleLegends = getVisibleLegends();

  const LegendItemTag = toggleDatasets ? 'button' : 'span';
  const ChartTag = lineChart ? 'path' : 'polygon';

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        ref={svgElRef}
      >
        {chartData.map((data, index) => (
          <ChartTag
            key={`${ChartTag}-${index}`}
            fill={lineChart ? undefined : data.color}
            stroke={lineChart ? data.color : undefined}
            fillRule="evenodd"
            points={lineChart ? undefined : data.points}
            d={lineChart ? data.points : undefined}
          />
        ))}

        {verticalLines.map((line, index) => (
          <line
            key={`line-${index}`}
            data-index={index}
            fill="#000"
            x1={line}
            y1={0}
            x2={line}
            y2={height}
            className={classNames({
              'area-chart-current-line': currentIndex === index,
            })}
          />
        ))}
      </svg>
      {axis && (
        <div className="area-chart-axis">
          {axisLabels.map((label, index) => (
            <span key={index}>
              {visibleLegends.includes(label) && <span>{formatAxisLabel(label)}</span>}
            </span>
          ))}
        </div>
      )}
      {legend && (
        <div className="area-chart-legend">
          {datasets.map((dataset, index) => (
            <LegendItemTag
              key={index}
              className={classNames('area-chart-legend-item', {
                'area-chart-legend-item-hidden': hiddenDatasets.includes(index),
                'area-chart-legend-button': toggleDatasets,
              })}
              type={toggleDatasets ? 'button' : undefined}
              onClick={() => toggleDataset(index)}
            >
              <span style={{ backgroundColor: dataset.color }}></span>
              {formatLegendLabel(dataset.label)}
            </LegendItemTag>
          ))}
        </div>
      )}
      {children}
    </div>
  );
});

AreaChart.displayName = 'f7-area-chart';

export default AreaChart;
