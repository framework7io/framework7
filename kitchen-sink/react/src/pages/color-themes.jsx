import React, { useState } from 'react';
import {
  Navbar,
  Page,
  BlockTitle,
  Button,
  Block,
  List,
  ListInput,
  Checkbox,
  Link,
  Toolbar,
  f7,
} from 'framework7-react';
import $ from 'dom7';

let globalTheme = 'light';
let globalThemeColor = $('html').css('--f7-color-primary').trim();

export default () => {
  const colors = Object.keys(f7.colors).filter(
    (c) => c !== 'primary' && c !== 'white' && c !== 'black',
  );

  const [theme, setTheme] = useState(globalTheme);
  const [themeColor, setThemeColor] = useState(globalThemeColor);

  const setScheme = (newTheme) => {
    f7.setDarkMode(newTheme === 'dark');
    globalTheme = newTheme;
    setTheme(newTheme);
  };

  const setColorTheme = (newColor) => {
    globalThemeColor = f7.colors[newColor];
    setThemeColor(globalThemeColor);
    f7.setColorTheme(globalThemeColor);
  };

  const setCustomColor = (newColor) => {
    globalThemeColor = newColor;
    setThemeColor(globalThemeColor);
    f7.setColorTheme(globalThemeColor);
  };

  return (
    <Page>
      <Navbar large title="Color Themes" backLink="Back">
        <Link slot="right">Link</Link>
      </Navbar>
      <Toolbar tabbar icons bottom>
        <Link
          tabLink="#tab-1"
          tabLinkActive
          text="Tab 1"
          iconIos="f7:envelope_fill"
          iconMd="material:email"
        />
        <Link tabLink="#tab-2" text="Tab 2" iconIos="f7:calendar_fill" iconMd="material:today" />
        <Link
          tabLink="#tab-3"
          text="Tab 3"
          iconIos="f7:cloud_upload_fill"
          iconMd="material:file_upload"
        />
      </Toolbar>
      <BlockTitle medium>Layout Themes</BlockTitle>
      <Block strong>
        <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
        <div className="grid grid-cols-2 grid-gap">
          <div
            width="50"
            className="bg-color-white demo-theme-picker"
            onClick={() => setScheme('light')}
          >
            {theme === 'light' && <Checkbox checked disabled />}
          </div>
          <div
            width="50"
            className="bg-color-black demo-theme-picker"
            onClick={() => setScheme('dark')}
          >
            {theme === 'dark' && <Checkbox checked disabled />}
          </div>
        </div>
      </Block>

      <BlockTitle medium>Default Color Themes</BlockTitle>
      <Block strong>
        <p>Framework7 comes with {colors.length} color themes set.</p>
        <div className="grid grid-cols-3 medium-grid-cols-2 large-grid-cols-5 grid-gap">
          {colors.map((color, index) => (
            <div key={index}>
              <Button
                fill
                round
                small
                className="demo-color-picker-button"
                color={color}
                onClick={() => setColorTheme(color)}
              >
                {color}
              </Button>
            </div>
          ))}
        </div>
      </Block>
      <BlockTitle medium>Custom Color Theme</BlockTitle>
      <List strongIos outlineIos>
        <ListInput
          type="colorpicker"
          label="HEX Color"
          placeholder="e.g. #ff0000"
          readonly
          value={{ hex: themeColor }}
          onColorPickerChange={(value) => setCustomColor(value.hex)}
          colorPickerParams={{
            targetEl: '#color-theme-picker-color',
          }}
        >
          <div
            slot="media"
            id="color-theme-picker-color"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '4px',
              background: 'var(--f7-theme-color)',
            }}
          ></div>
        </ListInput>
      </List>
    </Page>
  );
};
