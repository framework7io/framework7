import React from 'react';
import { Navbar, Page, BlockTitle, Button, Row, Col, Block, List, ListInput, Checkbox } from 'framework7-react';

var stylesheet;
var globalTheme = 'light';
var globalBarsStyle = 'empty';
var globalCustomColor = '';
var globalCustomProperties = '';

export default class extends React.Component {
  constructor(props) {
    super(props);

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
    this.state = {
      theme: globalTheme,
      barsStyle: globalBarsStyle,
      customColor: globalCustomColor,
      customProperties: globalCustomProperties,
      colors: colors,
      themeColor: this.$$('html').css('--f7-theme-color').trim(),
    };
  }
  render() {
    return (
      <Page>
        <Navbar large title="Color Themes" backLink="Back"></Navbar>
        <BlockTitle medium>Layout Themes</BlockTitle>
        <Block strong>
          <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
          <Row>
            <Col width="50" className="bg-color-white demo-theme-picker" onClick={() => this.setLayoutTheme('light')}>
              {this.state.theme === 'light' && (
                <Checkbox checked disabled />
              )}
            </Col>
            <Col width="50" className="bg-color-black demo-theme-picker" onClick={() => this.setLayoutTheme('dark')}>
              {this.state.theme === 'dark' && (
                <Checkbox checked disabled />
              )}
            </Col>
          </Row>
        </Block>
        <BlockTitle medium>Navigation Bars Style</BlockTitle>
        <Block strong>
          <p>Switch navigation bars to filled style:</p>
          <Row>
            <Col width="50" className="demo-bars-picker demo-bars-picker-empty" onClick={() => this.setBarsStyle('empty')}>
              <div className="demo-navbar"></div>
              {this.state.barsStyle === 'empty' && (
                <Checkbox checked disabled />
              )}
            </Col>
            <Col width="50" className="demo-bars-picker demo-bars-picker-fill" onClick={() => this.setBarsStyle('fill')}>
              <div className="demo-navbar"></div>
              {this.state.barsStyle === 'fill' && (
                <Checkbox checked disabled />
              )}
            </Col>
          </Row>
        </Block>
        <BlockTitle medium>Default Color Themes</BlockTitle>
        <Block strong>
          <p>Framework7 comes with {this.state.colors.length} color themes set.</p>
          <Row>
            {this.state.colors.map((color, index) => (
              <Col width="33" tabletWidth="25" desktopWidth="20" key={index}>
                <Button fill round small className="demo-color-picker-button" color={color} onClick={() => this.setColorTheme(color)}>{color}</Button>
              </Col>
            ))}

            <Col width="33" tabletWidth="25" desktopWidth="20" />
            <Col width="33" tabletWidth="25" desktopWidth="20" />
            <Col width="33" tabletWidth="25" desktopWidth="20" />
          </Row>
        </Block>
        <BlockTitle medium>Custom Color Theme</BlockTitle>
        <List>
          <ListInput
            type="colorpicker"
            label="HEX Color"
            placeholder="e.g. #ff0000"
            readonly
            value={{hex: this.state.customColor || this.state.themeColor}}
            onColorPickerChange={value => this.setCustomColor(value.hex)}
            colorPickerParams={{
              targetEl: '#color-theme-picker-color',
            }}
          >
            <div
              slot="media"
              id="color-theme-picker-color"
              style={{width: '28px', height: '28px', borderRadius: '4px', background: 'var(--f7-theme-color)'}}
            ></div>
          </ListInput>
        </List>

        <BlockTitle medium>Generated CSS Variables</BlockTitle>
        <Block strong>
          {this.state.customProperties && (
            <p>Add this code block to your custom stylesheet:</p>
          )}
          {this.state.customProperties && (
            <pre style={{overflow: 'auto', WebkitOverflowScrolling: 'touch', margin: 0, fontSize: '12px'}}>{this.state.customProperties}</pre>
          )}
          {!this.state.customProperties && (
            <p>Change navigation bars styles or specify custom color to see custom CSS variables here</p>
          )}
        </Block>
      </Page>
    );
  }

  generateStylesheet() {
    var self = this;
    var styles = '';
    if (self.state.customColor) {
      const colorThemeProperties = self.$f7.utils.colorThemeCSSProperties(self.state.customColor);
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
    if (self.state.barsStyle === 'fill') {
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
  }

  componentDidMount() {
    if (!stylesheet) {
      stylesheet = document.createElement('style');
      document.head.appendChild(stylesheet);
    }
  }

  setLayoutTheme(theme) {
    var self = this;
    var $html = self.$$('html');
    globalTheme = theme;
    $html.removeClass('theme-dark theme-light').addClass('theme-' + globalTheme);
    self.setState({ theme: globalTheme });
  }

  setColorTheme(color) {
    var self = this;
    var $html = self.$$('html');
    var currentColorClass = $html[0].className.match(/color-theme-([a-z]*)/);
    if (currentColorClass) $html.removeClass(currentColorClass[0])
    $html.addClass('color-theme-' + color);
    self.unsetCustomColor();
    self.setState({
      themeColor: $html.css('--f7-color-' + color).trim(),
    });
  }

  setBarsStyle(barsStyle) {
    var self = this;
    globalBarsStyle = barsStyle;
    self.setState({barsStyle: globalBarsStyle})
    globalCustomProperties = self.generateStylesheet();
    stylesheet.innerHTML = globalCustomProperties;
    self.setState({customProperties: globalCustomProperties})
  }

  unsetCustomColor() {
    var self = this;
    globalCustomColor = '';
    self.setState({customColor: ''})
    globalCustomProperties = self.generateStylesheet();
    stylesheet.innerHTML = globalCustomProperties;
    self.setState({customProperties: globalCustomProperties})
  }

  setCustomColor (color) {
    var self = this;
    if (self.state.themeColor === color) return;
    clearTimeout(self.timeout);
    self.timeout = setTimeout(() => {
      globalCustomColor = color;
      self.setState({customColor: globalCustomColor}, () => {
        globalCustomProperties = self.generateStylesheet();
        stylesheet.innerHTML = globalCustomProperties;
        self.setState({customProperties: globalCustomProperties});
      });
    }, 300);
  }
};
