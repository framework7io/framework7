<template>
  <f7-page>
    <f7-navbar title="Range Slider" back-link="Back"></f7-navbar>

    <f7-block-title>Volume</f7-block-title>
    <f7-list simple-list>
      <f7-list-item>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon if-ios="f7:volume_mute_fill" if-md="material:volume_mute"></f7-icon>
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
          <f7-icon if-ios="f7:volume_fill" if-md="material:volume_up"></f7-icon>
        </f7-list-item-cell>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Brightness</f7-block-title>
    <f7-list simple-list>
      <f7-list-item>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon if-ios="f7:circle" if-md="material:brightness_low"></f7-icon>
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
          <f7-icon if-ios="f7:circle_half" if-md="material:brightness_high"></f7-icon>
        </f7-list-item-cell>
      </f7-list-item>
    </f7-list>

    <f7-block-title class="display-flex justify-content-space-between">Price Filter <span>${{priceMin}} - ${{priceMax}}</span></f7-block-title>
    <f7-list simple-list>
      <f7-list-item>
        <f7-list-item-cell class="width-auto flex-shrink-0">
          <f7-icon if-ios="f7:circle" if-md="material:brightness_low"></f7-icon>
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
          <f7-icon if-ios="f7:circle_half" if-md="material:brightness_high"></f7-icon>
        </f7-list-item-cell>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Range, f7List, f7ListItem, f7ListItemCell, f7Icon } from 'framework7-vue';

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
