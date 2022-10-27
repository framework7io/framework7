<script>
  import {
    Navbar,
    Page,
    Subnavbar,
    Segmented,
    Button,
    Block,
    List,
    ListItem,
  } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Subnavbar" backLink="Back">
    <Subnavbar>
      <Segmented strong>
        <Button smallMd active>Link 1</Button>
        <Button smallMd>Link 2</Button>
        <Button smallMd>Link 3</Button>
      </Segmented>
    </Subnavbar>
  </Navbar>
  <Block>
    <p>
      Subnavbar is useful when you need to put any additional elements into Navbar, like Tab Links
      or Search Bar. It also remains visible when Navbar hidden.
    </p>
  </Block>
  <List strong outlineIos>
    <ListItem link="/subnavbar-title/" title="Subnavbar Title" />
  </List>
</Page>
