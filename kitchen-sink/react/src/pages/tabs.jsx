import React from 'react';
import { Navbar, Page, List, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Tabs" backLink></Navbar>
    <List strong inset dividersIos>
      <ListItem link="/tabs-static/" title="Static Tabs" />
      <ListItem link="/tabs-animated/" title="Animated Tabs" />
      <ListItem link="/tabs-swipeable/" title="Swipeable Tabs" />
      <ListItem link="/tabs-routable/" title="Routable Tabs" />
    </List>
  </Page>
);
