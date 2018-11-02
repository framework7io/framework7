import React from 'react';
import { Navbar, Page, BlockTitle, Block, BlockHeader, BlockFooter } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Content Block" backLink="Back"></Navbar>
    <p>This paragraph is outside of content block. Not cool, but useful for any custom elements with custom styling.</p>

    <Block>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>

    <Block strong>
      <p>Here comes another text block with additional "block-strong" class. Praesent nec imperdiet diam. Maecenas vel lectus porttitor, consectetur magna nec, viverra sem. Aliquam sed risus dolor. Morbi tincidunt ut libero id sodales. Integer blandit varius nisi quis consectetur. </p>
    </Block>

    <BlockTitle>Block title</BlockTitle>
    <Block>
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>

    <BlockTitle>Another ultra long content block title</BlockTitle>
    <Block strong>
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>

    <BlockTitle>Inset</BlockTitle>
    <Block strong inset>
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>

    <BlockTitle>Tablet Inset</BlockTitle>
    <Block strong tabletInset>
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>

    <BlockTitle>With Header & Footer</BlockTitle>
    <Block>
      <BlockHeader>Block Header</BlockHeader>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
      <BlockFooter>Block Footer</BlockFooter>
    </Block>

    <BlockHeader>Block Header</BlockHeader>
    <Block>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>
    <BlockFooter>Block Footer</BlockFooter>

    <Block strong>
      <BlockHeader>Block Header</BlockHeader>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
      <BlockFooter>Block Footer</BlockFooter>
    </Block>

    <BlockHeader>Block Header</BlockHeader>
    <Block strong>
      <p>Here comes paragraph within content block. Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>
    <BlockFooter>Block Footer</BlockFooter>

    <BlockTitle large>Block Title Large</BlockTitle>
    <Block strong>
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>

    <BlockTitle medium>Block Title Medium</BlockTitle>
    <Block strong>
      <p>Donec et nulla auctor massa pharetra adipiscing ut sit amet sem. Suspendisse molestie velit vitae mattis tincidunt. Ut sit amet quam mollis, vulputate turpis vel, sagittis felis. </p>
    </Block>
  </Page>
);