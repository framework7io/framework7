<template>
  <Page>
    <Navbar title="Toolbar & Tabbar" backLink="Back"></Navbar>
    <Toolbar>
      <Link>Left Link</Link>
      <Link>Right Link</Link>
    </Toolbar>
    <List>
      <ListItem link="./tabbar/" title="Tabbar"></ListItem>
      <ListItem link="./tabbar-labels/" title="Tabbar With Labels"></ListItem>
      <ListItem link="./tabbar-scrollable/" title="Tabbar Scrollable"></ListItem>
      <ListItem link="./toolbar-hide-scroll/" title="Hide Toolbar On Scroll"></ListItem>
    </List>
    <BlockTitle v-if="$theme.md">Toolbar Position</BlockTitle>
    <Block v-if="$theme.md">
      <p>Material (MD) theme toolbar supports both top and bottom positions. Click the following button to change its position.</p>
      <p>
        <Button raised @click={toggleToolbarPosition}>Toggle Toolbar Position</Button>
      </p>
    </Block>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, Toolbar, List, ListItem, Button, Link, BlockTitle, Block } from 'framework7-react';

  export default {
    components: {
      Navbar, Page, Toolbar, List, ListItem, Button, Link, BlockTitle, Block,
    },
    methods: {
      toggleToolbarPosition() {
        this.$$(this.$el).find('.toolbar, .tabbar').toggleClass('toolbar-bottom-md');
      },
    },
  };
</script>

