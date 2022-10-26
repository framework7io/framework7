import React, { useEffect, useRef, useState } from 'react';
import {
  Navbar,
  Page,
  Block,
  BlockTitle,
  BlockHeader,
  List,
  ListInput,
  f7,
} from 'framework7-react';

export default () => {
  const [wheePickerValue, setWheePickerValue] = useState({ hex: '#00ff00' });
  const [spectrumPickerValue, setSpectrumPickerValue] = useState({ hex: '#ff0000' });
  const [hsSpectrumPickerValue, setHsSpectrumPickerValue] = useState({ hex: '#ff0000' });
  const [rgbPickerValue, setRgbPickerValue] = useState({ hex: '#0000ff' });
  const [rgbaPickerValue, setRgbaPickerValue] = useState({ hex: '#ff00ff' });
  const [hsbPickerValue, setHsbPickerValue] = useState({ hex: '#00ff00' });
  const [rgbBarsPickerValue, setRgbBarsPickerValue] = useState({ hex: '#0000ff' });
  const [rgbSlidersColorsPickerValue, setRgbSlidersColorsPickerValue] = useState({
    hex: '#ffff00',
  });
  const [palettePickerValue, setPalettePickerValue] = useState({ hex: '#FFEBEE' });
  const [proPickerValue, setProPickerValue] = useState({ hex: '#00ffff' });
  const [inlinePickerValue, setInlinePickerValue] = useState({ hex: '#77ff66' });

  const colorPickerInline = useRef(null);

  useEffect(() => {
    colorPickerInline.current = f7.colorPicker.create({
      value: inlinePickerValue,
      containerEl: '#demo-color-picker-inline',
      modules: ['sb-spectrum', 'hsb-sliders', 'alpha-slider'],
      on: {
        change(cp, value) {
          setInlinePickerValue(value);
        },
      },
    });
    return () => {
      colorPickerInline.current.destroy();
    };
  }, []);
  return (
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
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={wheePickerValue}
          onColorPickerChange={(value) => setWheePickerValue(value)}
          colorPickerParams={{
            targetEl: '.wheel-picker-target',
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${wheePickerValue.hex}` }}
            className="icon demo-list-icon wheel-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>Saturation-Brightness Spectrum</BlockTitle>
      <BlockHeader>SB Spectrum + Hue Slider in Popover</BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={spectrumPickerValue}
          onColorPickerChange={(value) => setSpectrumPickerValue(value)}
          colorPickerParams={{
            modules: ['sb-spectrum', 'hue-slider'],
            targetEl: '.spectrum-picker-target',
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${spectrumPickerValue.hex}` }}
            className="icon demo-list-icon spectrum-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>Hue-Saturation Spectrum</BlockTitle>
      <BlockHeader>HS Spectrum + Brightness Slider in Popover</BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={hsSpectrumPickerValue}
          onColorPickerChange={(value) => setHsSpectrumPickerValue(value)}
          colorPickerParams={{
            modules: ['hs-spectrum', 'brightness-slider'],
            targetEl: '.hs-spectrum-picker-target',
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${hsSpectrumPickerValue.hex}` }}
            className="icon demo-list-icon hs-spectrum-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>RGB Sliders</BlockTitle>
      <BlockHeader>RGB sliders with labels and values in Popover</BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={rgbPickerValue}
          onColorPickerChange={(value) => setRgbPickerValue(value)}
          colorPickerParams={{
            modules: ['rgb-sliders'],
            sliderValue: true,
            sliderLabel: true,
            targetEl: '.rgb-picker-target',
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${rgbPickerValue.hex}` }}
            className="icon demo-list-icon rgb-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>RGBA Sliders</BlockTitle>
      <BlockHeader>RGB sliders + Alpha Slider with labels and values in Popover</BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={rgbaPickerValue}
          onColorPickerChange={(value) => setRgbaPickerValue(value)}
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
            style={{
              backgroundColor: rgbaPickerValue.rgba
                ? `rgba(${rgbaPickerValue.rgba.join(', ')})`
                : rgbaPickerValue.hex,
            }}
            className="icon demo-list-icon rgba-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>HSB Sliders</BlockTitle>
      <BlockHeader>HSB sliders with labels and values in Popover</BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={hsbPickerValue}
          onColorPickerChange={(value) => setHsbPickerValue(value)}
          colorPickerParams={{
            modules: ['hsb-sliders'],
            sliderValue: true,
            sliderLabel: true,
            targetEl: '.hsb-picker-target',
            formatValue(value) {
              return `hsb(${value.hsb[0]}, ${(value.hsb[1] * 1000) / 10}%, ${
                (value.hsb[2] * 1000) / 10
              }%)`;
            },
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${hsbPickerValue.hex}` }}
            className="icon demo-list-icon hsb-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>RGB Bars</BlockTitle>
      <BlockHeader>
        RGB bars with labels and values in Popover on tablet and in Popup on phone
      </BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={rgbBarsPickerValue}
          onColorPickerChange={(value) => setRgbBarsPickerValue(value)}
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
            style={{ backgroundColor: `${rgbBarsPickerValue.hex}` }}
            className="icon demo-list-icon rgb-bars-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>RGB Sliders + Colors</BlockTitle>
      <BlockHeader>
        RGB sliders with labels and values in Popover, and previous and current color values blocks
      </BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={rgbSlidersColorsPickerValue}
          onColorPickerChange={(value) => setRgbSlidersColorsPickerValue(value)}
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
            style={{ backgroundColor: `${rgbSlidersColorsPickerValue.hex}` }}
            className="icon demo-list-icon rgb-sliders-colors-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>Palette</BlockTitle>
      <BlockHeader>
        Palette opened in Sheet modal on phone and Popover on larger screens
      </BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={palettePickerValue}
          onColorPickerChange={(value) => setPalettePickerValue(value)}
          colorPickerParams={{
            modules: ['palette'],
            openIn: 'auto',
            openInPhone: 'sheet',
            palette: [
              [
                '#FFEBEE',
                '#FFCDD2',
                '#EF9A9A',
                '#E57373',
                '#EF5350',
                '#F44336',
                '#E53935',
                '#D32F2F',
                '#C62828',
                '#B71C1C',
              ],
              [
                '#F3E5F5',
                '#E1BEE7',
                '#CE93D8',
                '#BA68C8',
                '#AB47BC',
                '#9C27B0',
                '#8E24AA',
                '#7B1FA2',
                '#6A1B9A',
                '#4A148C',
              ],
              [
                '#E8EAF6',
                '#C5CAE9',
                '#9FA8DA',
                '#7986CB',
                '#5C6BC0',
                '#3F51B5',
                '#3949AB',
                '#303F9F',
                '#283593',
                '#1A237E',
              ],
              [
                '#E1F5FE',
                '#B3E5FC',
                '#81D4FA',
                '#4FC3F7',
                '#29B6F6',
                '#03A9F4',
                '#039BE5',
                '#0288D1',
                '#0277BD',
                '#01579B',
              ],
              [
                '#E0F2F1',
                '#B2DFDB',
                '#80CBC4',
                '#4DB6AC',
                '#26A69A',
                '#009688',
                '#00897B',
                '#00796B',
                '#00695C',
                '#004D40',
              ],
              [
                '#F1F8E9',
                '#DCEDC8',
                '#C5E1A5',
                '#AED581',
                '#9CCC65',
                '#8BC34A',
                '#7CB342',
                '#689F38',
                '#558B2F',
                '#33691E',
              ],
              [
                '#FFFDE7',
                '#FFF9C4',
                '#FFF59D',
                '#FFF176',
                '#FFEE58',
                '#FFEB3B',
                '#FDD835',
                '#FBC02D',
                '#F9A825',
                '#F57F17',
              ],
              [
                '#FFF3E0',
                '#FFE0B2',
                '#FFCC80',
                '#FFB74D',
                '#FFA726',
                '#FF9800',
                '#FB8C00',
                '#F57C00',
                '#EF6C00',
                '#E65100',
              ],
            ],
            targetEl: '.palette-picker-target',
            formatValue(value) {
              return value.hex;
            },
          }}
        >
          <i
            slot="media"
            style={{ backgroundColor: `${palettePickerValue.hex}` }}
            className="icon demo-list-icon palette-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>Pro Mode</BlockTitle>
      <BlockHeader>
        Current Color + HSB Sliders + RGB sliders + Alpha Slider + HEX + Palette with labels and
        editable values
      </BlockHeader>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          placeholder="Color"
          readonly
          value={proPickerValue}
          onColorPickerChange={(value) => setProPickerValue(value)}
          colorPickerParams={{
            modules: [
              'initial-current-colors',
              'sb-spectrum',
              'hsb-sliders',
              'rgb-sliders',
              'alpha-slider',
              'hex',
              'palette',
            ],
            openIn: 'auto',
            sliderValue: true,
            sliderValueEditable: true,
            sliderLabel: true,
            hexLabel: true,
            hexValueEditable: true,
            groupedModules: true,
            palette: [
              [
                '#FFEBEE',
                '#FFCDD2',
                '#EF9A9A',
                '#E57373',
                '#EF5350',
                '#F44336',
                '#E53935',
                '#D32F2F',
                '#C62828',
                '#B71C1C',
              ],
              [
                '#F3E5F5',
                '#E1BEE7',
                '#CE93D8',
                '#BA68C8',
                '#AB47BC',
                '#9C27B0',
                '#8E24AA',
                '#7B1FA2',
                '#6A1B9A',
                '#4A148C',
              ],
              [
                '#E8EAF6',
                '#C5CAE9',
                '#9FA8DA',
                '#7986CB',
                '#5C6BC0',
                '#3F51B5',
                '#3949AB',
                '#303F9F',
                '#283593',
                '#1A237E',
              ],
              [
                '#E1F5FE',
                '#B3E5FC',
                '#81D4FA',
                '#4FC3F7',
                '#29B6F6',
                '#03A9F4',
                '#039BE5',
                '#0288D1',
                '#0277BD',
                '#01579B',
              ],
              [
                '#E0F2F1',
                '#B2DFDB',
                '#80CBC4',
                '#4DB6AC',
                '#26A69A',
                '#009688',
                '#00897B',
                '#00796B',
                '#00695C',
                '#004D40',
              ],
              [
                '#F1F8E9',
                '#DCEDC8',
                '#C5E1A5',
                '#AED581',
                '#9CCC65',
                '#8BC34A',
                '#7CB342',
                '#689F38',
                '#558B2F',
                '#33691E',
              ],
              [
                '#FFFDE7',
                '#FFF9C4',
                '#FFF59D',
                '#FFF176',
                '#FFEE58',
                '#FFEB3B',
                '#FDD835',
                '#FBC02D',
                '#F9A825',
                '#F57F17',
              ],
              [
                '#FFF3E0',
                '#FFE0B2',
                '#FFCC80',
                '#FFB74D',
                '#FFA726',
                '#FF9800',
                '#FB8C00',
                '#F57C00',
                '#EF6C00',
                '#E65100',
              ],
            ],
            targetEl: '.pro-picker-target',
            formatValue(value) {
              return `rgba(${value.rgba.join(', ')})`;
            },
          }}
        >
          <i
            slot="media"
            style={{
              backgroundColor: proPickerValue.rgba
                ? `rgba(${proPickerValue.rgba.join(', ')})`
                : proPickerValue.hex,
            }}
            className="icon demo-list-icon pro-picker-target"
          />
        </ListInput>
      </List>

      <BlockTitle>Inline Color Picker</BlockTitle>
      <BlockHeader>SB Spectrum + HSB Sliders</BlockHeader>
      <div className="block block-strong block-outline no-padding">
        {inlinePickerValue.rgb && (
          <div className="padding">
            HEX: {inlinePickerValue.hex}
            <br />
            Alpha: {inlinePickerValue.alpha}
            <br />
            Hue: {inlinePickerValue.hue}
            <br />
            RGB: {inlinePickerValue.rgb.join(', ')}
            <br />
            HSL: {inlinePickerValue.hsl.join(', ')}
            <br />
            HSB: {inlinePickerValue.hsb.join(', ')}
            <br />
            RGBA: {inlinePickerValue.rgba.join(', ')}
            <br />
            HSLA: {inlinePickerValue.hsla.join(', ')}
          </div>
        )}
        <div id="demo-color-picker-inline"></div>
      </div>
    </Page>
  );
};
