<template>
  <f7-page>
    <f7-navbar large title="Color Themes" back-link="Back">
      <template #right>
        <f7-link>Link</f7-link>
      </template>
    </f7-navbar>
    <f7-toolbar tabbar icons bottom>
      <f7-link
        tab-link="#tab-1"
        tab-link-active
        text="Tab 1"
        icon-ios="f7:envelope_fill"
        icon-md="material:email"
      />
      <f7-link
        tab-link="#tab-2"
        text="Tab 2"
        icon-ios="f7:calendar_fill"
        icon-md="material:today"
      />
      <f7-link
        tab-link="#tab-3"
        text="Tab 3"
        icon-ios="f7:cloud_upload_fill"
        icon-md="material:file_upload"
      />
    </f7-toolbar>
    <f7-block-title medium>Layout Themes</f7-block-title>
    <f7-block strong>
      <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
      <div class="grid grid-cols-2 grid-gap">
        <div class="bg-color-white demo-theme-picker" @click="setLayoutTheme('light')">
          <f7-checkbox v-if="theme === 'light'" checked disabled />
        </div>
        <div class="bg-color-black demo-theme-picker" @click="setLayoutTheme('dark')">
          <f7-checkbox v-if="theme === 'dark'" checked disabled />
        </div>
      </div>
    </f7-block>

    <f7-block-title medium>Default Color Themes</f7-block-title>
    <f7-block strong>
      <p>Framework7 comes with {{ colors.length }} color themes set.</p>
      <div class="grid grid-cols-3 medium-grid-cols-4 large-grid-cols-5 grid-gap">
        <div v-for="(color, index) in colors" :key="index">
          <f7-button
            fill
            round
            small
            class="demo-color-picker-button"
            :color="color"
            @click="setColorTheme(color)"
            >{{ color }}</f7-button
          >
        </div>
      </div>
    </f7-block>
    <f7-block-title medium>Custom Color Theme</f7-block-title>
    <f7-list strong-ios outline-ios>
      <f7-list-input
        type="colorpicker"
        label="HEX Color"
        placeholder="e.g. #ff0000"
        readonly
        :value="{ hex: themeColor }"
        :color-picker-params="{
          targetEl: '#color-theme-picker-color',
        }"
        @colorpicker:change="(value) => setCustomColor(value.hex)"
      >
        <template #media>
          <div
            id="color-theme-picker-color"
            style="
              width: 28px;
              height: 28px;
              border-radius: 4px;
              background: var(--f7-color-primary);
            "
          ></div>
        </template>
      </f7-list-input>
    </f7-list>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7BlockTitle,
  f7Button,
  f7Block,
  f7List,
  f7ListInput,
  f7Checkbox,
  f7Link,
  f7Toolbar,
  f7,
} from 'framework7-vue';
import $ from 'dom7';

let theme = 'light';
let themeColor = $('html').css('--f7-color-primary').trim();

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Button,
    f7Block,
    f7List,
    f7ListInput,
    f7Checkbox,
    f7Link,
    f7Toolbar,
  },
  data() {
    const colors = Object.keys(f7.colors).filter(
      (c) => c !== 'primary' && c !== 'white' && c !== 'black',
    );

    return {
      colors,
      theme,
      themeColor,
    };
  },

  methods: {
    setLayoutTheme(newTheme) {
      f7.setDarkMode(newTheme === 'dark');
      theme = newTheme;
      this.theme = newTheme;
    },

    setColorTheme(newColor) {
      themeColor = f7.colors[newColor];
      this.themeColor = themeColor;
      f7.setColorTheme(themeColor);
    },

    setCustomColor(newColor) {
      themeColor = newColor;
      this.themeColor = newColor;
      f7.setColorTheme(newColor);
    },
  },
};
</script>
