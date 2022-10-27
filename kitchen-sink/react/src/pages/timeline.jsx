import React from 'react';
import { Navbar, Page, List, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Timeline" backLink="Back"></Navbar>
    <List outlineIos dividersIos strongIos>
      <ListItem link="/timeline-vertical/" title="Vertical Timeline" />
      <ListItem link="/timeline-horizontal/" title="Horizontal Timeline" />
      <ListItem link="/timeline-horizontal-calendar/" title="Calendar Timeline" />
    </List>
  </Page>
);
