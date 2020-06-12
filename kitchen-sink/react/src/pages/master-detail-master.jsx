import React from 'react';
import { Page, Navbar, Block, List, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Master Detail" backLink="Back"></Navbar>
    <Block strong>
      <p>Master-Detail pattern oftenly used on wide enough screens and tablets, and consists of two views. Master - is an area in the UI where you have a list of something. Detail - is the area that shows the relevant information of a selection in the master.</p>
      <p>To see Master Detail view make sure the window width is larger than 800px.</p>
      <p>When collapsed (on narrow screen) navigation between such pages will behave as usual routing.</p>
      <p>Navigation to/from Master-Detail view happens without transition.</p>
    </Block>

    <List>
      <ListItem reloadDetail={true} link="/master-detail/1/">Detail Page 1</ListItem>
      <ListItem reloadDetail={true} link="/master-detail/2/">Detail Page 2</ListItem>
      <ListItem reloadDetail={true} link="/master-detail/3/">Detail Page 3</ListItem>
    </List>
  </Page>
);