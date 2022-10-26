<template>
  <f7-page>
    <f7-navbar title="Gauge" back-link="Back"></f7-navbar>
    <f7-block strong-ios outline-ios>
      <p>
        Framework7 comes with Gauge component. It produces nice looking fully responsive SVG gauges.
      </p>
    </f7-block>
    <f7-block strong-ios outline-ios class="text-align-center">
      <f7-gauge
        type="circle"
        :value="gaugeValue"
        :size="250"
        border-color="#2196f3"
        :border-width="10"
        :value-text="`${gaugeValue * 100}%`"
        :value-font-size="41"
        value-text-color="#2196f3"
        label-text="amount of something"
      />
      <f7-segmented tag="p" raised>
        <f7-button :active="gaugeValue === 0" @click="() => (gaugeValue = 0)">0%</f7-button>
        <f7-button :active="gaugeValue === 0.25" @click="() => (gaugeValue = 0.25)">25%</f7-button>
        <f7-button :active="gaugeValue === 0.5" @click="() => (gaugeValue = 0.5)">50%</f7-button>
        <f7-button :active="gaugeValue === 0.75" @click="() => (gaugeValue = 0.75)">75%</f7-button>
        <f7-button :active="gaugeValue === 1" @click="() => (gaugeValue = 1)">100%</f7-button>
      </f7-segmented>
    </f7-block>

    <f7-block-title>Circle Gauges</f7-block-title>
    <f7-block strong-ios outline-ios>
      <div class="grid grid-cols-2 grid-gap">
        <div class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.44"
            value-text="44%"
            value-text-color="#ff9800"
            border-color="#ff9800"
          />
        </div>
        <div class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.12"
            value-text="$120"
            value-text-color="#4caf50"
            border-color="#4caf50"
            label-text="of $1000 budget"
            label-text-color="#f44336"
            :label-font-weight="700"
          />
        </div>
      </div>
    </f7-block>
    <f7-block-title>Semicircle Gauges</f7-block-title>
    <f7-block strong-ios outline-ios>
      <div class="grid grid-cols-2 grid-gap">
        <div class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.3"
            value-text="30%"
            value-text-color="#f44336"
            border-color="#f44336"
          />
        </div>
        <div class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.5"
            value-text="30kg"
            value-text-color="#e91e63"
            border-color="#e91e63"
            label-text="of 60kg total"
            label-text-color="#333"
          />
        </div>
      </div>
    </f7-block>
    <f7-block-title>Customization</f7-block-title>
    <f7-block strong-ios outline-ios>
      <div class="grid grid-cols-2 grid-gap">
        <div class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.35"
            value-text="35%"
            value-text-color="#4caf50"
            :value-font-size="51"
            :value-font-weight="700"
            :border-width="20"
            border-color="#4caf50"
            border-bg-color="#ffeb3b"
            bg-color="#ffeb3b"
          />
        </div>
        <div class="text-align-center">
          <f7-gauge
            type="circle"
            :value="0.67"
            value-text="$670"
            value-text-color="#000"
            border-color="#ff9800"
            label-text="of $1000 spent"
            label-text-color="#4caf50"
            :label-font-weight="800"
            :label-font-size="12"
            :border-width="30"
          />
        </div>
      </div>
      <br />
      <div class="grid grid-cols-2 grid-gap">
        <div class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.5"
            value-text="50%"
            value-text-color="#ffeb3b"
            :value-font-size="41"
            :value-font-weight="700"
            :border-width="10"
            border-color="#ffeb3b"
            border-bg-color="transparent"
          />
        </div>
        <div class="text-align-center">
          <f7-gauge
            type="semicircle"
            :value="0.77"
            border-color="#ff9800"
            label-text="$770 spent so far"
            label-text-color="#ff9800"
            :label-font-weight="800"
            :label-font-size="12"
            :border-width="10"
          />
        </div>
      </div>
    </f7-block>
  </f7-page>
</template>
<script>
import {
  f7Page,
  f7Navbar,
  f7BlockTitle,
  f7Block,
  f7Segmented,
  f7Button,
  f7Gauge,
} from 'framework7-vue';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
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
