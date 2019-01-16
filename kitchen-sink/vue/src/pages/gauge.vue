<template>
  <f7-page>
    <f7-navbar title="Gauge" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Framework7 comes with Gauge component. It produces nice looking fully responsive SVG gauges.</p>
    </f7-block>
    <f7-block strong class="text-align-center">
      <f7-gauge
        type="circle"
        :value="gaugeValue"
        :size="250"
        borderColor="#2196f3"
        :borderWidth="10"
        :valueText="`${gaugeValue * 100}%`"
        :valueFontSize="41"
        valueTextColor="#2196f3"
        labelText="amount of something"
      />
      <f7-segmented tag="p" raised>
        <f7-button :active="gaugeValue === 0" @click="() => gaugeValue = 0">0%</f7-button>
        <f7-button :active="gaugeValue === 0.25" @click="() => gaugeValue = 0.25">25%</f7-button>
        <f7-button :active="gaugeValue === 0.5" @click="() => gaugeValue = 0.5">50%</f7-button>
        <f7-button :active="gaugeValue === 0.75" @click="() => gaugeValue = 0.75">75%</f7-button>
        <f7-button :active="gaugeValue === 1" @click="() => gaugeValue = 1">100%</f7-button>
      </f7-segmented>
    </f7-block>

    <f7-block-title>Circle Gauges</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.44"
            valueText="44%"
            valueTextColor="#ff9800"
            borderColor="#ff9800"
          />
        </f7-col>
        <f7-col class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.12"
            valueText="$120"
            valueTextColor="#4caf50"
            borderColor="#4caf50"
            labelText="of $1000 budget"
            labelTextColor="#f44336"
            :labelFontWeight="700"
          />
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Semicircle Gauges</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.3"
            valueText="30%"
            valueTextColor="#f44336"
            borderColor="#f44336"
          />
        </f7-col>
        <f7-col class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.5"
            valueText="30kg"
            valueTextColor="#e91e63"
            borderColor="#e91e63"
            labelText="of 60kg total"
            labelTextColor="#333"
          />
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Customization</f7-block-title>
    <f7-block strong>
      <f7-row>
        <f7-col class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.35"
            valueText="35%"
            valueTextColor="#4caf50"
            :valueFontSize="51"
            :valueFontWeight="700"
            :borderWidth="20"
            borderColor="#4caf50"
            borderBgColor="#ffeb3b"
            bgColor="#ffeb3b"
          />
        </f7-col>
        <f7-col class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.67"
            valueText="$670"
            valueTextColor="#000"
            borderColor="#ff9800"
            labelText="of $1000 spent"
            labelTextColor="#4caf50"
            :labelFontWeight="800"
            :labelFontSize="12"
            :borderWidth="30"
          />
        </f7-col>
      </f7-row>
      <br />
      <f7-row>
        <f7-col class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.5"
            valueText="50%"
            valueTextColor="#ffeb3b"
            :valueFontSize="41"
            :valueFontWeight="700"
            :borderWidth="10"
            borderColor="#ffeb3b"
            borderBgColor="transparent"
          />
        </f7-col>
        <f7-col class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.77"
            borderColor="#ff9800"
            labelText="$770 spent so far"
            labelTextColor="#ff9800"
            :labelFontWeight="800"
            :labelFontSize="12"
            :borderWidth="10"
          />
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7Row, f7Col, f7Segmented, f7Button, f7Gauge } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7Row,
      f7Col,
      f7Segmented,
      f7Button,
      f7Gauge,
    },
    data() {
      return {
        gaugeValue: 0.5,
      };
    },
  };
</script>
