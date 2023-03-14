import React from 'react';
import {
  f7,
  useStore,
  Page,
  Navbar,
  Block,
  Button,
  Preloader,
  List,
  ListItem,
} from 'framework7-react';

export default () => {
  // Subscribe to store getters
  const users = useStore('users');
  const loading = useStore('usersLoading');

  // Call store action
  const load = () => f7.store.dispatch('loadUsers');

  return (
    <Page>
      <Navbar title="Store" backLink="Back"></Navbar>
      <Block strong outlineIos insetMd>
        <p>
          Framework7 comes with a built-in lightweight application state management library - Store.
          It serves as a centralized Store for all the components in an application.
        </p>
      </Block>
      {!users && (
        <Block className="text-align-center">
          {!loading && (
            <Button fill round onClick={load}>
              Load Users
            </Button>
          )}
          {loading && <Preloader />}
        </Block>
      )}

      {users && (
        <List strong outlineIos dividersIos insetMd>
          {users.map((user) => (
            <ListItem key={user} title={user} />
          ))}
        </List>
      )}
    </Page>
  );
};
