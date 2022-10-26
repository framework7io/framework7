<script>
  import { Navbar, Page, List, ListGroup, ListItem } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Contacts List" backLink="Back" />
  <List contactsList ul={false} strongIos>
    <ListGroup>
      <ListItem title="A" groupTitle />
      <ListItem title="Aaron " />
      <ListItem title="Abbie" />
      <ListItem title="Adam" />
      <ListItem title="Adele" />
      <ListItem title="Agatha" />
      <ListItem title="Agnes" />
      <ListItem title="Albert" />
      <ListItem title="Alexander" />
    </ListGroup>
    <ListGroup>
      <ListItem title="B" groupTitle />
      <ListItem title="Bailey" />
      <ListItem title="Barclay" />
      <ListItem title="Bartolo" />
      <ListItem title="Bellamy" />
      <ListItem title="Belle" />
      <ListItem title="Benjamin" />
    </ListGroup>
    <ListGroup>
      <ListItem title="C" groupTitle />
      <ListItem title="Caiden" />
      <ListItem title="Calvin" />
      <ListItem title="Candy" />
      <ListItem title="Carl" />
      <ListItem title="Cherilyn" />
      <ListItem title="Chester" />
      <ListItem title="Chloe" />
    </ListGroup>
    <ListGroup>
      <ListItem title="V" groupTitle />
      <ListItem title="Vladimir" />
    </ListGroup>
  </List>
</Page>
