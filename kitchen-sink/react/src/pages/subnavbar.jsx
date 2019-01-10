import React from 'react';
import { Navbar, Page, Subnavbar, Segmented, Button, Block, List, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Subnavbar" backLink="Back">
      <Subnavbar>
        <Segmented>
          <Button outline active>Link 1</Button>
          <Button outline>Link 2</Button>
          <Button outline>Link 3</Button>
        </Segmented>
      </Subnavbar>
    </Navbar>
    <Block>
      <p>Subnavbar is useful when you need to put any additional elements into Navbar, like Tab Links or Search Bar. It also remains visible when Navbar hidden.</p>
    </Block>
    <List>
      <ListItem link="/subnavbar-title/" title="Subnavbar Title"></ListItem>
    </List>
  </Page>
);
