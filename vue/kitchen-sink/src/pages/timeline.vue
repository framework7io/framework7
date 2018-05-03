<template>
  <f7-page>
    <f7-navbar title="Timeline" back-link="Back"></f7-navbar>
    <f7-list>
      <f7-list-item link="/timeline-vertical/" title="Vertical Timeline"></f7-list-item>
      <f7-list-item link="/timeline-horizontal/" title="Horizontal Timeline"></f7-list-item>
      <f7-list-item link="/timeline-horizontal-calendar/" title="Calendar Timeline"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7List, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7List, f7ListItem,
    },
  };
</script>
