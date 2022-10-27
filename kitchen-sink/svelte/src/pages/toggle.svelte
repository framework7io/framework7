<script>
  import { Navbar, Page, BlockTitle, List, ListItem, Toggle } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Toggle" backLink="Back" />
  <BlockTitle>Super Heroes</BlockTitle>
  <List simpleList strong outlineIos dividersIos>
    <ListItem>
      <span>Batman</span>
      <Toggle checked />
    </ListItem>
    <ListItem>
      <span>Aquaman</span>
      <Toggle checked color="blue" />
    </ListItem>
    <ListItem>
      <span>Superman</span>
      <Toggle checked color="red" />
    </ListItem>
    <ListItem>
      <span>Hulk</span>
      <Toggle color="green" />
    </ListItem>
    <ListItem>
      <span>Spiderman (Disabled)</span>
      <Toggle disabled />
    </ListItem>
    <ListItem>
      <span>Ironman (Disabled)</span>
      <Toggle checked disabled />
    </ListItem>
    <ListItem>
      <span>Thor</span>
      <Toggle checked color="orange" />
    </ListItem>
    <ListItem>
      <span>Wonder Woman</span>
      <Toggle color="pink" />
    </ListItem>
  </List>
</Page>
