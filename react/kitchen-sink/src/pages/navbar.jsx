import React from 'react';
import { Navbar, Page, Block, List, ListItem, NavRight, Link } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Navbar" subtitle="Subtitle" backLink="Back">
      <NavRight>
        <Link>Right</Link>
      </NavRight>
    </Navbar>
    <Block>
      <p>Navbar is a fixed (with Fixed and Through layout types) area at the top of a screen that contains Page title and navigation elements.</p>
      <p>Navbar has 3 main parts: Left, Title and Right. Each part may contain any HTML content.</p>
    </Block>
    <List>
      <ListItem link="/navbar-hide-scroll/" title="Hide Navbar On Scroll"></ListItem>
    </List>
  </Page>
);
