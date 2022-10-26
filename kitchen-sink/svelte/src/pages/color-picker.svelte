<script>
  import { onMount, onDestroy } from 'svelte';
  import {
    f7,
    Navbar,
    Page,
    Block,
    BlockTitle,
    BlockHeader,
    List,
    ListInput,
  } from 'framework7-svelte';

  let wheePickerValue = { hex: '#00ff00' };
  let spectrumPickerValue = { hex: '#ff0000' };
  let hsSpectrumPickerValue = { hex: '#ff0000' };
  let rgbPickerValue = { hex: '#0000ff' };
  let rgbaPickerValue = { hex: '#ff00ff' };
  let hsbPickerValue = { hex: '#00ff00' };
  let rgbBarsPickerValue = { hex: '#0000ff' };
  let rgbSlidersColorsPickerValue = { hex: '#ffff00' };
  let palettePickerValue = { hex: '#FFEBEE' };
  let proPickerValue = { hex: '#00ffff' };
  let inlinePickerValue = { hex: '#77ff66' };

  let colorPickerInline;

  onMount(() => {
    colorPickerInline = f7.colorPicker.create({
      value: inlinePickerValue,
      containerEl: '#demo-color-picker-inline',
      modules: ['sb-spectrum', 'hsb-sliders', 'alpha-slider'],
      on: {
        change(cp, value) {
          inlinePickerValue = value;
        },
      },
    });
  });

  onDestroy(() => {
    colorPickerInline.destroy();
  });
</script>

<Page>
  <Navbar title="Color Picker" backLink="Back" />

  <Block strongIos outlineIos>
    <p>
      Framework7 comes with ultimate modular Color Picker component that allows to create color
      picker with limitless combinations of color modules.
    </p>
  </Block>

  <BlockTitle>Color Wheel</BlockTitle>
  <BlockHeader>Minimal example with color wheel in Popover</BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={wheePickerValue}
      onColorPickerChange={(value) => wheePickerValue = value}
      colorPickerParams={{
        targetEl: '.wheel-picker-target',
      }}
    >
      <i
        slot="media"
        style={`background-color: ${wheePickerValue.hex}`}
        class="icon demo-list-icon wheel-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>Saturation-Brightness Spectrum</BlockTitle>
  <BlockHeader>SB Spectrum + Hue Slider in Popover</BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={spectrumPickerValue}
      onColorPickerChange={(value) => spectrumPickerValue = value}
      colorPickerParams={{
        modules: ['sb-spectrum', 'hue-slider'],
        targetEl: '.spectrum-picker-target',
      }}
    >
      <i
        slot="media"
        style={`background-color: ${spectrumPickerValue.hex}`}
        class="icon demo-list-icon spectrum-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>Hue-Saturation Spectrum</BlockTitle>
  <BlockHeader>HS Spectrum + Brightness Slider in Popover</BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={hsSpectrumPickerValue}
      onColorPickerChange={(value) => hsSpectrumPickerValue = value}
      colorPickerParams={{
        modules: ['hs-spectrum', 'brightness-slider'],
        targetEl: '.hs-spectrum-picker-target',
      }}
    >
      <i
        slot="media"
        style={`background-color: ${hsSpectrumPickerValue.hex}`}
        class="icon demo-list-icon hs-spectrum-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>RGB Sliders</BlockTitle>
  <BlockHeader>RGB sliders with labels and values in Popover</BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={rgbPickerValue}
      onColorPickerChange={(value) => rgbPickerValue = value}
      colorPickerParams={{
        modules: ['rgb-sliders'],
        sliderValue: true,
        sliderLabel: true,
        targetEl: '.rgb-picker-target',
      }}
    >
      <i
        slot="media"
        style={`background-color: ${rgbPickerValue.hex}`}
        class="icon demo-list-icon rgb-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>RGBA Sliders</BlockTitle>
  <BlockHeader>RGB sliders + Alpha Slider with labels and values in Popover</BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={rgbaPickerValue}
      onColorPickerChange={(value) => rgbaPickerValue = value}
      colorPickerParams={{
        modules: ['rgb-sliders', 'alpha-slider'],
        sliderValue: true,
        sliderLabel: true,
        targetEl: '.rgba-picker-target',
        formatValue(value) {
          return `rgba(${value.rgba.join(', ')})`;
        },
      }}
    >
      <i
        slot="media"
        style={`background-color: ${rgbaPickerValue.rgba ? `rgba(${rgbaPickerValue.rgba.join(', ')})` : rgbaPickerValue.hex}`}
        class="icon demo-list-icon rgba-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>HSB Sliders</BlockTitle>
  <BlockHeader>HSB sliders with labels and values in Popover</BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={hsbPickerValue}
      onColorPickerChange={(value) => hsbPickerValue = value}
      colorPickerParams={{
        modules: ['hsb-sliders'],
        sliderValue: true,
        sliderLabel: true,
        targetEl: '.hsb-picker-target',
        formatValue(value) {
          return `hsb(${value.hsb[0]}, ${value.hsb[1] * 1000 / 10}%, ${value.hsb[2] * 1000 / 10}%)`;
        },
      }}
    >
      <i
        slot="media"
        style={`background-color: ${hsbPickerValue.hex}`}
        class="icon demo-list-icon hsb-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>RGB Bars</BlockTitle>
  <BlockHeader>
    RGB bars with labels and values in Popover on tablet and in Popup on phone
  </BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={rgbBarsPickerValue}
      onColorPickerChange={(value) => rgbBarsPickerValue = value}
      colorPickerParams={{
        modules: ['rgb-bars'],
        openIn: 'auto',
        barValue: true,
        barLabel: true,
        targetEl: '.rgb-bars-picker-target',
        formatValue(value) {
          return `rgb(${value.rgb.join(', ')})`;
        },
      }}
    >
      <i
        slot="media"
        style={`background-color: ${rgbBarsPickerValue.hex}`}
        class="icon demo-list-icon rgb-bars-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>RGB Sliders + Colors</BlockTitle>
  <BlockHeader>
    RGB sliders with labels and values in Popover, and previous and current color values blocks
  </BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={rgbSlidersColorsPickerValue}
      onColorPickerChange={(value) => rgbSlidersColorsPickerValue = value}
      colorPickerParams={{
        modules: ['initial-current-colors', 'rgb-sliders'],
        sliderValue: true,
        sliderLabel: true,
        targetEl: '.rgb-sliders-colors-picker-target',
        formatValue(value) {
          return `rgb(${value.rgb.join(', ')})`;
        },
      }}
    >
      <i
        slot="media"
        style={`background-color: ${rgbSlidersColorsPickerValue.hex}`}
        class="icon demo-list-icon rgb-sliders-colors-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>Palette</BlockTitle>
  <BlockHeader>Palette opened in Sheet modal on phone and Popover on larger screens</BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={palettePickerValue}
      onColorPickerChange={(value) => palettePickerValue = value}
      colorPickerParams={{
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
        targetEl: '.palette-picker-target',
        formatValue(value) {
          return value.hex;
        },
      }}
    >
      <i
        slot="media"
        style={`background-color: ${palettePickerValue.hex}`}
        class="icon demo-list-icon palette-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>Pro Mode</BlockTitle>
  <BlockHeader>
    Current Color + HSB Sliders + RGB sliders + Alpha Slider + HEX + Palette with labels and
    editable values
  </BlockHeader>
  <List strongIos outlineIos>
    <!-- prettier-ignore -->
    <ListInput
      type="colorpicker"
      placeholder="Color"
      readonly
      value={proPickerValue}
      onColorPickerChange={(value) => proPickerValue = value}
      colorPickerParams={{
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
        targetEl: '.pro-picker-target',
        formatValue(value) {
          return `rgba(${value.rgba.join(', ')})`;
        },
      }}
    >
      <i
        slot="media"
        style={`background-color: ${proPickerValue.rgba ? `rgba(${proPickerValue.rgba.join(', ')})` : proPickerValue.hex}`}
        class="icon demo-list-icon pro-picker-target"
      />
    </ListInput>
  </List>

  <BlockTitle>Inline Color Picker</BlockTitle>
  <BlockHeader>SB Spectrum + HSB Sliders</BlockHeader>
  <div class="block block-strong block-outline no-padding">
    {#if inlinePickerValue.rgb}
      <div class="padding">
        HEX:
        {inlinePickerValue.hex}<br />
        Alpha:
        {inlinePickerValue.alpha}<br />
        Hue:
        {inlinePickerValue.hue}<br />
        RGB:
        {inlinePickerValue.rgb.join(', ')}<br />
        HSL:
        {inlinePickerValue.hsl.join(', ')}<br />
        HSB:
        {inlinePickerValue.hsb.join(', ')}<br />
        RGBA:
        {inlinePickerValue.rgba.join(', ')}<br />
        HSLA:
        {inlinePickerValue.hsla.join(', ')}
      </div>
    {/if}
    <div id="demo-color-picker-inline" />
  </div>
</Page>
