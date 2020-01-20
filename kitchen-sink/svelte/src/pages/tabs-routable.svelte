<Page pageContent={false}>
  <Navbar title="Tabs Routable" backLink="Back"></Navbar>
  <Toolbar bottom tabbar>
    <Link tabLink href="./" routeTabId="tab1">Tab 1</Link>
    <Link tabLink href="tab2/" routeTabId="tab2">Tab 2</Link>
    <Link tabLink href="tab3/" routeTabId="tab3">Tab 3</Link>
  </Toolbar>
  <Tabs routable>
    <Tab class="page-content" id="tab1"></Tab>
    <Tab class="page-content" id="tab2"></Tab>
    <Tab class="page-content" id="tab3"></Tab>
  </Tabs>
</Page>
<script>
  import { Navbar, Page, Block, Tabs, Tab, Link, Toolbar } from 'framework7-svelte';
</script>
