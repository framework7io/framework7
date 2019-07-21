import React from 'react';
import { Navbar, Page, List, ListItem, BlockFooter } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          title: 'Yellow Submarine',
          author: 'Beatles',
          cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-1.jpg',
        },
        {
          title: 'Don\'t Stop Me Now',
          author: 'Queen',
          cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-2.jpg',
        },
        {
          title: 'Billie Jean',
          author: 'Michael Jackson',
          cover: 'https://cdn.framework7.io/placeholder/abstract-88x88-3.jpg',
        },
      ],
      songs: ['Yellow Submarine', 'Don\'t Stop Me Now', 'Billie Jean', 'Californication'],
      authors: ['Beatles', 'Queen', 'Michael Jackson', 'Red Hot Chili Peppers'],
    }
  }
  render() {
    return (
      <Page ptr ptrMousewheel={true} onPtrRefresh={this.loadMore.bind(this)}>
        <Navbar title="Pull To Refresh" backLink="Back"></Navbar>
        <List mediaList>
          {this.state.items.map((item, index) => (
            <ListItem
              key={index}
              title={item.title}
              subtitle={item.author}
            >
              <img slot="media" src={item.cover} width="44" />
            </ListItem>
          ))}
          <BlockFooter>
            <p>Just pull page down to let the magic happen.<br />Note that pull-to-refresh feature is optimised for touch and native scrolling so it may not work on desktop browser.</p>
          </BlockFooter>
        </List>
      </Page>
    );
  }
  loadMore(event, done) {
    const self = this;
    setTimeout(() => {
      const { items, songs, authors } = self.state;
      const picURL = `https://cdn.framework7.io/placeholder/abstract-88x88-${(Math.floor(Math.random() * 10) + 1)}.jpg`;
      const song = songs[Math.floor(Math.random() * songs.length)];
      const author = authors[Math.floor(Math.random() * authors.length)];
      items.push({
        title: song,
        author,
        cover: picURL,
      });
      self.setState({ items });

      done();
    }, 1000);
  }
};
