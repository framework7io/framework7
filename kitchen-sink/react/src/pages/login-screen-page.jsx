import React, { useState } from 'react';
import {
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  BlockFooter,
  f7,
} from 'framework7-react';

export default ({ f7router }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const signIn = () => {
    f7.dialog.alert(`Username: ${username}<br>Password: ${password}`, () => {
      f7router.back();
    });
  };
  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
      <LoginScreenTitle>Framework7</LoginScreenTitle>
      <List form>
        <ListInput
          label="Username"
          type="text"
          placeholder="Your username"
          value={username}
          onInput={(e) => {
            setUsername(e.target.value);
          }}
        />
        <ListInput
          label="Password"
          type="password"
          placeholder="Your password"
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
      </List>
      <List inset>
        <ListButton onClick={signIn}>Sign In</ListButton>
        <BlockFooter>
          Some text about login information.
          <br />
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </BlockFooter>
      </List>
    </Page>
  );
};
