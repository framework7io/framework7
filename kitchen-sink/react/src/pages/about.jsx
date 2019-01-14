import React from 'react';
import { Page, Navbar, BlockTitle, Block } from 'framework7-react';

export default () => (
  <Page>
    <Navbar large title="About" title-large="About" backLink="Framework7"></Navbar>
    <BlockTitle>Welcome to Framework7</BlockTitle>
    <Block strong>
      <p>Framework7 - is a free and open source HTML mobile framework to develop hybrid mobile apps or web apps with iOS or Android (Material) native look and feel. It is also an indispensable prototyping apps tool to show working app prototype as soon as possible in case you need to. Framework7 is created by Vladimir Kharlampidi (iDangero.us).</p>
      <p>The main approach of the Framework7 is to give you an opportunity to create iOS and Android (Material) apps with HTML, CSS and JavaScript easily and clear. Framework7 is full of freedom. It doesn't limit your imagination or offer ways of any solutions somehow. Framework7 gives you freedom!</p>
      <p>Framework7 is not compatible with all platforms. It is focused only on iOS and Android (Material) to bring the best experience and simplicity.</p>
      <p>Framework7 is definitely for you if you decide to build iOS and Android hybrid app (PhoneGap) or web app that looks like and feels as great native iOS or Android (Material) apps.</p>
    </Block>
  </Page>
);
