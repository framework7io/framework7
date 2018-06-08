import React from 'react';
import { Navbar, Page, Searchbar, Subnavbar, List, ListItem, Link, NavRight } from 'framework7-react';

export default () => (
  <Page>
    <Navbar backLink="Back" title="Searchbar">
      <NavRight>
        <Link searchbarEnable=".searchbar-demo" iconIos="f7:search_strong" iconMd="material:search"></Link>
      </NavRight>
      <Searchbar
        className="searchbar-demo"
        expandable
        searchContainer=".search-list"
        searchIn=".item-title"
      ></Searchbar>
    </Navbar>
    <List className="searchbar-not-found">
      <ListItem title="Nothing found"></ListItem>
    </List>
    <List className="search-list searchbar-found">
      <ListItem title="Acura"></ListItem>
      <ListItem title="Audi"></ListItem>
      <ListItem title="BMW"></ListItem>
      <ListItem title="Cadillac "></ListItem>
      <ListItem title="Chevrolet "></ListItem>
      <ListItem title="Chrysler "></ListItem>
      <ListItem title="Dodge "></ListItem>
      <ListItem title="Ferrari "></ListItem>
      <ListItem title="Ford "></ListItem>
      <ListItem title="GMC "></ListItem>
      <ListItem title="Honda"></ListItem>
      <ListItem title="Hummer"></ListItem>
      <ListItem title="Hyundai"></ListItem>
      <ListItem title="Infiniti "></ListItem>
      <ListItem title="Isuzu "></ListItem>
      <ListItem title="Jaguar "></ListItem>
      <ListItem title="Jeep "></ListItem>
      <ListItem title="Kia"></ListItem>
      <ListItem title="Lamborghini "></ListItem>
      <ListItem title="Land Rover"></ListItem>
      <ListItem title="Lexus "></ListItem>
      <ListItem title="Lincoln "></ListItem>
      <ListItem title="Lotus "></ListItem>
      <ListItem title="Mazda"></ListItem>
      <ListItem title="Mercedes-Benz"></ListItem>
      <ListItem title="Mercury "></ListItem>
      <ListItem title="Mitsubishi"></ListItem>
      <ListItem title="Nissan "></ListItem>
      <ListItem title="Oldsmobile "></ListItem>
      <ListItem title="Peugeot "></ListItem>
      <ListItem title="Pontiac "></ListItem>
      <ListItem title="Porsche"></ListItem>
      <ListItem title="Regal"></ListItem>
      <ListItem title="Saab "></ListItem>
      <ListItem title="Saturn "></ListItem>
      <ListItem title="Subaru "></ListItem>
      <ListItem title="Suzuki "></ListItem>
      <ListItem title="Toyota"></ListItem>
      <ListItem title="Volkswagen"></ListItem>
      <ListItem title="Volvo"></ListItem>
    </List>
  </Page>
);
