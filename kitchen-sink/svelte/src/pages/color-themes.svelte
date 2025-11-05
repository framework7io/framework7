<script context="module">
  let globalTheme = 'light';
  let globalThemeColor = dom7('html').css('--f7-color-primary').trim();
  let globalMonochrome = false;
  let globalVibrant = false;
</script>

<script>
  import dom7 from 'dom7';
  import {
    f7,
    Navbar,
    Page,
    BlockTitle,
    Button,
    Block,
    List,
    ListInput,
    ListItem,
    Toggle,
    Checkbox,
    Link,
    Toolbar,
  } from 'framework7-svelte';

  let theme = $state(globalTheme);
  let themeColor = $state(globalThemeColor || dom7('html').css('--f7-color-primary').trim());
  let monochrome = $state(globalMonochrome);
  let vibrant = $state(globalVibrant);

  const colors = Object.keys(f7.colors).filter(
    (c) => c !== 'primary' && c !== 'white' && c !== 'black',
  );

  function setScheme(newTheme) {
    f7.setDarkMode(newTheme === 'dark');
    globalTheme = newTheme;
    theme = newTheme;
  }

  function setColorTheme(newColor) {
    themeColor = f7.colors[newColor];
    globalThemeColor = themeColor;
    f7.setColorTheme(themeColor);
  }

  function setCustomColor(newColor) {
    themeColor = newColor;
    globalThemeColor = newColor;
    f7.setColorTheme(newColor);
  }

  const setMdColorScheme = () => {
    if (!globalVibrant && !globalMonochrome) {
      f7.setMdColorScheme('default');
    } else if (globalVibrant && !globalMonochrome) {
      f7.setMdColorScheme('vibrant');
    } else if (!globalVibrant && globalMonochrome) {
      f7.setMdColorScheme('monochrome');
    } else if (globalVibrant && globalMonochrome) {
      f7.setMdColorScheme('monochrome-vibrant');
    }
  };
  const setMdColorSchemeMonochrome = (value) => {
    globalMonochrome = value;
    monochrome = globalMonochrome;
    setMdColorScheme();
  };
  const setMdColorSchemeVibrant = (value) => {
    globalVibrant = value;
    vibrant = globalVibrant;
    setMdColorScheme();
  };
</script>

<Page>
  <Navbar large title="Color Themes" backLink>
    {#snippet right()}
      <Link>Link</Link>
    {/snippet}
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
    <div class="grid grid-cols-2 grid-gap">
      <div class="bg-color-white demo-theme-picker" onclick={() => setScheme('light')}>
        {#if theme === 'light'}
          <Checkbox checked disabled />
        {/if}
      </div>
      <div class="bg-color-black demo-theme-picker" onclick={() => setScheme('dark')}>
        {#if theme === 'dark'}
          <Checkbox checked disabled />
        {/if}
      </div>
    </div>
  </Block>

  <BlockTitle medium>Default Color Themes</BlockTitle>
  <Block strong>
    <p>Framework7 comes with {colors.length} color themes set.</p>
    <div class="grid grid-cols-3 medium-grid-cols-4 large-grid-cols-5 grid-gap">
      {#each colors as color, index}
        <div key={index}>
          <Button
            fill
            round
            small
            class="demo-color-picker-button"
            {color}
            onClick={() => setColorTheme(color)}
          >
            {color}
          </Button>
        </div>
      {/each}
    </div>
  </Block>
  <BlockTitle medium>Material Color Scheme</BlockTitle>
  <List strong inset dividersIos>
    <ListItem title="Monochrome">
      {#snippet after()}
        <Toggle
          checked={monochrome}
          onToggleChange={() => setMdColorSchemeMonochrome(!monochrome)}
        />
      {/snippet}
    </ListItem>
    <ListItem title="Vibrant">
      {#snippet after()}
        <Toggle checked={vibrant} onToggleChange={() => setMdColorSchemeVibrant(!vibrant)} />
      {/snippet}
    </ListItem>
  </List>

  <BlockTitle medium>Custom Color Theme</BlockTitle>
  <List strongIos outlineIos>
    <ListInput
      type="colorpicker"
      label="HEX Color"
      placeholder="e.g. #ff0000"
      readonly
      value={{ hex: themeColor }}
      onColorPickerChange={(value) => setCustomColor(value.hex)}
      colorPickerParams={{ targetEl: '#color-theme-picker-color' }}
    >
      {#snippet media()}
        <div
          id="color-theme-picker-color"
          style="width: 28px; height: 28px; borderRadius: 4px; background: var(--f7-theme-color)"
        ></div>
      {/snippet}
    </ListInput>
  </List>
</Page>
