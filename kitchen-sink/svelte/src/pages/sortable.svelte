<script>
  import {
    Navbar,
    Page,
    Block,
    List,
    ListItem,
    NavRight,
    Link,
    BlockTitle,
  } from 'framework7-svelte';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Sortable List" backLink>
    <NavRight>
      <Link sortableToggle=".sortable">Toggle</Link>
    </NavRight>
  </Navbar>

  <Block strong inset>
    <p>Just click "Toggle" button on navigation bar to enable/disable sorting</p>
  </Block>
  <List strong inset dividersIos sortable>
    <ListItem title="1 Jenna Smith" after="CEO">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="2 John Doe" after="Director">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="3 John Doe" after="Developer">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="4 Aaron Darling" after="Manager">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="5 Calvin Johnson" after="Accounter">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="6 John Smith" after="SEO">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="7 Chloe" after="Manager">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
  </List>
  <List strong inset dividersIos mediaList sortable>
    <ListItem
      title="Yellow Submarine"
      after="$15"
      subtitle="Beatles"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    >
      {#snippet media()}
        <img src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" />
      {/snippet}
    </ListItem>
    <ListItem
      title="Don't Stop Me Now"
      after="$22"
      subtitle="Queen"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    >
      {#snippet media()}
        <img src="https://cdn.framework7.io/placeholder/people-160x160-2.jpg" width="80" />
      {/snippet}
    </ListItem>
    <ListItem
      title="Billie Jean"
      after="$16"
      subtitle="Michael Jackson"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    >
      {#snippet media()}
        <img src="https://cdn.framework7.io/placeholder/people-160x160-3.jpg" width="80" />
      {/snippet}
    </ListItem>
  </List>

  <BlockTitle>Opposite Side</BlockTitle>
  <List strong inset dividersIos sortable sortableOpposite>
    <ListItem title="1 Jenna Smith" after="CEO">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="2 John Doe" after="Director">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="3 John Doe" after="Developer">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="4 Aaron Darling" after="Manager">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="5 Calvin Johnson" after="Accounter">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="6 John Smith" after="SEO">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
    <ListItem title="7 Chloe" after="Manager">
      {#snippet media()}
        <i class="icon icon-f7" />
      {/snippet}
    </ListItem>
  </List>
</Page>
