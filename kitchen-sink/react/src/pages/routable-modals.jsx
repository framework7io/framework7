import React from 'react';
import { Navbar, Page, List, ListItem, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Routable Modals" backLink></Navbar>
    <Block strong inset>
      <p>In addition to pages, Framework7 router allows to load modal components:</p>
    </Block>
    <List strong inset dividersIos>
      <ListItem title="Popup" link="popup/" />
      <ListItem title="Action Sheet" link="actions/" />
    </List>
  </Page>
);
