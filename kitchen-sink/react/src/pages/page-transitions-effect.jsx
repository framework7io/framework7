import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';

export default (props) => (
  <Page>
    <Navbar title={props.effect} backLink="Back"></Navbar>

    <Block strong className="text-align-center">
    <p>This page was loaded with <b>{props.effect}</b> transition.</p>
    </Block>
  </Page>
);
