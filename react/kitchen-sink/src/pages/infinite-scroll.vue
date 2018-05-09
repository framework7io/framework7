<template>
  <Page infinite infinite-distance={50} infinite-preloader={showPreloader} @infinite={loadMore}>
    <Navbar title="Infinite Scroll" backLink="Back"></Navbar>
    <BlockTitle>Scroll bottom</BlockTitle>
    <List>
      <ListItem v-for="(item, index) in items" title={`Item ${item}`} key={index}></ListItem>
    </List>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, BlockTitle, List, ListItem } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      BlockTitle,
      List,
      ListItem,
    },
    data() {
      return {
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        allowInfinite: true,
        lastItem: 20,
        showPreloader: true,
      };
    },
    methods: {
      loadMore() {
        const self = this;
        if (!self.allowInfinite) return;
        self.allowInfinite = false;

        setTimeout(() => {
          if (self.items.length >= 200) {
            self.showPreloader = false;
            return;
          }

          const itemsLength = self.items.length;

          for (let i = 1; i <= 20; i += 1) {
            self.items.push(itemsLength + i);
          }

          self.allowInfinite = true;
        }, 1000);
      },
    },
  };
</script>
