import React from 'react';
import { Navbar, Page, Block, Col, Button } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Panel / Side panels" backLink="Back"></Navbar>
    <Block>
      <p>Framework7 comes with 2 panels (on left and on right), both are optional. They have two different layouts/effects - <b>cover</b> above the content (like left panel here) and <b>reveal</b> (like right panel). You can put absolutely anything inside: data lists, forms, custom content, and even other isolated app view (like in right panel now) with its own dynamic navbar. Checkout panels:</p>
    </Block>
    <Block className="row">
      <Col>
        <Button raised fill panelOpen="left">Open left panel</Button>
      </Col>
      <Col>
        <Button raised fill panelOpen="right">Open right panel</Button>
      </Col>
    </Block>
  </Page>
)