import React from 'react';
import { Navbar, Page, List, ListButton } from 'framework7-react';

export default () => {
  return (
    <Page>
      <Navbar title="List Button" backLink="Back" />

      <List inset strong>
        <ListButton title="List Button 1" />
        <ListButton title="List Button 2" />
        <ListButton title="List Button 3" />
      </List>
      <List inset strong>
        <ListButton title="Large Red Button" color="red" />
      </List>
    </Page>
  );
};
