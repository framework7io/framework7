import React from 'react';
import { Navbar, Page, BlockTitle, Block, List, ListItem, Radio } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Radio" backLink="Back"></Navbar>

    <BlockTitle>Inline</BlockTitle>
    <Block strong>
      <p>Lorem <Radio name="demo-radio-inline" value="inline-1"/> ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae illo nihil aut eius commodi sint eveniet aliquid eligendi <Radio name="demo-radio-inline" value="inline-2" defaultChecked /> ad delectus impedit tempore nemo, enim vel praesentium consequatur nulla mollitia!</p>
    </Block>

    <BlockTitle>Radio Group</BlockTitle>
    <List>
      <ListItem radio title="Books" name="demo-radio" value="Books" defaultChecked></ListItem>
      <ListItem radio title="Movies" value="Movies" name="demo-radio"></ListItem>
      <ListItem radio title="Food" value="Food" name="demo-radio"></ListItem>
      <ListItem radio title="Drinks" value="Drinks" name="demo-radio"></ListItem>
    </List>


    <BlockTitle>With Media Lists</BlockTitle>
    <List mediaList>
      <ListItem
        radio
        defaultChecked
        name="demo-media-radio"
        value="1"
        title="Facebook"
        after="17:14"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
      <ListItem
        radio
        name="demo-media-radio"
        value="2"
        title="John Doe (via Twitter)"
        after="17:11"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
      <ListItem
        radio
        name="demo-media-radio"
        value="3"
        title="Facebook"
        after="16:48"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
      <ListItem
        radio
        name="demo-media-radio"
        value="4"
        title="John Doe (via Twitter)"
        after="15:32"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
    </List>
  </Page>
);
