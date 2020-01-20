<Page>
  <Navbar title="Toolbar & Tabbar" backLink="Back"></Navbar>
  <Toolbar position={toolbarPosition}>
    <Link>Left Link</Link>
    <Link>Right Link</Link>
  </Toolbar>
  <List>
    <ListItem link="./tabbar/" title="Tabbar"></ListItem>
    <ListItem link="./tabbar-labels/" title="Tabbar With Labels"></ListItem>
    <ListItem link="./tabbar-scrollable/" title="Tabbar Scrollable"></ListItem>
    <ListItem link="./toolbar-hide-scroll/" title="Hide Toolbar On Scroll"></ListItem>
  </List>
  <BlockTitle>Toolbar Position</BlockTitle>
  <Block>
    <p>Toolbar supports both top and bottom positions. Click the following button to change its position.</p>
    <p>
      <Button fill onClick={toggleToolbarPosition}>Toggle Toolbar Position</Button>
    </p>
  </Block>
</Page>
<script>
  import { Navbar, Page, Toolbar, List, ListItem, Button, Link, BlockTitle, Block } from 'framework7-svelte';

  let toolbarPosition = 'bottom';

  function toggleToolbarPosition() {
    toolbarPosition = toolbarPosition === 'top' ? 'bottom' : 'top';
  }
</script>
