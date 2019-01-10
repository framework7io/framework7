<template>
  <f7-page>
    <f7-navbar title="Dialog" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>There are 1:1 replacements of native Alert, Prompt and Confirm modals. They support callbacks, have very easy api and can be combined with each other. Check these examples:</p>
      <f7-row tag="p">
        <f7-button fill class="col" @click="openAlert">Alert</f7-button>
        <f7-button fill class="col" @click="openConfirm">Confirm</f7-button>
        <f7-button fill class="col" @click="openPrompt">Prompt</f7-button>
      </f7-row>
      <f7-row tag="p">
        <f7-button fill class="col" @click="openLogin">Login</f7-button>
        <f7-button fill class="col" @click="openPassword">Password</f7-button>
      </f7-row>
    </f7-block>
    <f7-block-title>Vertical Buttons</f7-block-title>
    <f7-block strong>
      <p>
        <f7-button fill @click="openVerticalButtons">Vertical Buttons</f7-button>
      </p>
    </f7-block>
    <f7-block-title>Preloader Dialog</f7-block-title>
    <f7-block strong>
      <f7-row tag="p">
        <f7-button fill class="col" @click="openPreloader">Preloader</f7-button>
        <f7-button fill class="col" @click="openCustomPreloader">Custom Text</f7-button>
      </f7-row>
    </f7-block>
    <f7-block-title>Progress Dialog</f7-block-title>
    <f7-block strong>
      <f7-row tag="p">
        <f7-button fill class="col" @click="openInfiniteProgress">Infinite</f7-button>
        <f7-button fill class="col" @click="openDeterminedProgress">Determined</f7-button>
      </f7-row>
    </f7-block>
    <f7-block-title>Dialogs Stack</f7-block-title>
    <f7-block strong>
      <p>This feature doesn't allow to open multiple dialogs at the same time, and will automatically open next dialog when you close the current one. Such behavior is similar to browser native dialogs: </p>
      <p>
        <f7-button fill @click="openAlerts">Open Multiple Alerts</f7-button>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Button, f7Row } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Block,
      f7Button,
      f7Row,
    },
    methods: {
      openAlert() {
        const app = this.$f7;
        app.dialog.alert('Hello!');
      },
      openConfirm() {
        const app = this.$f7;
        app.dialog.confirm('Are you feel good today?', () => {
          app.dialog.alert('Great!');
        });
      },
      openPrompt() {
        const app = this.$f7;
        app.dialog.prompt('What is your name?', (name) => {
          app.dialog.confirm(`Are you sure that your name is ${name}?`, () => {
            app.dialog.alert(`Ok, your name is ${name}`);
          });
        });
      },
      openLogin() {
        const app = this.$f7;
        app.dialog.login('Enter your username and password', (username, password) => {
          app.dialog.alert(`Thank you!<br>Username:${username}<br>Password:${password}`);
        });
      },
      openPassword() {
        const app = this.$f7;
        app.dialog.password('Enter your username and password', (password) => {
          app.dialog.alert(`Thank you!<br>Password:${password}`);
        });
      },
      openAlerts() {
        const app = this.$f7;
        app.dialog.alert('Alert 1');
        app.dialog.alert('Alert 2');
        app.dialog.alert('Alert 3');
        app.dialog.alert('Alert 4');
        app.dialog.alert('Alert 5');
      },
      openVerticalButtons() {
        const app = this.$f7;
        app.dialog.create({
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
        }).open();
      },
      openPreloader() {
        const app = this.$f7;
        app.dialog.preloader();
        setTimeout(() => {
          app.dialog.close();
        }, 3000);
      },
      openCustomPreloader() {
        const app = this.$f7;
        app.dialog.preloader('My text...');
        setTimeout(() => {
          app.dialog.close();
        }, 3000);
      },
      openInfiniteProgress() {
        const app = this.$f7;
        app.dialog.progress();
        setTimeout(() => {
          app.dialog.close();
        }, 3000);
      },
      openDeterminedProgress() {
        const app = this.$f7;
        let progress = 0;
        const dialog = app.dialog.progress('Loading assets', progress);
        dialog.setText('Image 1 of 10');
        const interval = setInterval(() => {
          progress += 10;
          dialog.setProgress(progress);
          dialog.setText(`Image ${(progress) / 10} of 10`);
          if (progress === 100) {
            clearInterval(interval);
            dialog.close();
          }
        }, 300);
      },
    },
  };
</script>
