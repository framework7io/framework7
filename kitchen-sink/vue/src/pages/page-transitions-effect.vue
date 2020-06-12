<template>
  <f7-page>
    <f7-navbar :title="effect" back-link="Back"></f7-navbar>

    <f7-block strong class="text-align-center">
      <p>This page was loaded with <b>{{effect}}</b> transition.</p>
    </f7-block>

  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
    },
    props: {
      effect: String,
    },
  }
</script>
