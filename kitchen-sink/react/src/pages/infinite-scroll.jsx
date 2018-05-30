import React from 'react';
import { Navbar, Page, BlockTitle, List, ListItem } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      allowInfinite: true,
      showPreloader: true,
    };
  }
  render() {
    return (
      <Page
        infinite
        infiniteDistance={50}
        infinitePreloader={this.state.showPreloader}
        onInfinite={this.loadMore.bind(this)}
      >
        <Navbar title="Infinite Scroll" backLink="Back"></Navbar>
        <BlockTitle>Scroll bottom</BlockTitle>
        <List>
          {this.state.items.map((item, index) => (
            <ListItem title={`Item ${item}`} key={index}></ListItem>
          ))}
        </List>
      </Page>
    )
  }
  loadMore() {
    const self = this;
    if (!self.state.allowInfinite) return;
    self.setState({ allowInfinite: false });

    setTimeout(() => {
      const items = self.state.items;
      if (items.length >= 200) {
        self.setState({ showPreloader: false });
        return;
      }

      const itemsLength = items.length;

      for (let i = 1; i <= 20; i += 1) {
        items.push(itemsLength + i);
      }

      self.setState({
        items,
        allowInfinite: true,
      });
    }, 1000);
  }
};