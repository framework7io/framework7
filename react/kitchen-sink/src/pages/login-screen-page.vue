<template>
  <Page no-toolbar no-navbar no-swipeback login-screen>
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
</template>
<script>
  import React from 'react';
  import { Page, LoginScreenTitle, List, ListItem, Label, Input, ListButton, BlockFooter } from 'framework7-react';

  export default {
    components: {
      Page,
      LoginScreenTitle,
      List,
      ListItem,
      Label,
      Input,
      ListButton,
      BlockFooter,
    },
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      signIn() {
        const self = this;
        const app = self.$f7;
        const router = self.$f7router;
        app.dialog.alert(`Username: ${self.username}<br>Password: ${self.password}`, () => {
          router.back();
        });
      },
    },
  };
</script>
