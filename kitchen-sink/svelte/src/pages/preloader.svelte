<script>
  import { f7, Navbar, Page, BlockTitle, Block, Preloader } from 'framework7-svelte';

  function openIndicator() {
    f7.preloader.show();
    setTimeout(() => {
      f7.preloader.hide();
    }, 2000);
  }
  function openDialog() {
    f7.dialog.preloader();
    setTimeout(() => {
      f7.dialog.close();
    }, 2000);
  }
  function openCustomDialog() {
    f7.dialog.preloader('My text...');
    setTimeout(() => {
      f7.dialog.close();
    }, 2000);
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Preloader" backLink="Back" />
  <Block>
    <p>
      How about an activity indicator? Framework7 has a nice one. The F7 Preloader is made with SVG
      and animated with CSS so it can be easily resized.
    </p>
  </Block>

  <BlockTitle>Default</BlockTitle>
  <Block
    strongIos
    outlineIos
    class="grid grid-cols-4 grid-gap demo-preloaders align-items-stretch text-align-center"
  >
    <div>
      <Preloader />
    </div>
    <div style="background: #000">
      <Preloader color="white" />
    </div>
    <div>
      <Preloader size={42} />
    </div>
    <div style="background: #000">
      <Preloader size={42} color="white" />
    </div>
  </Block>

  <BlockTitle>Color Preloaders</BlockTitle>
  <Block strongIos outlineIos class="grid grid-cols-4 grid-gap text-align-center">
    <div>
      <Preloader color="red" />
    </div>
    <div>
      <Preloader color="green" />
    </div>
    <div>
      <Preloader color="orange" />
    </div>
    <div>
      <Preloader color="blue" />
    </div>
  </Block>

  <BlockTitle>Multi-color</BlockTitle>
  <Block strongIos outlineIos class="text-align-center">
    <Preloader color="multi" />
  </Block>

  <BlockTitle>Preloader Modals</BlockTitle>
  <Block strongIos outlineIos>
    <p>With <b>app.preloader.show()</b> you can show small overlay with preloader indicator.</p>
    <p><a class="button button-fill" on:click={openIndicator}>Open Small Indicator</a></p>
    <p>With <b>app.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
    <p><a class="button button-fill" on:click={openDialog}>Open Dialog Preloader</a></p>
    <p>
      With
      <b>app.dialog.preloader('My text...')</b>
      you can show dialog preloader modal with custom title.
    </p>
    <p><a class="button button-fill" on:click={openCustomDialog}>Open Dialog Preloader</a></p>
  </Block>
</Page>
