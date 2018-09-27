import React from 'react';
import { Page, Navbar, BlockTitle, Block, List, ListItem, Link } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Right Panel"></Navbar>
    <BlockTitle>Left Panel</BlockTitle>
    <Block>
      <p>This is a right side panel. You can close it by clicking outsite or on this link: <Link panelClose>close me</Link>. You can put here anything, even another isolated view.</p>
    </Block>
    <BlockTitle>Panel Navigation</BlockTitle>
    <List>
      <ListItem link="/panel-right-1/" title="Right panel page 1"></ListItem>
      <ListItem link="/panel-right-2/" title="Right panel page 2"></ListItem>
    </List>
  </Page>
);
