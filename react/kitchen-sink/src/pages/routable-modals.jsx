import React from 'react';
import { Navbar, Page, List, ListItem, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Routable Modals" backLink="Back"></Navbar>
    <Block strong>
      <p>In addition to pages, Framework7 router allows to load modal components:</p>
    </Block>
    <List>
      <ListItem title="Popup" link="popup/"></ListItem>
      <ListItem title="Action Sheet" link="actions/"></ListItem>
    </List>
  </Page>
);
