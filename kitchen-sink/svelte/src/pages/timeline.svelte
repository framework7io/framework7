<script>
  import { Navbar, Page, List, ListItem } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Timeline" backLink="Back" />
  <List outlineIos dividersIos strongIos>
    <ListItem link="/timeline-vertical/" title="Vertical Timeline" />
    <ListItem link="/timeline-horizontal/" title="Horizontal Timeline" />
    <ListItem link="/timeline-horizontal-calendar/" title="Calendar Timeline" />
  </List>
</Page>
