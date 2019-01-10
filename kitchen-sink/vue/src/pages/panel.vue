<template>
  <f7-page>
    <f7-navbar title="Panel / Side panels" back-link="Back"></f7-navbar>
    <f7-block>
      <p>Framework7 comes with 2 panels (on left and on right), both are optional. They have two different layouts/effects - <b>cover</b> above the content (like left panel here) and <b>reveal</b> (like right panel). You can put absolutely anything inside: data lists, forms, custom content, and even other isolated app view (like in right panel now) with its own dynamic navbar. Checkout panels:</p>
    </f7-block>
    <f7-block class="row">
      <f7-col>
        <f7-button raised fill panel-open="left">Open left panel</f7-button>
      </f7-col>
      <f7-col>
        <f7-button raised fill panel-open="right">Open right panel</f7-button>
      </f7-col>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7Col, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7Col,
      f7Button,
    },
  };
</script>
