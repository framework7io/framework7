<template>
  <f7-page no-toolbar no-navbar no-swipeback login-screen>
    <f7-login-screen-title>Framework7</f7-login-screen-title>
    <f7-list form>
      <f7-list-item>
        <f7-label>Username</f7-label>
        <f7-input type="text" placeholder="Your username" @input="username = $event.target.value"></f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Password</f7-label>
        <f7-input type="password" placeholder="Your password" @input="password = $event.target.value"></f7-input>
      </f7-list-item>
    </f7-list>
    <f7-list>
      <f7-list-button @click="signIn">Sign In</f7-list-button>
      <f7-block-footer>Some text about login information.<br>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Page, f7LoginScreenTitle, f7List, f7ListItem, f7Label, f7Input, f7ListButton, f7BlockFooter } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7LoginScreenTitle,
      f7List,
      f7ListItem,
      f7Label,
      f7Input,
      f7ListButton,
      f7BlockFooter,
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
