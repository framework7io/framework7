<script>
  import {
    Navbar,
    Page,
    BlockTitle,
    Block,
    List,
    ListItem,
    ListGroup,
    Toggle,
  } from 'framework7-svelte';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-invalid-attribute -->
<Page>
  <Navbar title="List View" backLink="Back" />
  <Block>
    <p>
      Framework7 allows you to be flexible with list views (table views). You can make them as
      navigation menus, you can use there icons, inputs, and any elements inside of the list, and
      even make them nested:
    </p>
  </Block>
  <BlockTitle>Simple List</BlockTitle>
  <List dividersIos simpleList>
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
    <ListItem title="Item 3" />
  </List>
  <BlockTitle>Strong List</BlockTitle>
  <List dividersIos simpleList strong>
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
    <ListItem title="Item 3" />
  </List>

  <BlockTitle>Strong Outline List</BlockTitle>
  <List dividersIos simpleList strong outline>
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
    <ListItem title="Item 3" />
  </List>

  <BlockTitle>Strong Inset List</BlockTitle>
  <List dividersIos simpleList strong inset>
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
    <ListItem title="Item 3" />
  </List>

  <BlockTitle>Strong Outline Inset List</BlockTitle>
  <List dividersIos simpleList strong outline inset>
    <ListItem title="Item 1" />
    <ListItem title="Item 2" />
    <ListItem title="Item 3" />
  </List>

  <BlockTitle>Simple Links List</BlockTitle>
  <List dividersIos outlineIos strongIos>
    <ListItem title="Link 1" link="#" />
    <ListItem title="Link 2" link="#" />
    <ListItem title="Link 3" link="#" />
  </List>
  <BlockTitle>Data list, with icons</BlockTitle>
  <List dividersIos outlineIos strongIos>
    <ListItem title="Ivan Petrov" after="CEO"><i slot="media" class="icon icon-f7" /></ListItem>
    <ListItem title="John Doe" badge="5"><i slot="media" class="icon icon-f7" /></ListItem>
    <ListItem title="Jenna Smith"><i slot="media" class="icon icon-f7" /></ListItem>
  </List>
  <BlockTitle>Links</BlockTitle>
  <List dividersIos outlineIos strongIos>
    <ListItem link="#" title="Ivan Petrov" after="CEO">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem link="#" title="John Doe" after="Cleaner">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem link="#" title="Jenna Smith"><i slot="media" class="icon icon-f7" /></ListItem>
  </List>
  <BlockTitle>Links, Header, Footer</BlockTitle>
  <List dividersIos outlineIos strongIos>
    <ListItem link="#" header="Name" title="John Doe" after="Edit">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem link="#" header="Phone" title="+7 90 111-22-3344" after="Edit">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem link="#" header="Email" title="john@doe" footer="Home" after="Edit">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem link="#" header="Email" title="john@framework7" footer="Work" after="Edit">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
  </List>
  <BlockTitle>Links, no icons</BlockTitle>
  <List dividersIos outlineIos strongIos>
    <ListItem link="#" title="Ivan Petrov" />
    <ListItem link="#" title="John Doe" />
    <ListItem groupTitle title="Group Title Here" />
    <ListItem link="#" title="Ivan Petrov" />
    <ListItem link="#" title="Jenna Smith" />
  </List>
  <BlockTitle>Grouped with sticky titles</BlockTitle>
  <List dividersIos outlineIos strongIos ul={false}>
    <ListGroup>
      <ListItem title="A" groupTitle />
      <ListItem title="Aaron " />
      <ListItem title="Abbie" />
      <ListItem title="Adam" />
    </ListGroup>
    <ListGroup>
      <ListItem title="B" groupTitle />
      <ListItem title="Bailey" />
      <ListItem title="Barclay" />
      <ListItem title="Bartolo" />
    </ListGroup>
    <ListGroup>
      <ListItem title="C" groupTitle />
      <ListItem title="Caiden" />
      <ListItem title="Calvin" />
      <ListItem title="Candy" />
    </ListGroup>
  </List>
  <BlockTitle>Mixed and nested</BlockTitle>
  <List dividersIos outlineIos strongIos>
    <ListItem link="#" title="Ivan Petrov" after="CEO">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem link="#" title="Two icons here">
      <svelte:fragment slot="media">
        <i class="icon icon-f7" />
        <i class="icon icon-f7" />
      </svelte:fragment>
    </ListItem>
    <ListItem title="No icons here" />
    <li>
      <ul>
        <ListItem link="#" title="Ivan Petrov" after="CEO">
          <i slot="media" class="icon icon-f7" />
        </ListItem>
        <ListItem link="#" title="Two icons here">
          <svelte:fragment slot="media">
            <i class="icon icon-f7" />
            <i class="icon icon-f7" />
          </svelte:fragment>
        </ListItem>
        <ListItem title="No icons here" />
        <ListItem link="#" title="Ultra long text goes here, no, it is really really long">
          <i slot="media" class="icon icon-f7" />
        </ListItem>
        <ListItem title="With toggle">
          <i slot="media" class="icon icon-f7" />
          <span slot="after">
            <Toggle />
          </span>
        </ListItem>
      </ul>
    </li>
    <ListItem link="#" title="Ultra long text goes here, no, it is really really long">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem title="With toggle">
      <i slot="media" class="icon icon-f7" />
      <span slot="after">
        <Toggle />
      </span>
    </ListItem>
  </List>

  <BlockTitle>Tablet inset</BlockTitle>
  <List dividersIos outlineIos strongIos mediumInset>
    <ListItem link="#" title="Ivan Petrov" after="CEO">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <ListItem link="#" title="Two icons here">
      <svelte:fragment slot="media">
        <i class="icon icon-f7" />
        <i class="icon icon-f7" />
      </svelte:fragment>
    </ListItem>
    <ListItem link="#" title="Ultra long text goes here, no, it is really really long">
      <i slot="media" class="icon icon-f7" />
    </ListItem>
    <div class="block-footer" slot="after-list">
      <p>This list block will look like "inset" only on tablets (iPad)</p>
    </div>
  </List>

  <BlockTitle>Media Lists</BlockTitle>
  <Block>
    <p>
      Media Lists are almost the same as Data Lists, but with a more flexible layout for
      visualization of more complex data, like products, services, users, etc.
    </p>
  </Block>
  <BlockTitle>Songs</BlockTitle>
  <List dividersIos mediaList outlineIos strongIos>
    <ListItem
      link="#"
      title="Yellow Submarine"
      after="$15"
      subtitle="Beatles"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    >
      <img
        slot="media"
        style="border-radius: 8px"
        src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg"
        width="80"
      />
    </ListItem>
    <ListItem
      link="#"
      title="Don't Stop Me Now"
      after="$22"
      subtitle="Queen"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    >
      <img
        slot="media"
        style="border-radius: 8px"
        src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg"
        width="80"
      />
    </ListItem>
    <ListItem
      link="#"
      title="Billie Jean"
      after="$16"
      subtitle="Michael Jackson"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    >
      <img
        slot="media"
        style="border-radius: 8px"
        src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg"
        width="80"
      />
    </ListItem>
  </List>
  <BlockTitle>Mail App</BlockTitle>
  <List dividersIos mediaList outlineIos strongIos>
    <ListItem
      link="#"
      title="Facebook"
      after="17:14"
      subtitle="New messages from John Doe"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
    <ListItem
      link="#"
      title="John Doe (via Twitter)"
      after="17:11"
      subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
    <ListItem
      link="#"
      title="Facebook"
      after="16:48"
      subtitle="New messages from John Doe"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
    <ListItem
      link="#"
      title="John Doe (via Twitter)"
      after="15:32"
      subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    />
  </List>
  <BlockTitle>Something more simple</BlockTitle>
  <List dividersIos mediaList outlineIos strongIos>
    <ListItem title="Yellow Submarine" subtitle="Beatles">
      <img
        slot="media"
        style="border-radius: 8px"
        src="https://cdn.framework7.io/placeholder/fashion-88x88-1.jpg"
        width="44"
      />
    </ListItem>
    <ListItem link="#" title="Don't Stop Me Now" subtitle="Queen">
      <img
        slot="media"
        style="border-radius: 8px"
        src="https://cdn.framework7.io/placeholder/fashion-88x88-2.jpg"
        width="44"
      />
    </ListItem>
    <ListItem title="Billie Jean" subtitle="Michael Jackson">
      <img
        slot="media"
        style="border-radius: 8px"
        src="https://cdn.framework7.io/placeholder/fashion-88x88-3.jpg"
        width="44"
      />
    </ListItem>
  </List>
</Page>
