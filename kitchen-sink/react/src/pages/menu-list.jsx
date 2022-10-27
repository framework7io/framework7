import React, { useState } from 'react';
import { Page, Navbar, Block, List, ListItem, Icon } from 'framework7-react';

export default () => {
  const [selected, setSelected] = useState('home');
  const [selectedMedia, setSelectedMedia] = useState('home');
  return (
    <Page>
      <Navbar title="Menu List" backLink="Back"></Navbar>

      <Block>
        <p>
          Menu list unlike usual links list is designed to indicate currently active screen (or
          section) of your app. Think about it like a Tabbar but in a form of a list.
        </p>
      </Block>

      <List menuList outlineIos strongIos>
        <ListItem
          link
          title="Home"
          selected={selected === 'home'}
          onClick={() => setSelected('home')}
        >
          <Icon md="material:home" ios="f7:house_fill" slot="media" />
        </ListItem>
        <ListItem
          link
          title="Profile"
          selected={selected === 'profile'}
          onClick={() => setSelected('profile')}
        >
          <Icon md="material:person" ios="f7:person_fill" slot="media" />
        </ListItem>
        <ListItem
          link
          title="Settings"
          selected={selected === 'settings'}
          onClick={() => setSelected('settings')}
        >
          <Icon md="material:settings" ios="f7:gear_alt_fill" slot="media" />
        </ListItem>
      </List>

      <List menuList mediaList outlineIos strongIos>
        <ListItem
          link
          title="Home"
          subtitle="Home subtitle"
          selected={selectedMedia === 'home'}
          onClick={() => setSelectedMedia('home')}
        >
          <Icon md="material:home" ios="f7:house_fill" slot="media" />
        </ListItem>
        <ListItem
          link
          title="Profile"
          subtitle="Profile subtitle"
          selected={selectedMedia === 'profile'}
          onClick={() => setSelectedMedia('profile')}
        >
          <Icon md="material:person" ios="f7:person_fill" slot="media" />
        </ListItem>
        <ListItem
          link
          title="Settings"
          subtitle="Settings subtitle"
          selected={selectedMedia === 'settings'}
          onClick={() => setSelectedMedia('settings')}
        >
          <Icon md="material:settings" ios="f7:gear_alt_fill" slot="media" />
        </ListItem>
      </List>
    </Page>
  );
};
