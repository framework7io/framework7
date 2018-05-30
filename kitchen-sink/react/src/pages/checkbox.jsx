import React from 'react';
import { Navbar, Page, BlockTitle, Block, List, ListItem, Checkbox } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Checkbox" backLink="Back" />
    <BlockTitle>Inline</BlockTitle>
    <Block strong>
      <p>Lorem <Checkbox name="checkbox-1"></Checkbox> ipsum dolor sit amet, consectetur adipisicing elit. Alias beatae illo nihil aut eius commodi sint eveniet aliquid eligendi <Checkbox name="checkbox-2" defaultChecked></Checkbox> ad delectus impedit tempore nemo, enim vel praesentium consequatur nulla mollitia!</p>
    </Block>

    <BlockTitle>Checkbox Group</BlockTitle>
    <List>
      <ListItem checkbox title="Books" name="demo-checkbox" defaultChecked></ListItem>
      <ListItem checkbox title="Movies" name="demo-checkbox"></ListItem>
      <ListItem checkbox title="Food" name="demo-checkbox"></ListItem>
      <ListItem checkbox title="Drinks" name="demo-checkbox"></ListItem>
    </List>

    <BlockTitle>With Media Lists</BlockTitle>
    <List mediaList>
      <ListItem
        checkbox
        defaultChecked
        name="demo-media-checkbox"
        title="Facebook"
        after="17:14"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
      <ListItem
        checkbox
        name="demo-media-checkbox"
        title="John Doe (via Twitter)"
        after="17:11"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
      <ListItem
        checkbox
        name="demo-media-checkbox"
        title="Facebook"
        after="16:48"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
      <ListItem
        checkbox
        name="demo-media-checkbox"
        title="John Doe (via Twitter)"
        after="15:32"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      ></ListItem>
    </List>
  </Page>
);
