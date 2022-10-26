import React, { useRef, useState } from 'react';
import { Navbar, Page, BlockTitle, List, ListItem } from 'framework7-react';

export default () => {
  const allowInfinite = useRef(true);
  const [items, setItems] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);
  const [showPreloader, setShowPreloader] = useState(true);

  const loadMore = () => {
    if (!allowInfinite.current) return;
    allowInfinite.current = false;

    setTimeout(() => {
      if (items.length >= 200) {
        setShowPreloader(false);
        return;
      }

      const itemsLength = items.length;

      for (let i = 1; i <= 20; i += 1) {
        items.push(itemsLength + i);
      }
      allowInfinite.current = true;
      setItems([...items]);
    }, 1000);
  };

  return (
    <Page infinite infiniteDistance={50} infinitePreloader={showPreloader} onInfinite={loadMore}>
      <Navbar title="Infinite Scroll" backLink="Back"></Navbar>
      <BlockTitle>Scroll bottom</BlockTitle>
      <List strongIos outlineIos dividersIos>
        {items.map((item, index) => (
          <ListItem title={`Item ${item}`} key={index}></ListItem>
        ))}
      </List>
    </Page>
  );
};
