import React from 'react';
import { Navbar, Page, BlockTitle, List, ListItem, Toggle } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Toggle" backLink="Back"></Navbar>
    <BlockTitle>Super Heroes</BlockTitle>
    <List simpleList strong outlineIos dividersIos>
      <ListItem>
        <span>Batman</span>
        <Toggle defaultChecked />
      </ListItem>
      <ListItem>
        <span>Aquaman</span>
        <Toggle defaultChecked color="blue" />
      </ListItem>
      <ListItem>
        <span>Superman</span>
        <Toggle defaultChecked color="red" />
      </ListItem>
      <ListItem>
        <span>Hulk</span>
        <Toggle color="green" />
      </ListItem>
      <ListItem>
        <span>Spiderman (Disabled)</span>
        <Toggle disabled />
      </ListItem>
      <ListItem>
        <span>Ironman (Disabled)</span>
        <Toggle defaultChecked disabled />
      </ListItem>
      <ListItem>
        <span>Thor</span>
        <Toggle defaultChecked color="orange" />
      </ListItem>
      <ListItem>
        <span>Wonder Woman</span>
        <Toggle color="pink" />
      </ListItem>
    </List>
  </Page>
);
