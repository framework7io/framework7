<template>
  <f7-page>
    <f7-navbar title="Color Themes" back-link="Back"></f7-navbar>
    <f7-block-title>Layout Themes</f7-block-title>
    <f7-block>
      <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
      <f7-row>
        <f7-col width="50" class="bg-color-white" @click.native="setLayoutTheme('light')" style="cursor: pointer; padding: 30px; border: 1px solid rgba(0,0,0,0.1)"></f7-col>
        <f7-col width="50" class="bg-color-black" @click.native="setLayoutTheme('dark')" style="cursor: pointer; padding: 30px; border: 1px solid rgba(255,255,255,0.1)"></f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Choose Color Theme</f7-block-title>
    <f7-block>
      <p>Framework7 comes with {{colorsAmount}} color themes set.</p>
      <f7-row>
        <f7-col width="33" v-for="color in colors" :key="color">
          <f7-button style="margin-bottom:1em; text-transform: capitalize;" fill round raised :color="color" @click="setColorTheme(color)">
            {{ color }}
          </f7-button>
        </f7-col>
        <f7-col width="33"></f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Button, f7Row, f7Col, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Button,
      f7Row,
      f7Col,
      f7Block,
    },
    data() {
      const colors = [
        'red',
        'green',
        'blue',
        'pink',
        'yellow',
        'orange',
        'gray',
        'black',
      ];
      return {
        colors,
        colorsAmount: colors.length,
      };
    },
    methods: {
      setLayoutTheme(theme) {
        const self = this;
        const app = self.$f7;
        app.root.removeClass('theme-dark theme-light').addClass(`theme-${theme}`);
      },
      setColorTheme(color) {
        const self = this;
        const app = self.$f7;
        const currentColorClass = app.root[0].className.match(/color-theme-([a-z]*)/);
        if (currentColorClass) app.root.removeClass(currentColorClass[0]);
        app.root.addClass(`color-theme-${color}`);
      },
    },
  };
</script>
