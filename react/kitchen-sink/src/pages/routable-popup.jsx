import React from 'react';
import { Popup, Navbar, NavRight, Link, Page, List, ListItem, Block } from 'framework7-react';

export default () => (
  <Popup>
    <Page>
      <Navbar title="Routable Popup">
        <NavRight>
          <Link popupClose>Close</Link>
        </NavRight>
      </Navbar>
      <Block>
        <p>Hello world</p>
      </Block>
    </Page>
  </Popup>
);
