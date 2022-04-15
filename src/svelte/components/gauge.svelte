<script>
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  export let type = 'circle';
  export let value = 0;
  export let size = 200;
  export let bgColor = 'transparent';
  export let borderBgColor = '#eeeeee';
  export let borderColor = '#000000';
  export let borderWidth = 10;
  export let valueText = undefined;
  export let valueTextColor = '#000000';
  export let valueFontSize = 31;
  export let valueFontWeight = 500;
  export let labelText = undefined;
  export let labelTextColor = '#888888';
  export let labelFontSize = 14;
  export let labelFontWeight = 400;

  $: classes = classNames(className, 'gauge');

  $: semiCircle = type === 'semicircle';
  $: radius = size / 2 - borderWidth / 2;
  $: length = 2 * Math.PI * radius;
  $: progress = Math.max(Math.min(value, 1), 0);
</script>

<div class={classes} {...restProps($$restProps)}>
  <svg
    class="gauge-svg"
    width={`${size}px`}
    height={`${semiCircle ? size / 2 : size}px`}
    viewBox={`0 0 ${size} ${semiCircle ? size / 2 : size}`}
  >
    {#if semiCircle}
      <path
        class="gauge-back-semi"
        d={`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
        stroke={borderBgColor}
        stroke-width={borderWidth}
        fill={bgColor || 'none'}
      />
      <path
        class="gauge-front-semi"
        d={`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`}
        stroke={borderColor}
        stroke-width={borderWidth}
        stroke-dasharray={length / 2}
        stroke-dashoffset={(length / 2) * (1 + progress)}
        fill={borderBgColor ? 'none' : bgColor || 'none'}
      />
    {/if}
    {#if !semiCircle}
      {#if borderBgColor}
        <circle
          class="gauge-back-circle"
          stroke={borderBgColor}
          stroke-width={borderWidth}
          fill={bgColor || 'none'}
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
      {/if}
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
    {/if}
    {#if valueText}
      <text
        class="gauge-value-text"
        x="50%"
        y={semiCircle ? '100%' : '50%'}
        font-weight={valueFontWeight}
        font-size={valueFontSize}
        fill={valueTextColor}
        dy={semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0}
        text-anchor="middle"
        dominant-baseline={!semiCircle ? 'middle' : null}
      >
        {valueText}
      </text>
    {/if}
    {#if labelText}
      <text
        class="gauge-label-text"
        x="50%"
        y={semiCircle ? '100%' : '50%'}
        font-weight={labelFontWeight}
        font-size={labelFontSize}
        fill={labelTextColor}
        dy={semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0}
        text-anchor="middle"
        dominant-baseline={!semiCircle ? 'middle' : null}
      >
        {labelText}
      </text>
    {/if}
  </svg>
</div>
