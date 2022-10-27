<template>
  <f7-page>
    <f7-navbar title="Range Slider" back-link="Back"></f7-navbar>

    <f7-block-title>Volume</f7-block-title>
    <f7-list simple-list outline-ios strong-ios>
      <f7-list-item>
        <div>
          <f7-icon ios="f7:speaker_fill" md="material:volume_mute" />
        </div>
        <div style="width: 100%; margin: 0 16px">
          <f7-range :min="0" :max="100" :step="1" :value="10" />
        </div>
        <div>
          <f7-icon ios="f7:speaker_3_fill" md="material:volume_up" />
        </div>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Brightness</f7-block-title>
    <f7-list simple-list outline-ios strong-ios>
      <f7-list-item>
        <div>
          <f7-icon ios="f7:sun_min" md="material:brightness_low" />
        </div>
        <div style="width: 100%; margin: 0 16px">
          <f7-range :min="0" :max="100" :step="1" :value="50" :label="true" color="orange" />
        </div>
        <div>
          <f7-icon ios="f7:sun_max_fill" md="material:brightness_high" />
        </div>
      </f7-list-item>
    </f7-list>

    <f7-block-title class="display-flex justify-content-space-between"
      >Price Filter <span>${{ priceMin }} - ${{ priceMax }}</span></f7-block-title
    >
    <f7-list simple-list outline-ios strong-ios>
      <f7-list-item>
        <div>
          <f7-icon ios="f7:money_dollar_circle" md="material:attach_money" />
        </div>
        <div style="width: 100%; margin: 0 16px">
          <f7-range
            :min="0"
            :max="500"
            :step="1"
            :value="[priceMin, priceMax]"
            :label="true"
            :dual="true"
            color="green"
            @range:change="onPriceChange"
          />
        </div>
        <div>
          <f7-icon ios="f7:money_dollar_circle_fill" md="material:monetization_on" />
        </div>
      </f7-list-item>
    </f7-list>

    <f7-block-title>With Scale</f7-block-title>
    <f7-block strong-ios outline-ios>
      <f7-range
        :min="0"
        :max="100"
        :label="true"
        :step="5"
        :value="25"
        :scale="true"
        :scale-steps="5"
        :scale-sub-steps="4"
      />
    </f7-block>

    <f7-block-title>Vertical</f7-block-title>
    <f7-block strong-ios outline-ios class="display-flex justify-content-center">
      <f7-range
        class="margin-right"
        style="height: 160px"
        :vertical="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="25"
      />
      <f7-range
        class="margin-horizontal"
        style="height: 160px"
        :vertical="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="50"
      />
      <f7-range
        class="margin-horizontal"
        style="height: 160px"
        :vertical="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="75"
      />
      <f7-range
        class="margin-left"
        style="height: 160px"
        :dual="true"
        :vertical="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="[25, 75]"
      />
    </f7-block>

    <f7-block-title>Vertical Reversed</f7-block-title>
    <f7-block strong-ios outline-ios class="display-flex justify-content-center">
      <f7-range
        class="margin-right"
        color="red"
        style="height: 160px"
        :vertical="true"
        :vertical-reversed="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="25"
      />
      <f7-range
        class="margin-horizontal"
        color="red"
        style="height: 160px"
        :vertical="true"
        :vertical-reversed="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="50"
      />
      <f7-range
        class="margin-horizontal"
        color="red"
        style="height: 160px"
        :vertical="true"
        :vertical-reversed="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="75"
      />
      <f7-range
        class="margin-left"
        color="red"
        style="height: 160px"
        :dual="true"
        :vertical="true"
        :vertical-reversed="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="[25, 75]"
      />
    </f7-block>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7BlockTitle,
  f7Range,
  f7List,
  f7ListItem,
  f7Icon,
  f7Block,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Range,
    f7List,
    f7ListItem,
    f7Icon,
    f7Block,
  },
  data() {
    return {
      priceMin: 200,
      priceMax: 400,
    };
  },
  methods: {
    onPriceChange(values) {
      this.priceMin = values[0];
      this.priceMax = values[1];
    },
  },
};
</script>
