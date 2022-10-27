import React from 'react';
import { Navbar, Page, Searchbar, Subnavbar, List, ListItem } from 'framework7-react';

export default () => {
  return (
    <Page>
      <Navbar backLink="Back" title="Searchbar">
        <Subnavbar inner={false}>
          <Searchbar searchContainer=".search-list" searchIn=".item-title" />
        </Subnavbar>
      </Navbar>
      <List strongIos outlineIos dividersIos className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <List strongIos outlineIos dividersIos className="search-list searchbar-found">
        <ListItem title="Acura" />
        <ListItem title="Audi" />
        <ListItem title="BMW" />
        <ListItem title="Cadillac" />
        <ListItem title="Chevrolet" />
        <ListItem title="Chrysler" />
        <ListItem title="Dodge" />
        <ListItem title="Ferrari" />
        <ListItem title="Ford" />
        <ListItem title="GMC" />
        <ListItem title="Honda" />
        <ListItem title="Hummer" />
        <ListItem title="Hyundai" />
        <ListItem title="Infiniti" />
        <ListItem title="Isuzu" />
        <ListItem title="Jaguar" />
        <ListItem title="Jeep" />
        <ListItem title="Kia" />
        <ListItem title="Lamborghini" />
        <ListItem title="Land Rover" />
        <ListItem title="Lexus" />
        <ListItem title="Lincoln" />
        <ListItem title="Lotus" />
        <ListItem title="Mazda" />
        <ListItem title="Mercedes-Benz" />
        <ListItem title="Mercury" />
        <ListItem title="Mitsubishi" />
        <ListItem title="Nissan" />
        <ListItem title="Oldsmobile" />
        <ListItem title="Peugeot" />
        <ListItem title="Pontiac" />
        <ListItem title="Porsche" />
        <ListItem title="Regal" />
        <ListItem title="Saab" />
        <ListItem title="Saturn" />
        <ListItem title="Subaru" />
        <ListItem title="Suzuki" />
        <ListItem title="Toyota" />
        <ListItem title="Volkswagen" />
        <ListItem title="Volvo" />
      </List>
    </Page>
  );
};
