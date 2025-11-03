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
  <Navbar title="Subnavbar" backLink>
    <Subnavbar>
      <Segmented strong round small>
        <Button round small active>Link 1</Button>
        <Button round small>Link 2</Button>
        <Button round small>Link 3</Button>
      </Segmented>
    </Subnavbar>
  </Navbar>
  <Block strong inset>
    <p>
      Subnavbar is useful when you need to put any additional elements into Navbar, like Tab Links
      or Search Bar. It also remains visible when Navbar hidden.
    </p>
  </Block>
  <List strong inset>
    <ListItem link="/subnavbar-title/" title="Subnavbar Title" />
  </List>
</Page>
