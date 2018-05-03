<template>
  <f7-page>
    <f7-navbar title="Tabs" back-link="Back"></f7-navbar>
    <f7-list>
      <f7-list-item link="/tabs-static/" title="Static Tabs"></f7-list-item>
      <f7-list-item link="/tabs-animated/" title="Animated Tabs"></f7-list-item>
      <f7-list-item link="/tabs-swipeable/" title="Swipeable Tabs"></f7-list-item>
      <f7-list-item link="/tabs-routable/" title="Routable Tabs"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7List, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7List,
      f7ListItem,
    },
  };
</script>
