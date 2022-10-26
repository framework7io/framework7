<template>
  <f7-page>
    <f7-navbar title="Area Chart" back-link="Back" />
    <f7-block strong-ios outline-ios>
      <p>Framework7 comes with simple to use and fully responsive Area Chart component.</p>
      <p>
        Area Chart generates SVG layout which makes it also compatible with SSR (server side
        rendering).
      </p>
    </f7-block>
    <f7-block-title>Simple Area Chart</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-area-chart
        :datasets="[
          {
            color: '#f00',
            values: [0, 100, 250, 300, 175, 400],
          },
          {
            color: '#00f',
            values: [100, 75, 133, 237, 40, 200],
          },
          {
            color: '#ff0',
            values: [100, 300, 127, 40, 250, 80],
          },
        ]"
      />
    </f7-block>
    <f7-block-title>Area Chart With Tooltip</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-area-chart
        tooltip
        :datasets="[
          {
            label: 'Red data',
            color: '#f00',
            values: [100, 75, 133, 237, 40, 200],
          },
          {
            label: 'Blue data',
            color: '#00f',
            values: [100, 300, 127, 40, 250, 80],
          },
          {
            label: 'Yellow data',
            color: '#ff0',
            values: [0, 100, 250, 300, 175, 400],
          },
        ]"
      />
    </f7-block>
    <f7-block-title>Area Chart With Axis</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-area-chart
        tooltip
        axis
        :axis-labels="dates"
        :format-axis-label="(date) => axisDateFormat.format(date)"
        :format-tooltip-axis-label="(date) => tooltipDateFormat.format(date)"
        :datasets="[
          {
            label: 'Green data',
            color: '#0f0',
            values: [100, 75, 133, 237],
          },
          {
            label: 'Red data',
            color: '#f00',
            values: [100, 300, 127, 47],
          },
          {
            label: 'Yellow data',
            color: '#ff0',
            values: [0, 100, 250, 307],
          },
        ]"
      />
    </f7-block>
    <f7-block-title>Area Chart With Legend</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-area-chart
        tooltip
        axis
        :axis-labels="dates"
        legend
        toggle-datasets
        :format-axis-label="(date) => axisDateFormat.format(date)"
        :format-tooltip-axis-label="(date) => tooltipDateFormat.format(date)"
        :datasets="[
          {
            label: 'Red data',
            color: '#f00',
            values: [100, 300, 127, 47],
          },
          {
            label: 'Blue data',
            color: '#00f',
            values: [100, 75, 133, 237],
          },
          {
            label: 'Yellow data',
            color: '#ff0',
            values: [0, 100, 250, 307],
          },
        ]"
      />
    </f7-block>
    <f7-block-title>Lines Chart</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-area-chart
        tooltip
        axis
        :axis-labels="dates"
        legend
        toggle-datasets
        line-chart
        :format-axis-label="(date) => axisDateFormat.format(date)"
        :format-tooltip-axis-label="(date) => tooltipDateFormat.format(date)"
        :datasets="[
          {
            label: 'Red data',
            color: '#f00',
            values: [0, 300, 127, 47],
          },
          {
            label: 'Blue data',
            color: '#00f',
            values: [0, 75, 133, 237],
          },
          {
            label: 'Green data',
            color: '#0f0',
            values: [0, 100, 250, 307],
          },
        ]"
      />
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7AreaChart } from 'framework7-vue';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    f7AreaChart,
  },
  setup() {
    // helpers data for axis
    const dates = [];
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    for (let i = 0; i < 4; i += 1) {
      dates.push(new Date(year, month - (3 - i)));
    }
    const axisDateFormat = Intl.DateTimeFormat(undefined, { month: 'short', year: 'numeric' });
    const tooltipDateFormat = Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
    return {
      dates,
      axisDateFormat,
      tooltipDateFormat,
    };
  },
};
</script>
