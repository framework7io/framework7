<template>
  <f7-page>
    <f7-navbar title="Range Slider" back-link="Back"></f7-navbar>

    <f7-block-title>Volume</f7-block-title>
    <f7-list simple-list>
      <f7-list-item>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon ios="f7:volume_mute_fill" aurora="f7:volume_mute_fill" md="material:volume_mute"></f7-icon>
        </f7-list-item-cell>
        <f7-list-item-cell class="flex-shrink-3">
          <f7-range
            :min="0"
            :max="100"
            :step="1"
            :value="10"
          ></f7-range>
        </f7-list-item-cell>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon ios="f7:volume_fill" aurora="f7:volume_fill" md="material:volume_up"></f7-icon>
        </f7-list-item-cell>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Brightness</f7-block-title>
    <f7-list simple-list>
      <f7-list-item>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon ios="f7:circle" aurora="f7:circle" md="material:brightness_low"></f7-icon>
        </f7-list-item-cell>
        <f7-list-item-cell class="flex-shrink-3">
          <f7-range
            :min="0"
            :max="100"
            :step="1"
            :value="50"
            :label="true"
            color="orange"
          ></f7-range>
        </f7-list-item-cell>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon ios="f7:circle_half" aurora="f7:circle_half" md="material:brightness_high"></f7-icon>
        </f7-list-item-cell>
      </f7-list-item>
    </f7-list>

    <f7-block-title class="display-flex justify-content-space-between">Price Filter <span>${{priceMin}} - ${{priceMax}}</span></f7-block-title>
    <f7-list simple-list>
      <f7-list-item>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon ios="f7:money_dollar_round" aurora="f7:money_dollar_round" md="material:attach_money"></f7-icon>
        </f7-list-item-cell>
        <f7-list-item-cell class="flex-shrink-3">
          <f7-range
            :min="0"
            :max="500"
            :step="1"
            :value="[priceMin, priceMax]"
            :label="true"
            :dual="true"
            color="green"
            @range:change="onPriceChange"
          ></f7-range>
        </f7-list-item-cell>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon ios="f7:money_dollar_round_fill" aurora="f7:money_dollar_round_fill" md="material:monetization_on"></f7-icon>
        </f7-list-item-cell>
      </f7-list-item>
    </f7-list>

    <f7-block-title>With Scale</f7-block-title>
    <f7-block strong>
      <f7-range
        :min="0"
        :max="100"
        :label="true"
        :step="5"
        :value="25"
        :scale="true"
        :scale-steps="5"
        :scale-sub-steps="4"
      ></f7-range>
    </f7-block>

    <f7-block-title>Vertical</f7-block-title>
    <f7-block strong class="display-flex justify-content-center">
      <f7-range
        class="margin-right"
        style="height: 160px"
        :vertical="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="25"
      /></f7-range>
      <f7-range
        class="margin-horizontal"
        style="height: 160px"
        :vertical="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="50"
      /></f7-range>
      <f7-range
        class="margin-horizontal"
        style="height: 160px"
        :vertical="true"
        :min="0"
        :max="100"
        :label="true"
        :step="1"
        :value="75"
      /></f7-range>
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
      /></f7-range>
    </f7-block>

    <f7-block-title>Vertical Reversed</f7-block-title>
    <f7-block strong class="display-flex justify-content-center">
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
      /></f7-range>
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
      /></f7-range>
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
      /></f7-range>
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
      /></f7-range>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Range, f7List, f7ListItem, f7ListItemCell, f7Icon, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Range,
      f7List,
      f7ListItem,
      f7ListItemCell,
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
