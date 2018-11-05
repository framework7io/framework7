<template>
  <f7-page>
    <f7-navbar title="Routable Modals" backLink="Back"></f7-navbar>
    <f7-block>
      <p>In addition to pages, Framework7 router allows to load modal components:</p>
    </f7-block>
    <f7-list>
      <f7-list-item title="Popup" link="popup/"></f7-list-item>
      <f7-list-item title="Action Sheet" link="actions/"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7List, f7ListItem, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7List, f7ListItem, f7Block
    },
  };
</script>
