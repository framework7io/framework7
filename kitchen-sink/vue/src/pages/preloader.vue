<template>
  <f7-page>
    <f7-navbar title="Preloader" back-link="Back"></f7-navbar>
    <f7-block>
      <p>
        How about an activity indicator? Framework7 has a nice one. The F7 Preloader is made with
        SVG and animated with CSS so it can be easily resized.
      </p>
    </f7-block>

    <f7-block-title>Default</f7-block-title>
    <f7-block
      strong-ios
      outline-ios
      class="grid grid-cols-4 grid-gap demo-preloaders align-items-stretch text-align-center"
    >
      <div>
        <f7-preloader />
      </div>
      <div style="background: #000">
        <f7-preloader color="white" />
      </div>
      <div>
        <f7-preloader :size="42" />
      </div>
      <div style="background: #000">
        <f7-preloader :size="42" color="white" />
      </div>
    </f7-block>

    <f7-block-title>Color Preloaders</f7-block-title>
    <f7-block strong class="grid grid-cols-4 grid-gap text-align-center">
      <div>
        <f7-preloader color="red" />
      </div>
      <div>
        <f7-preloader color="green" />
      </div>
      <div>
        <f7-preloader color="orange" />
      </div>
      <div>
        <f7-preloader color="blue" />
      </div>
    </f7-block>

    <f7-block-title>Multi-color</f7-block-title>
    <f7-block strong class="text-align-center">
      <f7-preloader color="multi" />
    </f7-block>

    <f7-block-title>Preloader Modals</f7-block-title>
    <f7-block strong>
      <p>With <b>app.preloader.show()</b> you can show small overlay with preloader indicator.</p>
      <p>
        <a class="button button-fill" @click="openIndicator">Open Small Indicator</a>
      </p>
      <p>With <b>app.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
      <p>
        <a class="button button-fill" @click="openDialog">Open Dialog Preloader</a>
      </p>
      <p>
        With <b>app.dialog.preloader('My text...')</b> you can show dialog preloader modal with
        custom title.
      </p>
      <p>
        <a class="button button-fill" @click="openCustomDialog">Open Dialog Preloader</a>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Preloader, f7 } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Block,
    f7Preloader,
  },
  methods: {
    openIndicator() {
      f7.preloader.show();
      setTimeout(() => {
        f7.preloader.hide();
      }, 2000);
    },
    openDialog() {
      f7.dialog.preloader();
      setTimeout(() => {
        f7.dialog.close();
      }, 2000);
    },
    openCustomDialog() {
      f7.dialog.preloader('My text...');
      setTimeout(() => {
        f7.dialog.close();
      }, 2000);
    },
  },
};
</script>
