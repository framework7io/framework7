<template>
  <f7-page>
    <f7-navbar title="Master Detail" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Master-Detail pattern oftenly used on wide enough screens and tablets, and consists of two views. Master - is an area in the UI where you have a list of something. Detail - is the area that shows the relevant information of a selection in the master.</p>
      <p>To see Master Detail view make sure the window width is larger than 800px.</p>
      <p>When collapsed (on narrow screen) navigation between such pages will behave as usual routing.</p>
      <p>Navigation to/from Master-Detail view happens without transition.</p>
    </f7-block>

    <f7-list>
      <f7-list-item :reload-detail="true" link="/master-detail/1/">Detail Page 1</f7-list-item>
      <f7-list-item :reload-detail="true" link="/master-detail/2/">Detail Page 2</f7-list-item>
      <f7-list-item :reload-detail="true" link="/master-detail/3/">Detail Page 3</f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7Block, f7List, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7Block,
      f7List,
      f7ListItem,
    },
  };
</script>
