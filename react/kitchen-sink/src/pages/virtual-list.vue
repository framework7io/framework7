<template>
  <Page>
    <Navbar title="Virtual List" backLink="Back">
      <Subnavbar inner={false}>
        <Searchbar
          search-container=".virtual-list"
          search-item="li"
          search-in=".item-title"
        ></Searchbar>
      </Subnavbar>
    </Navbar>
    <Block>
      <p>Virtual List allows to render lists with huge amount of elements without loss of performance. And it is fully compatible with all Framework7 list components such as Search Bar, Infinite Scroll, Pull To Refresh, Swipeouts (swipe-to-delete) and Sortable.</p>
      <p>Here is the example of virtual list with 10 000 items:</p>
    </Block>
    <List className="searchbar-not-found">
      <ListItem title="Nothing found"></ListItem>
    </List>
    <List
      className="searchbar-found"
      medial-list
      virtual-list
      :virtual-list-params="{ items, searchAll, renderExternal, height: $theme.ios ? 63 : 73}"
    >
      <ul>
        <ListItem
          v-for="(item, index) in vlData.items"
          key={index}
          media-item
          link="#"
          title={item.title}
          subtitle={item.subtitle}
          :style="`top: ${vlData.topPosition}px`"
        ></ListItem>
      </ul>
    </List>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, List, ListItem, Subnavbar, Searchbar, Block } from 'framework7-react';

  export default {
    components: {
      Navbar, Page, List, ListItem, Subnavbar, Searchbar, Block,
    },
    data() {
      const items = [];
      for (let i = 1; i <= 10000; i += 1) {
        items.push({
          title: `Item ${i}`,
          subtitle: `Subtitle ${i}`,
        });
      }
      return {
        items,
        vlData: {},
      };
    },
    methods: {
      searchAll(query, items) {
        const found = [];
        for (let i = 0; i < items.length; i += 1) {
          if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
        }
        return found; // return array with mathced indexes
      },
      renderExternal(vl, vlData) {
        this.vlData = vlData;
      },
    },
  };
</script>
