<template>
  <div class="gauge">
    <svg
      class="gauge-svg"
      :width="`${size}px`"
      :height="`${semiCircle ? size / 2 : size}px`"
      :viewBox="`0 0 ${size} ${semiCircle ? size / 2 : size}`"
    >
      <path
        v-if="semiCircle"
        class="gauge-back-semi"
        :d="`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`"
        :stroke="borderBgColor"
        :stroke-width="borderWidth"
        :fill="bgColor || 'none'"
      />
      <path
        v-if="semiCircle"
        class="gauge-front-semi"
        :d="`M${size - borderWidth / 2},${size / 2} a1,1 0 0,0 -${size - borderWidth},0`"
        :stroke="borderColor"
        :stroke-width="borderWidth"
        :stroke-dasharray="length / 2"
        :stroke-dashoffset="(length / 2) * (1 + progress)"
        :fill="borderBgColor ? 'none' : bgColor || 'none'"
      />
      <circle
        v-if="!semiCircle && borderBgColor"
        class="gauge-back-circle"
        :stroke="borderBgColor"
        :stroke-width="borderWidth"
        :fill="bgColor || 'none'"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
      />
      <circle
        v-if="!semiCircle"
        class="gauge-front-circle"
        :transform="`rotate(-90 ${size / 2} ${size / 2})`"
        :stroke="borderColor"
        :stroke-width="borderWidth"
        :stroke-dasharray="length"
        :stroke-dashoffset="length * (1 - progress)"
        :fill="borderBgColor ? 'none' : bgColor || 'none'"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
      />
      <text
        v-if="valueText"
        class="gauge-value-text"
        x="50%"
        :y="semiCircle ? '100%' : '50%'"
        :font-weight="valueFontWeight"
        :font-size="valueFontSize"
        :fill="valueTextColor"
        :dy="semiCircle ? (labelText ? -labelFontSize - 15 : -5) : 0"
        text-anchor="middle"
        :dominant-baseline="!semiCircle ? 'middle' : null"
      >
        {{ valueText }}
      </text>
      <text
        v-if="labelText"
        class="gauge-label-text"
        x="50%"
        :y="semiCircle ? '100%' : '50%'"
        :font-weight="labelFontWeight"
        :font-size="labelFontSize"
        :fill="labelTextColor"
        :dy="semiCircle ? -5 : valueText ? valueFontSize / 2 + 10 : 0"
        text-anchor="middle"
        :dominant-baseline="!semiCircle ? 'middle' : null"
      >
        {{ labelText }}
      </text>
    </svg>
  </div>
</template>
<script>
import { computed } from 'vue';

export default {
  name: 'f7-gauge',
  props: {
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
  setup(props) {
    const semiCircle = computed(() => props.type === 'semicircle');
    const radius = computed(() => props.size / 2 - props.borderWidth / 2);
    const length = computed(() => 2 * Math.PI * radius.value);
    const progress = computed(() => Math.max(Math.min(props.value, 1), 0));
    return {
      semiCircle,
      radius,
      length,
      progress,
    };
  },
};
</script>
