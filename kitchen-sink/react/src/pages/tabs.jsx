import React from 'react';
import { Navbar, Page, List, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Tabs" backLink="Back"></Navbar>
    <List>
      <ListItem link="/tabs-static/" title="Static Tabs"></ListItem>
      <ListItem link="/tabs-animated/" title="Animated Tabs"></ListItem>
      <ListItem link="/tabs-swipeable/" title="Swipeable Tabs"></ListItem>
      <ListItem link="/tabs-routable/" title="Routable Tabs"></ListItem>
    </List>
  </Page>
);