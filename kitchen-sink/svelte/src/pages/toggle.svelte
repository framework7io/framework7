<Page>
  <Navbar title="Toggle" backLink="Back"></Navbar>
  <BlockTitle>Super Heroes</BlockTitle>
  <List simpleList>
    <ListItem>
      <span>Batman</span>
      <Toggle checked></Toggle>
    </ListItem>
    <ListItem>
      <span>Aquaman</span>
      <Toggle checked color="blue"></Toggle>
    </ListItem>
    <ListItem>
      <span>Superman</span>
      <Toggle checked color="red"></Toggle>
    </ListItem>
    <ListItem>
      <span>Hulk</span>
      <Toggle color="green"></Toggle>
    </ListItem>
    <ListItem>
      <span>Spiderman (Disabled)</span>
      <Toggle disabled></Toggle>
    </ListItem>
    <ListItem>
      <span>Ironman (Disabled)</span>
      <Toggle checked disabled></Toggle>
    </ListItem>
    <ListItem>
      <span>Thor</span>
      <Toggle checked color="orange"></Toggle>
    </ListItem>
    <ListItem>
      <span>Wonder Woman</span>
      <Toggle color="pink"></Toggle>
    </ListItem>
  </List>
</Page>
<script>
  import { Navbar, Page, BlockTitle, List, ListItem, Toggle } from 'framework7-svelte';
</script>
