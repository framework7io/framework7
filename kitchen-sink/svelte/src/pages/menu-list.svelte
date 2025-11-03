<script>
  import { Page, Navbar, Block, List, ListItem, Icon } from 'framework7-svelte';

  let selected = 'home';
  let selectedMedia = 'home';
</script>

<Page>
  <Navbar title="Menu List" backLink />

  <Block>
    <p>
      Menu list unlike usual links list is designed to indicate currently active screen (or section)
      of your app. Think about it like a Tabbar but in a form of a list.
    </p>
  </Block>

  <List outlineIos strongIos menuList>
    <ListItem link title="Home" selected={selected === 'home'} onClick={() => (selected = 'home')}>
      {#snippet media()}
        <Icon md="material:home" ios="f7:house_fill" />
      {/snippet}
    </ListItem>
    <ListItem
      link
      title="Profile"
      selected={selected === 'profile'}
      onClick={() => (selected = 'profile')}
    >
      {#snippet media()}
        <Icon md="material:person" ios="f7:person_fill" />
      {/snippet}
    </ListItem>
    <ListItem
      link
      title="Settings"
      selected={selected === 'settings'}
      onClick={() => (selected = 'settings')}
    >
      {#snippet media()}
        <Icon md="material:settings" ios="f7:gear_alt_fill" />
      {/snippet}
    </ListItem>
  </List>

  <List outlineIos strongIos menuList mediaList>
    <ListItem
      link
      title="Home"
      subtitle="Home subtitle"
      selected={selectedMedia === 'home'}
      onClick={() => (selectedMedia = 'home')}
    >
      {#snippet media()}
        <Icon md="material:home" ios="f7:house_fill" />
      {/snippet}
    </ListItem>
    <ListItem
      link
      title="Profile"
      subtitle="Profile subtitle"
      selected={selectedMedia === 'profile'}
      onClick={() => (selectedMedia = 'profile')}
    >
      {#snippet media()}
        <Icon md="material:person" ios="f7:person_fill" />
      {/snippet}
    </ListItem>
    <ListItem
      link
      title="Settings"
      subtitle="Settings subtitle"
      selected={selectedMedia === 'settings'}
      onClick={() => (selectedMedia = 'settings')}
    >
      {#snippet media()}
        <Icon md="material:settings" ios="f7:gear_alt_fill" />
      {/snippet}
    </ListItem>
  </List>
</Page>
