<script>
  import { Navbar, Page, List, ListItem } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Tabs" backLink="Back" />
  <List strongIos outlineIos dividersIos>
    <ListItem link="/tabs-static/" title="Static Tabs" />
    <ListItem link="/tabs-animated/" title="Animated Tabs" />
    <ListItem link="/tabs-swipeable/" title="Swipeable Tabs" />
    <ListItem link="/tabs-routable/" title="Routable Tabs" />
  </List>
</Page>
