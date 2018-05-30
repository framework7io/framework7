import React from 'react';
import { Navbar, Page, Toolbar, List, ListItem, Button, Link, BlockTitle, Block } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toolbarBottom: false,
    }
  }
  render() {
    return (
      <Page ref="el">
        <Navbar title="Toolbar & Tabbar" backLink="Back"></Navbar>
        <Toolbar bottomMd={this.state.toolbarBottom}>
          <Link>Left Link</Link>
          <Link>Right Link</Link>
        </Toolbar>
        <List>
          <ListItem link="./tabbar/" title="Tabbar"></ListItem>
          <ListItem link="./tabbar-labels/" title="Tabbar With Labels"></ListItem>
          <ListItem link="./tabbar-scrollable/" title="Tabbar Scrollable"></ListItem>
          <ListItem link="./toolbar-hide-scroll/" title="Hide Toolbar On Scroll"></ListItem>
        </List>
        {this.$theme.md && (
          <BlockTitle>Toolbar Position</BlockTitle>
        )}
        {this.$theme.md && (
          <Block>
            <p>Material (MD) theme toolbar supports both top and bottom positions. Click the following button to change its position.</p>
            <p>
              <Button raised onClick={() => {this.setState({ toolbarBottom: !this.state.toolbarBottom })}}>Toggle Toolbar Position</Button>
            </p>
          </Block>
        )}
      </Page>
    )
  }
};

