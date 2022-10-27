<template>
  <f7-page>
    <f7-navbar title="Pie Chart" back-link="Back" />
    <f7-block strong-ios outline-ios>
      <p>Framework7 comes with simple to use and fully responsive Pie Chart component.</p>
      <p>
        Pie Chart generates SVG layout which makes it also compatible with SSR (server side
        rendering).
      </p>
    </f7-block>
    <f7-block-title>Simple Pie Chart</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-pie-chart
        :datasets="[
          {
            value: 100,
            color: '#f00',
          },
          {
            value: 200,
            color: '#0f0',
          },
          {
            value: 300,
            color: '#00f',
          },
        ]"
      />
    </f7-block>

    <f7-block-title>With Tooltip</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-pie-chart
        tooltip
        :datasets="[
          {
            label: 'JavaScript',
            value: 150,
            color: '#ff0',
          },
          {
            label: 'Vue.js',
            value: 150,
            color: '#0f0',
          },
          {
            label: 'TypeScript',
            value: 400,
            color: '#00f',
          },
        ]"
      />
    </f7-block>

    <f7-block-title>Custom Format Tooltip</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-pie-chart
        tooltip
        :datasets="[
          {
            label: 'JavaScript',
            value: 1000,
            color: '#ff0',
          },
          {
            label: 'Vue.js',
            value: 100,
            color: '#0f0',
          },
          {
            label: 'TypeScript',
            value: 200,
            color: '#00f',
          },
        ]"
        :format-tooltip="
          ({ color, value, label }) =>
            `You have <span style='color: ${color}'>${value} points</span> for ${label}`
        "
      />
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7PieChart } from 'framework7-vue';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    f7PieChart,
  },
};
</script>
