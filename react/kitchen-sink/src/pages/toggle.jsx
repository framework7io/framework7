import React from 'react';
import { Navbar, Page, BlockTitle, List, ListItem, Toggle } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Toggle" backLink="Back"></Navbar>
    <BlockTitle>Super Heroes</BlockTitle>
    <List simpleList>
      <ListItem>
        <span>Batman</span>
        <Toggle defaultChecked></Toggle>
      </ListItem>
      <ListItem>
        <span>Aquaman</span>
        <Toggle defaultChecked color="blue"></Toggle>
      </ListItem>
      <ListItem>
        <span>Superman</span>
        <Toggle defaultChecked color="red"></Toggle>
      </ListItem>
      <ListItem>
        <span>Hulk</span>
        <Toggle color="green"></Toggle>
      </ListItem>
      <ListItem>
        <span>Spiderman (Disabled)</span>
        <Toggle disabled></Toggle>
      </ListItem>
      <ListItem>
        <span>Ironman (Disabled)</span>
        <Toggle defaultChecked disabled></Toggle>
      </ListItem>
      <ListItem>
        <span>Thor</span>
        <Toggle defaultChecked color="orange"></Toggle>
      </ListItem>
      <ListItem>
        <span>Wonder Woman</span>
        <Toggle color="pink"></Toggle>
      </ListItem>
    </List>
  </Page>
);
