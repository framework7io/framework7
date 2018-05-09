<template>
  <Page>
    <Navbar title="Login Screen" backLink="Back"></Navbar>
    <Block>
      <p>Framework7 comes with ready to use Login Screen layout. It could be used inside of page or inside of popup (Embedded) or as a standalone overlay:</p>
    </Block>

    <List>
      <ListItem link="/login-screen-page/" title="As Separate Page"></ListItem>
    </List>

    <Block>
      <Button raised big fill login-screen-open=".demo-login-screen">As Overlay</Button>
    </Block>

    <Block>
      <Button raised big fill @click={loginScreenOpened = true}>Open Via Prop Change</Button>
    </Block>

    <LoginScreen className="demo-login-screen" opened={loginScreenOpened} @loginscreen:closed="loginScreenOpened = false">
      <Page login-screen>
        <LoginScreenTitle>Framework7</LoginScreenTitle>
        <List form>
          <ListItem>
            <Label>Username</Label>
            <Input type="text" placeholder="Your username" @input={username = $event.target.value}></Input>
          </ListItem>
          <ListItem>
            <Label>Password</Label>
            <Input type="password" placeholder="Your password" @input={password = $event.target.value}></Input>
          </ListItem>
        </List>
        <List>
          <ListButton @click={signIn}>Sign In</ListButton>
          <BlockFooter>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BlockFooter>
        </List>
      </Page>
    </LoginScreen>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, Link, LoginScreen, Input, List, ListItem, Block, Button, LoginScreenTitle, BlockFooter, Label, ListButton } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      Link,
      LoginScreen,
      Input,
      List,
      ListItem,
      Block,
      Button,
      LoginScreenTitle,
      BlockFooter,
      Label,
      ListButton,
    },
    data() {
      return {
        loginScreenOpened: false,
        username: '',
        password: '',
      };
    },
    methods: {
      signIn() {
        const self = this;
        const app = self.$f7;

        app.dialog.alert(`Username: ${self.username}<br>Password: ${self.password}`, () => {
          app.loginScreen.close();
        });
      },
    },
  };
</script>
