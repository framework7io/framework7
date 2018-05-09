<template>
  <Page page-content={false}>
    <Navbar title="Tabs Routable" backLink="Back"></Navbar>
    <Toolbar tabbar>
      <Link tabLink href="./" route-tab-id="tab1">Tab 1</Link>
      <Link tabLink href="tab2/" route-tab-id="tab2">Tab 2</Link>
      <Link tabLink href="tab3/" route-tab-id="tab3">Tab 3</Link>
    </Toolbar>
    <Tabs routable>
      <Tab className="page-content" id="tab1"></Tab>
      <Tab className="page-content" id="tab2"></Tab>
      <Tab className="page-content" id="tab3"></Tab>
    </Tabs>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, Block, Tabs, Tab, Link, Toolbar } from 'framework7-react';

  export default {
    components: {
      Navbar, Page, Block, Tabs, Tab, Link, Toolbar,
    },
  };
</script>
