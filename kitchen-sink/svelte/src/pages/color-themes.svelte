<Page>
  <Navbar large title="Color Themes" backLink="Back"></Navbar>
  <BlockTitle medium>Layout Themes</BlockTitle>
  <Block strong>
    <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
    <Row>
      <Col width="50" class="bg-color-white demo-theme-picker" onClick={() => setLayoutTheme('light')}>
        {#if theme === 'light'}
          <Checkbox checked disabled />
        {/if}
      </Col>
      <Col width="50" class="bg-color-black demo-theme-picker" onClick={() => setLayoutTheme('dark')}>
        {#if theme === 'dark'}
          <Checkbox checked disabled />
        {/if}
      </Col>
    </Row>
  </Block>
  <BlockTitle medium>Navigation Bars Style</BlockTitle>
  <Block strong>
    <p>Switch navigation bars to filled style:</p>
    <Row>
      <Col width="50" class="demo-bars-picker demo-bars-picker-empty" onClick={() => setBarsStyle('empty')}>
        <div class="demo-navbar"></div>
        {#if barsStyle === 'empty'}
          <Checkbox checked disabled />
        {/if}
      </Col>
      <Col width="50" class="demo-bars-picker demo-bars-picker-fill" onClick={() => setBarsStyle('fill')}>
        <div class="demo-navbar"></div>
        {#if barsStyle === 'fill'}
          <Checkbox checked disabled />
        {/if}
      </Col>
    </Row>
  </Block>
  <BlockTitle medium>Default Color Themes</BlockTitle>
  <Block strong>
    <p>Framework7 comes with {colors.length} color themes set.</p>
    <Row>
      {#each colors as color, index}
        <Col width="33" tabletWidth="25" desktopWidth="20" key={index}>
          <Button fill round small class="demo-color-picker-button" color={color} onClick={() => setColorTheme(color)}>{color}</Button>
        </Col>
      {/each}

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
      value={{hex: customColor || themeColor}}
      onColorPickerChange={(value) => setCustomColor(value.hex)}
      colorPickerParams={{
        targetEl: '#color-theme-picker-color',
      }}
    >
      <div
        slot="media"
        id="color-theme-picker-color"
        style="width: 28px; height: 28px; borderRadius: 4px; background: var(--f7-theme-color)"
      ></div>
    </ListInput>
  </List>

  <BlockTitle medium>Generated CSS Variables</BlockTitle>
  <Block strong>
    {#if customProperties}
      <p>Add this code block to your custom stylesheet:</p>
      <pre style="overflow: auto; -webkit-overflow-scrolling: touch; margin: 0; font-size: 12px">{customProperties}</pre>
    {:else}
      <p>Change navigation bars styles or specify custom color to see custom CSS variables here</p>
    {/if}
  </Block>
</Page>
<script context="module">
  let stylesheet;
  let globalTheme = 'light';
  let globalBarsStyle = 'empty';
  let globalCustomColor = '';
  let globalCustomProperties = '';
</script>
<script>
  import { onMount } from 'svelte';
  import { f7, Navbar, Page, BlockTitle, Button, Row, Col, Block, List, ListInput, Checkbox } from 'framework7-svelte';

  let theme = globalTheme;
  let barsStyle = globalBarsStyle;
  let customColor = globalCustomColor;
  let customProperties = globalCustomProperties;
  let colors = [
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
  let themeColor = f7.$('html').css('--f7-theme-color').trim();
  let timeout;

  function generateStylesheet() {
    var styles = '';
    if (customColor) {
      const colorThemeProperties = f7.utils.colorThemeCSSProperties(customColor);
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
    if (barsStyle === 'fill') {
      const colorThemeRgb = f7.$('html').css('--f7-theme-color-rgb').trim().split(',').map(c => c.trim());
      styles += `
/* Invert navigation bars to fill style */
:root,
:root.theme-dark,
:root .theme-dark {
  --f7-bars-bg-color: var(--f7-theme-color);
  --f7-bars-bg-color-rgb: var(--f7-theme-color-rgb);
  --f7-bars-translucent-opacity: 0.9;
  --f7-bars-text-color: #fff;
  --f7-bars-link-color: #fff;
  --f7-navbar-subtitle-text-color: rgba(255,255,255,0.85);
  --f7-bars-border-color: transparent;
  --f7-tabbar-link-active-color: #fff;
  --f7-tabbar-link-inactive-color: rgba(255,255,255,0.54);
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
.navbar-large-transparent {
  --f7-navbar-large-title-text-color: #000;

  --r: ${colorThemeRgb[0]};
  --g: ${colorThemeRgb[1]};
  --b: ${colorThemeRgb[2]};
  --progress: var(--f7-navbar-large-collapse-progress);
  --f7-bars-link-color: rgb(
    calc(var(--r) + (255 - var(--r)) * var(--progress)),
    calc(var(--g) + (255 - var(--g)) * var(--progress)),
    calc(var(--b) + (255 - var(--b)) * var(--progress))
  );
}
.theme-dark .navbar-large-transparent {
  --f7-navbar-large-title-text-color: #fff;
}
      `;
    }
    return styles.trim();
  }

  onMount(() => {
    if (!stylesheet) {
      stylesheet = document.createElement('style');
      document.head.appendChild(stylesheet);
    }
  })

  function setLayoutTheme(newTheme) {
    var htmlEl = f7.$('html');
    globalTheme = newTheme;
    htmlEl.removeClass('theme-dark theme-light').addClass('theme-' + globalTheme);
    theme = globalTheme;
  }

  function setColorTheme(color) {
    var htmlEl = f7.$('html');
    var currentColorClass = htmlEl[0].className.match(/color-theme-([a-z]*)/);
    if (currentColorClass) htmlEl.removeClass(currentColorClass[0])
    htmlEl.addClass('color-theme-' + color);
    unsetCustomColor();
    themeColor = htmlEl.css('--f7-color-' + color).trim();
  }

  function setBarsStyle(newBarsStyle) {
    globalBarsStyle = newBarsStyle;
    barsStyle = globalBarsStyle;
    globalCustomProperties = generateStylesheet();
    stylesheet.innerHTML = globalCustomProperties;
    customProperties = globalCustomProperties;
  }

  function unsetCustomColor() {
    globalCustomColor = '';
    customColor = '';
    globalCustomProperties = generateStylesheet();
    stylesheet.innerHTML = globalCustomProperties;
    customProperties = globalCustomProperties;
  }

  function setCustomColor(color) {
    if (themeColor === color) return;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      globalCustomColor = color;
      customColor = globalCustomColor;
      globalCustomProperties = generateStylesheet();
      stylesheet.innerHTML = globalCustomProperties;
      customProperties = globalCustomProperties;
    }, 300);
  }
</script>
