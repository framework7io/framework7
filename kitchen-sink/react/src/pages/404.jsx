import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Not found" backLink="Back"></Navbar>
    <Block strong>
      <p>Sorry</p>
      <p>Requested content not found.</p>
    </Block>
  </Page>
);
