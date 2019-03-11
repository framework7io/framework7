import React from 'react';
import { Navbar, Page, List, ListItem, Subnavbar, Searchbar, Block } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    const items = [];
    for (let i = 1; i <= 10000; i += 1) {
      items.push({
        title: `Item ${i}`,
        subtitle: `Subtitle ${i}`,
      });
    }
    this.state = {
      items,
      vlData: {
        items: [],
      },
    };
  }
  render() {
    return (
      <Page>
        <Navbar title="Virtual List" backLink="Back">
          <Subnavbar inner={false}>
            <Searchbar
              searchContainer=".virtual-list"
              searchItem="li"
              searchIn=".item-title"
              disableButton={!this.$theme.aurora}
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
          medialList
          virtualList
          virtualListParams={{ items: this.state.items, searchAll: this.searchAll, renderExternal: this.renderExternal.bind(this), height: this.$theme.ios ? 63 : (this.$theme.md ? 73 : 46)}}
        >
          <ul>
            {this.state.vlData.items.map((item, index) => (
              <ListItem
                key={index}
                mediaItem
                link="#"
                title={item.title}
                subtitle={item.subtitle}
                style={{top: `${this.state.vlData.topPosition}px`}}
                virtualListIndex={this.state.items.indexOf(item)}
              ></ListItem>
            ))}
          </ul>
        </List>
      </Page>
    )
  }
  searchAll(query, items) {
    const found = [];
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '') found.push(i);
    }
    return found; // return array with mathced indexes
  }
  renderExternal(vl, vlData) {
    this.setState({ vlData });
  }
}

