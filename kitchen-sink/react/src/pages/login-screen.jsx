import React, { useState } from 'react';
import {
  Navbar,
  Page,
  LoginScreen,
  ListInput,
  List,
  ListItem,
  Block,
  Button,
  LoginScreenTitle,
  BlockFooter,
  ListButton,
  f7,
} from 'framework7-react';

export default () => {
  const [loginScreenOpened, setLoginScreenOpened] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    f7.dialog.alert(`Username: ${username}<br>Password: ${password}`, () => {
      f7.loginScreen.close();
    });
  };

  return (
    <Page>
      <Navbar title="Login Screen" backLink="Back"></Navbar>
      <Block>
        <p>
          Framework7 comes with ready to use Login Screen layout. It could be used inside of page or
          inside of popup (Embedded) or as a standalone overlay:
        </p>
      </Block>

      {/* example-hidden-start */}
      <List strong insetMd outlineIos>
        <ListItem link="/login-screen-page/" title="As Separate Page"></ListItem>
      </List>
      {/* example-hidden-end */}

      <Block>
        <Button raised large fill loginScreenOpen=".demo-login-screen">
          As Overlay
        </Button>
      </Block>

      <Block>
        <Button
          raised
          large
          fill
          onClick={() => {
            setLoginScreenOpened(true);
          }}
        >
          Open Via Prop Change
        </Button>
      </Block>

      <LoginScreen
        className="demo-login-screen"
        opened={loginScreenOpened}
        onLoginScreenClosed={() => {
          setLoginScreenOpened(false);
        }}
      >
        <Page loginScreen>
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
      </LoginScreen>
    </Page>
  );
};
