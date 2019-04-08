<template>
  <f7-page>
    <f7-navbar large title="Color Themes" back-link="Back"></f7-navbar>
    <f7-block-title medium>Layout Themes</f7-block-title>
    <f7-block strong>
      <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
      <f7-row>
        <f7-col width="50" class="bg-color-white demo-theme-picker" @click="setLayoutTheme('light')">
          <f7-checkbox checked disabled v-if="theme === 'light'" />
        </f7-col>
        <f7-col width="50" class="bg-color-black demo-theme-picker" @click="setLayoutTheme('dark')">
          <f7-checkbox checked disabled v-if="theme === 'dark'" />
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title medium>Navigation Bars Style</f7-block-title>
    <f7-block strong>
      <p>Switch navigation bars to filled style:</p>
      <f7-row>
        <f7-col width="50" class="demo-bars-picker demo-bars-picker-empty" @click="setBarsStyle('empty')">
          <div class="demo-navbar"></div>
          <f7-checkbox checked disabled v-if="barsStyle === 'empty'" />
        </f7-col>
        <f7-col width="50" class="demo-bars-picker demo-bars-picker-fill" @click="setBarsStyle('fill')">
          <div class="demo-navbar"></div>
          <f7-checkbox checked disabled v-if="barsStyle === 'fill'" />
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title medium>Default Color Themes</f7-block-title>
    <f7-block strong>
      <p>Framework7 comes with {{colors.length}} color themes set.</p>
      <f7-row>
        <f7-col width="33" tabletWidth="25" desktopWidth="20" v-for="(color, index) in colors" :key="index">
          <f7-button fill round small class="demo-color-picker-button" :color="color" @click="setColorTheme(color)">{{color}}</f7-button>
        </f7-col>
        <f7-col width="33" tabletWidth="25" desktopWidth="20" />
        <f7-col width="33" tabletWidth="25" desktopWidth="20" />
        <f7-col width="33" tabletWidth="25" desktopWidth="20" />
      </f7-row>
    </f7-block>
    <f7-block-title medium>Custom Color Theme</f7-block-title>
    <f7-list>
      <f7-list-input
        type="colorpicker"
        label="HEX Color"
        placeholder="e.g. #ff0000"
        readonly
        :value="{hex: customColor || themeColor}"
        :color-picker-params="{
          targetEl: '#color-theme-picker-color',
        }"
        @colorpicker:change="value => setCustomColor(value.hex)"
      >
        <div
          slot="media"
          id="color-theme-picker-color"
          style="width: 28px; height: 28px; border-radius: 4px; background: var(--f7-theme-color)"
        ></div>
      </f7-list-input>
    </f7-list>

    <f7-block-title medium>Generated CSS Variables</f7-block-title>
    <f7-block strong>
      <template v-if="customProperties">
        <p>Add this code block to your custom stylesheet:</p>
        <pre style="overflow: auto; -webkit-overflow-scrolling: touch; margin: 0; font-size: 12px;">{{customProperties}}</pre>
      </template>
      <p v-else>Change navigation bars styles or specify custom color to see custom CSS variables here</p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Button, f7Row, f7Col, f7Block, f7List, f7ListInput, f7Checkbox } from 'framework7-vue';

  var stylesheet;
  var globalTheme = 'light';
  var globalBarsStyle = 'empty';
  var globalCustomColor = '';
  var globalCustomProperties = '';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Button,
      f7Row,
      f7Col,
      f7Block,
      f7List,
      f7ListInput,
      f7Checkbox,
    },
    data: function () {
      var colors = [
        'red',
        'green',
        'blue',
        'pink',
        'yellow',
        'orange',
        'purple',
        'deeppurple',
        'lightblue',
        'teal',
        'lime',
        'deeporange',
        'gray',
        'black',
      ];
      return {
        theme: globalTheme,
        barsStyle: globalBarsStyle,
        customColor: globalCustomColor,
        customProperties: globalCustomProperties,
        colors: colors,
        themeColor: this.$$('html').css('--f7-theme-color').trim(),
      };
    },
    mounted() {
      if (!stylesheet) {
        stylesheet = document.createElement('style');
        document.head.appendChild(stylesheet);
      }
    },
    methods: {
      generateStylesheet() {
        var self = this;
        var styles = '';
        if (self.customColor) {
          const colorThemeProperties = self.$f7.utils.colorThemeCSSProperties(self.customColor);
          if (Object.keys(colorThemeProperties).length) {
            styles += `
/* Custom color theme */
:root {
  ${Object.keys(colorThemeProperties)
    .map(key => `${key}: ${colorThemeProperties[key]};`)
    .join('\n  ')}
}`;
          }
        }
        if (self.barsStyle === 'fill') {
          styles += `
/* Invert navigation bars to fill style */
:root,
:root.theme-dark,
:root .theme-dark {
  --f7-bars-bg-color: var(--f7-theme-color);
  --f7-bars-text-color: #fff;
  --f7-bars-link-color: #fff;
  --f7-navbar-subtitle-text-color: rgba(255,255,255,0.85);
  --f7-bars-border-color: transparent;
  --f7-tabbar-link-active-color: #fff;
  --f7-tabbar-link-inactive-color: rgba(255,255,255,0.54);
  --f7-searchbar-bg-color: var(--f7-bars-bg-color);
  --f7-searchbar-input-bg-color: #fff;
  --f7-searchbar-input-text-color: #000;
  --f7-sheet-border-color: transparent;
  --f7-tabbar-link-active-border-color: #fff;
}
.appbar,
.navbar,
.toolbar,
.subnavbar,
.calendar-header,
.calendar-footer {
  --f7-touch-ripple-color: var(--f7-touch-ripple-white);
  --f7-link-highlight-color: var(--f7-link-highlight-white);
  --f7-button-text-color: #fff;
  --f7-button-pressed-bg-color: rgba(255,255,255,0.1);
}
          `;
        }
        return styles.trim();
      },
      setLayoutTheme: function (theme) {
        var self = this;
        var $html = self.$$('html');
        globalTheme = theme;
        $html.removeClass('theme-dark theme-light').addClass('theme-' + globalTheme);
        self.theme = globalTheme;
      },
      setColorTheme: function (color) {
        var self = this;
        var $html = self.$$('html');
        var currentColorClass = $html[0].className.match(/color-theme-([a-z]*)/);
        if (currentColorClass) $html.removeClass(currentColorClass[0])
        $html.addClass('color-theme-' + color);
        self.unsetCustomColor();
        self.themeColor = $html.css('--f7-color-' + color).trim();
      },
      setBarsStyle: function (barsStyle) {
        var self = this;
        globalBarsStyle = barsStyle;
        self.barsStyle = globalBarsStyle;
        globalCustomProperties = self.generateStylesheet();
        stylesheet.innerHTML = globalCustomProperties;
        self.customProperties = globalCustomProperties;
      },
      unsetCustomColor: function () {
        var self = this;
        globalCustomColor = '';
        self.customColor = '';
        globalCustomProperties = self.generateStylesheet();
        stylesheet.innerHTML = globalCustomProperties;
        self.customProperties = globalCustomProperties;
      },
      setCustomColor: function (color) {
        var self = this;
        if (self.themeColor === color) return;
        clearTimeout(self.timeout);
        self.timeout = setTimeout(() => {
          globalCustomColor = color;
          self.customColor = globalCustomColor;
          globalCustomProperties = self.generateStylesheet();
          stylesheet.innerHTML = globalCustomProperties;
          self.customProperties = globalCustomProperties;
        }, 300);
      },
    },
  };
</script>
