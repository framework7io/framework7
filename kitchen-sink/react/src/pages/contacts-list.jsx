import React from 'react';
import { Navbar, Page, List, ListGroup, ListItem } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Contacts List" backLink="Back"></Navbar>
    <List contactsList>
      <ListGroup>
        <ListItem title="A" groupTitle></ListItem>
        <ListItem title="Aaron "></ListItem>
        <ListItem title="Abbie"></ListItem>
        <ListItem title="Adam"></ListItem>
        <ListItem title="Adele"></ListItem>
        <ListItem title="Agatha"></ListItem>
        <ListItem title="Agnes"></ListItem>
        <ListItem title="Albert"></ListItem>
        <ListItem title="Alexander"></ListItem>
      </ListGroup>
      <ListGroup>
        <ListItem title="B" groupTitle></ListItem>
        <ListItem title="Bailey"></ListItem>
        <ListItem title="Barclay"></ListItem>
        <ListItem title="Bartolo"></ListItem>
        <ListItem title="Bellamy"></ListItem>
        <ListItem title="Belle"></ListItem>
        <ListItem title="Benjamin"></ListItem>
      </ListGroup>
      <ListGroup>
        <ListItem title="C" groupTitle></ListItem>
        <ListItem title="Caiden"></ListItem>
        <ListItem title="Calvin"></ListItem>
        <ListItem title="Candy"></ListItem>
        <ListItem title="Carl"></ListItem>
        <ListItem title="Cherilyn"></ListItem>
        <ListItem title="Chester"></ListItem>
        <ListItem title="Chloe"></ListItem>
      </ListGroup>
      <ListGroup>
        <ListItem title="V" groupTitle></ListItem>
        <ListItem title="Vladimir"></ListItem>
      </ListGroup>
    </List>
  </Page>
);
