<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Preloader" backLink="Back"></Navbar>
  <Block>
    <p>How about an activity indicator? Framework7 has a nice one. The F7 Preloader is made with SVG and animated with CSS so it can be easily resized.</p>
  </Block>

  <BlockTitle>Default</BlockTitle>
  <Block strong class="row demo-preloaders align-items-stretch text-align-center">
    <Col>
      <Preloader></Preloader>
    </Col>
    <Col style="background: #000">
      <Preloader color="white"></Preloader>
    </Col>
    <Col>
      <Preloader size={42}></Preloader>
    </Col>
    <Col style="background: #000">
      <Preloader size={42} color="white"></Preloader>
    </Col>
  </Block>

  <BlockTitle>Color Preloaders</BlockTitle>
  <Block strong class="row text-align-center">
    <Col>
      <Preloader color="red"></Preloader>
    </Col>
    <Col>
      <Preloader color="green"></Preloader>
    </Col>
    <Col>
      <Preloader color="orange"></Preloader>
    </Col>
    <Col>
      <Preloader color="blue"></Preloader>
    </Col>
  </Block>

  <BlockTitle>Multi-color (MD-theme only)</BlockTitle>
  <Block strong class="text-align-center">
    <Preloader color="multi"></Preloader>
  </Block>

  <BlockTitle>Preloader Modals</BlockTitle>
  <Block strong>
    <p>With <b>app.preloader.show()</b> you can show small overlay with preloader indicator.</p>
    <p>
      <a class="button button-fill" on:click={openIndicator}>Open Small Indicator</a>
    </p>
    <p>With <b>app.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
    <p>
      <a class="button button-fill" on:click={openDialog}>Open Dialog Preloader</a>
    </p>
    <p>With <b>app.dialog.preloader('My text...')</b> you can show dialog preloader modal with custom title.</p>
    <p>
      <a class="button button-fill" on:click={openCustomDialog}>Open Dialog Preloader</a>
    </p>
  </Block>
</Page>
<script>
  import { f7, Navbar, Page, BlockTitle, Block, Preloader, Col } from 'framework7-svelte';

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
