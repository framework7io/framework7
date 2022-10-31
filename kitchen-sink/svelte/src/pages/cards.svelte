<script>
  import {
    Navbar,
    Page,
    Block,
    BlockTitle,
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    List,
    ListItem,
    Link,
  } from 'framework7-svelte';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Cards" backLink="Back" />

  <Block>
    <p>
      Cards are a great way to contain and organize your information, especially when combined with
      List Views. Cards can contain unique related data, like for example photos, text or links
      about a particular subject. Cards are typically an entry point to more complex and detailed
      information.
    </p>
  </Block>
  <BlockTitle>Simple Cards</BlockTitle>
  <Card
    content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
  />
  <Card
    title="Card header"
    content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
    footer="Card footer"
  />
  <Card
    content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
  />

  <BlockTitle>Outline Cards</BlockTitle>
  <Card
    outline
    content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
  />
  <Card
    outline
    title="Card header"
    content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
    footer="Card footer"
  />
  <Card
    outline
    content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
  />

  <BlockTitle>Outline With Dividers</BlockTitle>
  <Card
    outline
    headerDivider
    footerDivider
    title="Card header"
    content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
    footer="Card footer"
  />

  <BlockTitle>Raised Cards</BlockTitle>
  <Card
    raised
    content="This is a simple card with plain text, but cards can also contain their own header, footer, list view, image, or any other element."
  />
  <Card
    raised
    title="Card header"
    content="Card with header and footer. Card headers are used to display card titles and footers for additional information or just for custom actions."
    footer="Card footer"
  />
  <Card
    raised
    content="Another card. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse feugiat sem est, non tincidunt ligula volutpat sit amet. Mauris aliquet magna justo. "
  />

  <BlockTitle>Styled Cards</BlockTitle>
  <Card outlineMd class="demo-card-header-pic">
    <CardHeader
      valign="bottom"
      style="background-image: url(https://cdn.framework7.io/placeholder/nature-1000x600-3.jpg)"
      >Journey To Mountains</CardHeader
    >
    <CardContent>
      <p class="date">Posted on January 21, 2015</p>
      <p>
        Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis.
        Phasellus quis nibh hendrerit...
      </p>
    </CardContent>
    <CardFooter>
      <Link>Like</Link>
      <Link>Read more</Link>
    </CardFooter>
  </Card>
  <Card class="demo-card-header-pic">
    <CardHeader
      valign="bottom"
      style="background-image: url(https://cdn.framework7.io/placeholder/people-1000x600-6.jpg)"
      >Journey To Mountains</CardHeader
    >
    <CardContent>
      <p class="date">Posted on January 21, 2015</p>
      <p>
        Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis.
        Phasellus quis nibh hendrerit...
      </p>
    </CardContent>
    <CardFooter>
      <Link>Like</Link>
      <Link>Read more</Link>
    </CardFooter>
  </Card>

  <BlockTitle>Cards With List View</BlockTitle>
  <Card>
    <CardContent padding={false}>
      <List>
        <ListItem link="#">Link 1</ListItem>
        <ListItem link="#">Link 2</ListItem>
        <ListItem link="#">Link 3</ListItem>
        <ListItem link="#">Link 4</ListItem>
        <ListItem link="#">Link 5</ListItem>
      </List>
    </CardContent>
  </Card>
  <Card title="New Releases:">
    <CardContent padding={false}>
      <List mediaList>
        <ListItem title="Yellow Submarine" subtitle="Beatles">
          <img
            slot="media"
            src="https://cdn.framework7.io/placeholder/fashion-88x88-4.jpg"
            width="44"
          />
        </ListItem>
        <ListItem title="Don't Stop Me Now" subtitle="Queen">
          <img
            slot="media"
            src="https://cdn.framework7.io/placeholder/fashion-88x88-5.jpg"
            width="44"
          />
        </ListItem>
        <ListItem title="Billie Jean" subtitle="Michael Jackson">
          <img
            slot="media"
            src="https://cdn.framework7.io/placeholder/fashion-88x88-6.jpg"
            width="44"
          />
        </ListItem>
      </List>
    </CardContent>
    <CardFooter>
      <span>January 20, 2015</span>
      <span>5 comments</span>
    </CardFooter>
  </Card>
</Page>
