import React from 'react';
import { Navbar, Page, List, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Routable Modals" backLink="Back"></Navbar>
    <List>
      <ListItem title="Popup" link="/routable-popup/"></ListItem>
    </List>
  </Page>
);
