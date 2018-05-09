<template>
  <Page ptr @ptr:refresh="loadMore">
    <Navbar title="Pull To Refresh" backLink="Back"></Navbar>
    <List mediaList>
      <ListItem
        v-for="(item, index) in items"
        key={index}
        title={item.title}
        subtitle={item.author}>
        <img slot="media" src={item.cover} width="44" />
      </ListItem>

      <BlockFooter>
        <p>Just pull page down to let the magic happen.<br>Note that pull-to-refresh feature is optimised for touch and native scrolling so it may not work on desktop browser.</p>
      </BlockFooter>
    </List>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, List, ListItem, BlockFooter } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      List,
      ListItem,
      BlockFooter,
    },
    data() {
      return {
        items: [
          {
            title: 'Yellow Submarine',
            author: 'Beatles',
            cover: 'http://lorempixel.com/88/88/abstract/1',
          },
          {
            title: 'Don\'t Stop Me Now',
            author: 'Queen',
            cover: 'http://lorempixel.com/88/88/abstract/2',
          },
          {
            title: 'Billie Jean',
            author: 'Michael Jackson',
            cover: 'http://lorempixel.com/88/88/abstract/3',
          },
        ],
        songs: ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'],
        authors: ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'],
      };
    },
    methods: {
      loadMore(event, done) {
        const self = this;

        setTimeout(() => {
          const picURL = `http://lorempixel.com/88/88/abstract/${Math.round(Math.random() * 10)}`;
          const song = self.songs[Math.floor(Math.random() * self.songs.length)];
          const author = self.authors[Math.floor(Math.random() * self.authors.length)];

          self.items.push({
            title: song,
            author,
            img: picURL,
          });

          done();
        }, 1000);
      },
    },
  };
</script>
