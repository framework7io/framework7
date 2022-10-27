<template>
  <f7-page>
    <f7-navbar title="Dialog" back-link="Back"></f7-navbar>
    <f7-block strong-ios outline-ios>
      <p>
        There are 1:1 replacements of native Alert, Prompt and Confirm modals. They support
        callbacks, have very easy api and can be combined with each other. Check these examples:
      </p>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button fill @click="openAlert">Alert</f7-button>
        <f7-button fill @click="openConfirm">Confirm</f7-button>
        <f7-button fill @click="openPrompt">Prompt</f7-button>
      </p>
      <p class="grid grid-cols-2 grid-gap">
        <f7-button fill @click="openLogin">Login</f7-button>
        <f7-button fill @click="openPassword">Password</f7-button>
      </p>
    </f7-block>
    <f7-block-title>Vertical Buttons</f7-block-title>
    <f7-block strong-ios outline-ios>
      <p>
        <f7-button fill @click="openVerticalButtons">Vertical Buttons</f7-button>
      </p>
    </f7-block>
    <f7-block-title>Preloader Dialog</f7-block-title>
    <f7-block strong-ios outline-ios>
      <p class="grid grid-cols-2 grid-gap">
        <f7-button fill @click="openPreloader">Preloader</f7-button>
        <f7-button fill @click="openCustomPreloader">Custom Text</f7-button>
      </p>
    </f7-block>
    <f7-block-title>Progress Dialog</f7-block-title>
    <f7-block strong-ios outline-ios>
      <p class="grid grid-cols-2 grid-gap">
        <f7-button fill @click="openInfiniteProgress">Infinite</f7-button>
        <f7-button fill @click="openDeterminedProgress">Determined</f7-button>
      </p>
    </f7-block>
    <f7-block-title>Dialogs Stack</f7-block-title>
    <f7-block strong-ios outline-ios>
      <p>
        This feature doesn't allow to open multiple dialogs at the same time, and will automatically
        open next dialog when you close the current one. Such behavior is similar to browser native
        dialogs:
      </p>
      <p>
        <f7-button fill @click="openAlerts">Open Multiple Alerts</f7-button>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Button, f7 } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Block,
    f7Button,
  },
  methods: {
    openAlert() {
      f7.dialog.alert('Hello!');
    },
    openConfirm() {
      f7.dialog.confirm('Are you feel good today?', () => {
        f7.dialog.alert('Great!');
      });
    },
    openPrompt() {
      f7.dialog.prompt('What is your name?', (name) => {
        f7.dialog.confirm(`Are you sure that your name is ${name}?`, () => {
          f7.dialog.alert(`Ok, your name is ${name}`);
        });
      });
    },
    openLogin() {
      f7.dialog.login('Enter your username and password', (username, password) => {
        f7.dialog.alert(`Thank you!<br>Username:${username}<br>Password:${password}`);
      });
    },
    openPassword() {
      f7.dialog.password('Enter your password', (password) => {
        f7.dialog.alert(`Thank you!<br>Password:${password}`);
      });
    },
    openAlerts() {
      f7.dialog.alert('Alert 1');
      f7.dialog.alert('Alert 2');
      f7.dialog.alert('Alert 3');
      f7.dialog.alert('Alert 4');
      f7.dialog.alert('Alert 5');
    },
    openVerticalButtons() {
      f7.dialog
        .create({
          title: 'Vertical Buttons',
          buttons: [
            {
              text: 'Button 1',
            },
            {
              text: 'Button 2',
            },
            {
              text: 'Button 3',
            },
          ],
          verticalButtons: true,
        })
        .open();
    },
    openPreloader() {
      f7.dialog.preloader();
      setTimeout(() => {
        f7.dialog.close();
      }, 3000);
    },
    openCustomPreloader() {
      f7.dialog.preloader('My text...');
      setTimeout(() => {
        f7.dialog.close();
      }, 3000);
    },
    openInfiniteProgress() {
      f7.dialog.progress();
      setTimeout(() => {
        f7.dialog.close();
      }, 3000);
    },
    openDeterminedProgress() {
      let progress = 0;
      const dialog = f7.dialog.progress('Loading assets', progress);
      dialog.setText('Image 1 of 10');
      const interval = setInterval(() => {
        progress += 10;
        dialog.setProgress(progress);
        dialog.setText(`Image ${progress / 10} of 10`);
        if (progress === 100) {
          clearInterval(interval);
          dialog.close();
        }
      }, 300);
    },
  },
};
</script>
