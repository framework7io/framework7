<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar title="Color Picker" back-link="Back"></f7-navbar>

    <f7-block strong>
      <p>Framework7 comes with ultimate modular Color Picker component that allows to create color picker with limitless combinations of color modules.</p>
    </f7-block>
    <f7-block-title>Color Picker Modules</f7-block-title>
    <f7-block class="no-padding">
      <div class="data-table">
        <table>
          <tbody>
            <tr>
              <th class="label-cell">current-color</th>
              <td>currently selected color</td>
            </tr>
            <tr>
              <th class="label-cell">initial-current-color</th>
              <td>initial color and currently selected colors</td>
            </tr>
            <tr>
              <th class="label-cell">wheel</th>
              <td>HSB(V) color wheel</td>
            </tr>
            <tr>
              <th class="label-cell">sb-spectrum</th>
              <td>SB (saturation-brightness) spectrum</td>
            </tr>
            <tr>
              <th class="label-cell">hex</th>
              <td>HEX color value</td>
            </tr>
            <tr>
              <th class="label-cell">rgb-sliders</th>
              <td>RGB (red, green, blue) sliders</td>
            </tr>
            <tr>
              <th class="label-cell">rgb-bar</th>
              <td>RGB (red, green, blue) bars (vertical sliders)</td>
            </tr>
            <tr>
              <th class="label-cell">hsb-sliders</th>
              <td>HSB (hue, saturation, brightness) sliders</td>
            </tr>
            <tr>
              <th class="label-cell">hue-slider</th>
              <td>Hue slider</td>
            </tr>
            <tr>
              <th class="label-cell">alpha-slider</th>
              <td>Alpha slider</td>
            </tr>
            <tr>
              <th class="label-cell">palette</th>
              <td>predefined colors palette to select from</td>
            </tr>
          </tbody>
        </table>
      </div>
    </f7-block>

    <f7-block-title>Color Wheel</f7-block-title>
    <f7-block-header>Minimal example with color wheel in Popover</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="wheePickerValue"
        @colorpicker:change="(value) => wheePickerValue = value"
      >
        <i
          slot="media"
          :style="`background-color: ${wheePickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Saturation-Brightness Spectrum</f7-block-title>
    <f7-block-header>SB Spectrum + Hue Slider in Popover</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="spectrumPickerValue"
        @colorpicker:change="(value) => spectrumPickerValue = value"
        :color-picker-params="{
          modules: ['sb-spectrum', 'hue-slider']
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${spectrumPickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>RGB Sliders</f7-block-title>
    <f7-block-header>RGB sliders with labels and values in Popover</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="rgbPickerValue"
        @colorpicker:change="(value) => rgbPickerValue = value"
        :color-picker-params="{
          modules: ['rgb-sliders'],
          sliderValue: true,
          sliderLabel: true,
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${rgbPickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>RGBA Sliders</f7-block-title>
    <f7-block-header>RGB sliders + Alpha Slider with labels and values in Popover</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="rgbaPickerValue"
        @colorpicker:change="(value) => rgbaPickerValue = value"
        :color-picker-params="{
          modules: ['rgb-sliders', 'alpha-slider'],
          sliderValue: true,
          sliderLabel: true,
          formatValue(value) {
            return `rgba(${value.rgb.join(', ')}, ${value.alpha})`;
          },
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${rgbaPickerValue.rgb ? `rgba(${rgbaPickerValue.rgb.join(', ')}, ${rgbaPickerValue.alpha})` : rgbaPickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>HSB Sliders</f7-block-title>
    <f7-block-header>HSB sliders with labels and values in Popover</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="hsbPickerValue"
        @colorpicker:change="(value) => hsbPickerValue = value"
        :color-picker-params="{
          modules: ['hsb-sliders'],
          sliderValue: true,
          sliderLabel: true,
          formatValue(value) {
            return `hsb(${value.hsb[0]}, ${value.hsb[1] * 1000 / 10}%, ${value.hsb[2] * 1000 / 10}%)`
          },
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${hsbPickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>RGB Bars</f7-block-title>
    <f7-block-header>RGB bars with labels and values in Popover on tablet and in Popup on phone</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="rgbBarsPickerValue"
        @colorpicker:change="(value) => rgbBarsPickerValue = value"
        :color-picker-params="{
          modules: ['rgb-bars'],
          openIn: 'auto',
          barValue: true,
          barLabel: true,
          formatValue(value) {
            return `rgb(${value.rgb.join(', ')})`;
          },
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${rgbBarsPickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>RGB Sliders + Colors</f7-block-title>
    <f7-block-header>RGB sliders with labels and values in Popover, and previous and current color values blocks</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="rgbSlidersColorsPickerValue"
        @colorpicker:change="(value) => rgbSlidersColorsPickerValue = value"
        :color-picker-params="{
          modules: ['initial-current-colors', 'rgb-sliders'],
          sliderValue: true,
          sliderLabel: true,
          formatValue(value) {
            return `rgb(${value.rgb.join(', ')})`;
          },
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${rgbSlidersColorsPickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Palette</f7-block-title>
    <f7-block-header>Palette opened in Sheet modal on phone and Popover on larger screens</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="palettePickerValue"
        @colorpicker:change="(value) => palettePickerValue = value"
        :color-picker-params="{
          modules: ['palette'],
          openIn: 'auto',
          openInPhone: 'sheet',
          palette: [
            ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'],
            ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
            ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'],
            ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
            ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'],
            ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
            ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
            ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
          ],
          formatValue(value) {
            return value.hex;
          },
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${palettePickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Pro Mode</f7-block-title>
    <f7-block-header>Current Color + HSB Sliders + RGB sliders + Alpha Slider + HEX + Palette with labels and editable values</f7-block-header>
    <f7-list no-hairlines-md>
      <f7-list-input
        type="colorpicker"
        placeholder="Color"
        readonly
        :value="proPickerValue"
        @colorpicker:change="(value) => proPickerValue = value"
        :color-picker-params="{
          modules: ['initial-current-colors', 'sb-spectrum', 'hsb-sliders', 'rgb-sliders', 'alpha-slider', 'hex', 'palette'],
          openIn: 'auto',
          sliderValue: true,
          sliderValueEditable: true,
          sliderLabel: true,
          hexLabel: true,
          hexValueEditable: true,
          groupedModules: true,
          palette: [
            ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350', '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C'],
            ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC', '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C'],
            ['#E8EAF6', '#C5CAE9', '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E'],
            ['#E1F5FE', '#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B'],
            ['#E0F2F1', '#B2DFDB', '#80CBC4', '#4DB6AC', '#26A69A', '#009688', '#00897B', '#00796B', '#00695C', '#004D40'],
            ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E'],
            ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'],
            ['#FFF3E0', '#FFE0B2', '#FFCC80', '#FFB74D', '#FFA726', '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100'],
          ],
          formatValue(value) {
            return `rgba(${value.rgb.join(', ')}, ${value.alpha})`;
          },
        }"
      >
        <i
          slot="media"
          :style="`background-color: ${proPickerValue.rgb ? `rgba(${proPickerValue.rgb.join(', ')}, ${proPickerValue.alpha})` : proPickerValue.hex}`"
          class="icon demo-list-icon"
        ></i>
      </f7-list-input>
    </f7-list>

    <f7-block-title>Inline Color Picker</f7-block-title>
    <f7-block-header>SB Spectrum + HSB Sliders</f7-block-header>
    <div class="block block-strong no-padding">
      <div class="padding" v-if="inlinePickerValue.rgb">
        HEX: {{inlinePickerValue.hex}}<br>
        Alpha: {{inlinePickerValue.alpha}}<br>
        Hue: {{inlinePickerValue.hue}}<br>
        RGB: {{inlinePickerValue.rgb.join(', ')}}<br>
        HSL: {{inlinePickerValue.hsl.join(', ')}}<br>
        HSB: {{inlinePickerValue.hsb.join(', ')}}
      </div>
      <div id="demo-color-picker-inline"></div>
    </div>

  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7BlockTitle, f7BlockHeader, f7List, f7ListInput } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7BlockTitle,
      f7BlockHeader,
      f7List,
      f7ListInput,
    },
    data() {
      return {
        wheePickerValue: { hex: '#00ff00' },
        spectrumPickerValue: { hex: '#ff0000' },
        rgbPickerValue: { hex: '#0000ff' },
        rgbaPickerValue: { hex: '#ff00ff' },
        hsbPickerValue: { hex: '#00ff00' },
        rgbBarsPickerValue: { hex: '#0000ff' },
        rgbSlidersColorsPickerValue: { hex: '#ffff00' },
        palettePickerValue: { hex: '#FFEBEE' },
        proPickerValue: { hex: '#00ffff' },
        inlinePickerValue: { hex: '#77ff66' },
      };
    },
    methods: {
      onPageInit(e) {
        const self = this;
        const app = self.$f7;

        self.colorPickerInline = app.colorPicker.create({
          value: self.inlinePickerValue,
          containerEl: '#demo-color-picker-inline',
          modules: ['sb-spectrum', 'hsb-sliders', 'alpha-slider'],
          on: {
            change(cp, value) {
              self.inlinePickerValue = value;
            },
          },
        });
      },
      onPageBeforeRemove() {
        const self = this;
        self.colorPickerInline.destroy();
      },
    },
  };
</script>
