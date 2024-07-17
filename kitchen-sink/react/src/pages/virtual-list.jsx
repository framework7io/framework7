import React, { useState } from 'react';
import { Navbar, Page, List, ListItem, Subnavbar, Searchbar, Block, theme } from 'framework7-react';

export default () => {
  const items = [];
  for (let i = 1; i <= 10000; i += 1) {
    items.push({
      title: `Item ${i}`,
      subtitle: `Subtitle ${i}`,
    });
  }
  const [vlData, setVlData] = useState({
    items: [],
  });

  const searchAll = (query, searchItems) => {
    const found = [];
    for (let i = 0; i < searchItems.length; i += 1) {
      if (
        searchItems[i].title.toLowerCase().indexOf(query.toLowerCase()) >= 0 ||
        query.trim() === ''
      )
        found.push(i);
    }
    return found; // return array with matched indexes
  };
  const renderExternal = (vl, newData) => {
    setVlData({ ...newData });
  };
  return (
    <Page>
      <Navbar title="Virtual List" backLink="Back">
        <Subnavbar inner={false}>
          <Searchbar searchContainer=".virtual-list" searchItem="li" searchIn=".item-title" />
        </Subnavbar>
      </Navbar>
      <Block>
        <p>
          Virtual List allows to render lists with huge amount of elements without loss of
          performance. And it is fully compatible with all Framework7 list components such as Search
          Bar, Infinite Scroll, Pull To Refresh, Swipeouts (swipe-to-delete) and Sortable.
        </p>
        <p>Here is the example of virtual list with 10 000 items:</p>
      </Block>
      <List strong outlineIos insetMd dividersIos className="searchbar-not-found">
        <ListItem title="Nothing found" />
      </List>
      <List
        strong
        outlineIos
        insetMd
        dividersIos
        className="searchbar-found"
        medialList
        virtualList
        virtualListParams={{
          items,
          searchAll,
          renderExternal,
          height: theme.ios ? 63 : theme.md ? 73 : 77,
        }}
      >
        <ul>
          {vlData.items.map((item, index) => (
            <ListItem
              key={index}
              mediaItem
              link="#"
              title={item.title}
              subtitle={item.subtitle}
              style={{ top: `${vlData.topPosition}px` }}
              virtualListIndex={items.indexOf(item)}
            />
          ))}
        </ul>
      </List>
    </Page>
  );
};
