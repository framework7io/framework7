<template>
  <f7-page :page-content="false">
    <f7-navbar title="Tabs Routable" back-link="Back"></f7-navbar>
    <f7-toolbar bottom tabbar>
      <f7-link tab-link href="./" route-tab-id="tab1">Tab 1</f7-link>
      <f7-link tab-link href="tab2/" route-tab-id="tab2">Tab 2</f7-link>
      <f7-link tab-link href="tab3/" route-tab-id="tab3">Tab 3</f7-link>
    </f7-toolbar>
    <f7-tabs routable>
      <f7-tab class="page-content" id="tab1"></f7-tab>
      <f7-tab class="page-content" id="tab2"></f7-tab>
      <f7-tab class="page-content" id="tab3"></f7-tab>
    </f7-tabs>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7Tabs, f7Tab, f7Link, f7Toolbar } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7Block, f7Tabs, f7Tab, f7Link, f7Toolbar,
    },
  };
</script>
