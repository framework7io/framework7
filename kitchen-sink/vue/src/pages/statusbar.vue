<template>
  <f7-page>
    <f7-navbar title="Statusbar Overlay" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Framework7 automatically detects if your app in full screen mode, and automatically shows statusbar overlay if app is in full screen mode (or hides statusbar if app is not in full screen mode). Its visibility can be forced using app parameters or using API:</p>
      <f7-row tag="p">
        <f7-button fill class="col" @click="showStatusbar">Show Statusbar</f7-button>
        <f7-button fill class="col" @click="hideStatusbar">Hide Statusbar</f7-button>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7Row, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7Row,
      f7Button,
    },
    methods: {
      showStatusbar() {
        this.$f7.statusbar.show();
      },
      hideStatusbar() {
        this.$f7.statusbar.hide();
      },
    },
  };
</script>
