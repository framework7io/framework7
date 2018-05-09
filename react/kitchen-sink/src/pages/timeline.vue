<template>
  <Page>
    <Navbar title="Timeline" backLink="Back"></Navbar>
    <List>
      <ListItem link="/timeline-vertical/" title="Vertical Timeline"></ListItem>
      <ListItem link="/timeline-horizontal/" title="Horizontal Timeline"></ListItem>
      <ListItem link="/timeline-horizontal-calendar/" title="Calendar Timeline"></ListItem>
    </List>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, List, ListItem } from 'framework7-react';

  export default {
    components: {
      Navbar, Page, List, ListItem,
    },
  };
</script>
