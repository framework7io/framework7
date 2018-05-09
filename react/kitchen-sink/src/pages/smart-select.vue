<template>
  <Page>
    <Navbar title="Smart Select" backLink="Back"></Navbar>
    <Block>
      Framework7 allows you to easily convert your usual form selects to dynamic pages with radios:
    </Block>
    <List>
      <ListItem title="Fruit" smart-select>
        <select name="fruits">
          <option value="apple" selected>Apple</option>
          <option value="pineapple">Pineapple</option>
          <option value="pear">Pear</option>
          <option value="orange">Orange</option>
          <option value="melon">Melon</option>
          <option value="peach">Peach</option>
          <option value="banana">Banana</option>
        </select>
      </ListItem>
      <ListItem title="Car" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search car'}">
        <select name="car" multiple>
          <optgroup label="Japanese">
            <option value="honda" selected>Honda</option>
            <option value="lexus">Lexus</option>
            <option value="mazda">Mazda</option>
            <option value="nissan">Nissan</option>
            <option value="toyota">Toyota</option>
          </optgroup>
          <optgroup label="German">
            <option value="audi" selected>Audi</option>
            <option value="bmw">BMW</option>
            <option value="mercedes">Mercedes</option>
            <option value="vw">Volkswagen</option>
            <option value="volvo">Volvo</option>
          </optgroup>
          <optgroup label="American">
            <option value="cadillac">Cadillac</option>
            <option value="chrysler">Chrysler</option>
            <option value="dodge">Dodge</option>
            <option value="ford" selected>Ford</option>
          </optgroup>
        </select>
      </ListItem>
      <ListItem title="Mac or Windows" smart-select :smart-select-params="{openIn: 'sheet'}">
        <select name="mac-windows">
          <option value="mac" selected>Mac</option>
          <option value="windows">Windows</option>
        </select>
      </ListItem>
      <ListItem title="Super Hero" smart-select :smart-select-params="{openIn: 'popover'}">
        <select name="superhero" multiple>
          <option value="Batman" selected>Batman</option>
          <option value="Superman">Superman</option>
          <option value="Hulk">Hulk</option>
          <option value="Spiderman">Spiderman</option>
          <option value="Ironman">Ironman</option>
          <option value="Thor">Thor</option>
          <option value="Wonder Woman">Wonder Woman</option>
        </select>
      </ListItem>
    </List>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, List, Block, List } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      List,
      Block,
      ListItem,
    },
  };
</script>
