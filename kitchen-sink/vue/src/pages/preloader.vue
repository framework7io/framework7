<template>
  <f7-page>
    <f7-navbar title="Preloader" back-link="Back"></f7-navbar>
    <f7-block>
      <p>How about an activity indicator? Framework 7 has a nice one. The F7 Preloader is made with SVG and animated with CSS so it can be easily resized.</p>
    </f7-block>

    <f7-block-title>Default</f7-block-title>
    <f7-block class="row demo-preloaders align-items-stretch text-align-center">
      <f7-col>
        <f7-preloader></f7-preloader>
      </f7-col>
      <f7-col style="background: #000">
        <f7-preloader color="white"></f7-preloader>
      </f7-col>
      <f7-col>
        <f7-preloader :size="42"></f7-preloader>
      </f7-col>
      <f7-col style="background: #000">
        <f7-preloader :size="42" color="white"></f7-preloader>
      </f7-col>
    </f7-block>

    <f7-block-title>Color Preloaders</f7-block-title>
    <f7-block class="row text-align-center">
      <f7-col>
        <f7-preloader color="red"></f7-preloader>
      </f7-col>
      <f7-col>
        <f7-preloader color="green"></f7-preloader>
      </f7-col>
      <f7-col>
        <f7-preloader color="orange"></f7-preloader>
      </f7-col>
      <f7-col>
        <f7-preloader color="blue"></f7-preloader>
      </f7-col>
    </f7-block>

    <f7-block-title>Multi-color (MD-theme only)</f7-block-title>
    <f7-block class="text-align-center">
      <f7-preloader color="multi"></f7-preloader>
    </f7-block>

    <f7-block-title>Preloader Modals</f7-block-title>
    <f7-block>
      <p>With <b>app.preloader.show()</b> you can show small overlay with preloader indicator.</p>
      <p>
        <a class="button button-fill" @click="openIndicator">Open Small Indicator</a>
      </p>
      <p>With <b>app.dialog.preloader()</b> you can show dialog modal with preloader indicator.</p>
      <p>
        <a class="button button-fill" @click="openDialog">Open Dialog Preloader</a>
      </p>
      <p>With <b>app.dialog.preloader('My text...')</b> you can show dialog preloader modal with custom title.</p>
      <p>
        <a class="button button-fill" @click="openCustomDialog">Open Dialog Preloader</a>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Preloader, f7Col } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Block,
      f7Preloader,
      f7Col,
    },
    methods: {
      openIndicator() {
        const self = this;
        self.$f7.preloader.show();
        setTimeout(() => {
          self.$f7.preloader.hide();
        }, 2000);
      },
      openDialog() {
        const self = this;
        self.$f7.dialog.preloader();
        setTimeout(() => {
          self.$f7.dialog.close();
        }, 2000);
      },
      openCustomDialog() {
        const self = this;
        self.$f7.dialog.preloader('My text...');
        setTimeout(() => {
          self.$f7.dialog.close();
        }, 2000);
      },
    },
  };
</script>
