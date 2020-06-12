import React from 'react';
import { Navbar, Page, Toolbar, List, ListItem, Button, Link, BlockTitle, Block } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbarPosition: 'bottom',
    }
  }
  toggleToolbarPosition() {
    this.setState({
      toolbarPosition: this.state.toolbarPosition === 'top' ? 'bottom' : 'top',
    });
  }
  render() {
    return (
      <Page ref="el">
        <Navbar title="Toolbar & Tabbar" backLink="Back"></Navbar>
        <Toolbar position={this.state.toolbarPosition}>
          <Link>Left Link</Link>
          <Link>Right Link</Link>
        </Toolbar>
        <List>
          <ListItem link="./tabbar/" title="Tabbar"></ListItem>
          <ListItem link="./tabbar-labels/" title="Tabbar With Labels"></ListItem>
          <ListItem link="./tabbar-scrollable/" title="Tabbar Scrollable"></ListItem>
          <ListItem link="./toolbar-hide-scroll/" title="Hide Toolbar On Scroll"></ListItem>
        </List>
        <BlockTitle>Toolbar Position</BlockTitle>
        <Block>
          <p>Toolbar supports both top and bottom positions. Click the following button to change its position.</p>
          <p>
            <Button fill onClick={() => {this.toggleToolbarPosition()}}>Toggle Toolbar Position</Button>
          </p>
        </Block>
      </Page>
    )
  }
};

