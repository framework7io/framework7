import React, { useState } from 'react';
import { Navbar, Page, List, ListItem, BlockFooter } from 'framework7-react';

export default () => {
  const songs = ['Yellow Submarine', "Don't Stop Me Now", 'Billie Jean', 'Californication'];
  const authors = ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'];
  const [items, setItems] = useState([
    {
      title: 'Yellow Submarine',
      author: 'Beatles',
      cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-1.jpg',
    },
    {
      title: "Don't Stop Me Now",
      author: 'Queen',
      cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-2.jpg',
    },
    {
      title: 'Billie Jean',
      author: 'Michael Jackson',
      cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
    },
  ]);
  const loadMore = (done) => {
    setTimeout(() => {
      const picURL = `https://cdn.framework7.io/placeholder/abstract-88x88-${
        Math.floor(Math.random() * 10) + 1
      }.jpg`;
      const song = songs[Math.floor(Math.random() * songs.length)];
      const author = authors[Math.floor(Math.random() * authors.length)];
      items.push({
        title: song,
        author,
        cover: picURL,
      });
      setItems([...items]);

      done();
    }, 1000);
  };
  return (
    <Page ptr ptrMousewheel={true} onPtrRefresh={loadMore}>
      <Navbar title="Pull To Refresh" backLink="Back"></Navbar>
      <List mediaList strongIos dividersIos outlineIos>
        {items.map((item, index) => (
          <ListItem key={index} title={item.title} subtitle={item.author}>
            <img slot="media" src={item.cover} width="44" style={{ borderRadius: '8px' }} />
          </ListItem>
        ))}
        <BlockFooter>
          <p>
            Just pull page down to let the magic happen.
            <br />
            Note that pull-to-refresh feature is optimised for touch and native scrolling so it may
            not work on desktop browser.
          </p>
        </BlockFooter>
      </List>
    </Page>
  );
};
