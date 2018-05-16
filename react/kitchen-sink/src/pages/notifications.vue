<template>
  <Page>
    <Navbar title="Notifications" backLink="Back"></Navbar>
    <Block>
      <p>Framework7 comes with simple Notifications component that allows you to show some useful messages to user and request basic actions.</p>
      <p><Button raised onClick={showNotificationFull}>Full layout notification</Button></p>
      <p><Button raised onClick={showNotificationWithButton}>With close button</Button></p>
      <p><Button raised onClick={showNotificationCloseOnClick}>Click to close</Button></p>
      <p><Button raised onClick={showNotificationCallbackOnClose}>Callback on close</Button></p>
    </Block>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, Block, Button } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      Button,
      Block,
    },
    methods: {
      showNotificationFull() {
        const self = this;
        // Create toast
        if (!self.notificationFull) {
          self.notificationFull = self.$f7.notification.create({
            icon: '<i class="icon icon-f7"></i>',
            title: 'Framework7',
            titleRightText: 'now',
            subtitle: 'This is a subtitle',
            text: 'This is a simple notification message',
            closeTimeout: 3000,
          });
        }
        // Open it
        self.notificationFull.open();
      },
      showNotificationWithButton() {
        const self = this;
        // Create toast
        if (!self.notificationWithButton) {
          self.notificationWithButton = self.$f7.notification.create({
            icon: '<i class="icon icon-f7"></i>',
            title: 'Framework7',
            subtitle: 'Notification with close button',
            text: 'Click (x) button to close me',
            closeButton: true,
          });
        }
        // Open it
        self.notificationWithButton.open();
      },
      showNotificationCloseOnClick() {
        const self = this;
        // Create toast
        if (!self.notificationCloseOnClick) {
          self.notificationCloseOnClick = self.$f7.notification.create({
            icon: '<i class="icon icon-f7"></i>',
            title: 'Framework7',
            titleRightText: 'now',
            subtitle: 'Notification with close on click',
            text: 'Click me to close',
            closeOnClick: true,
          });
        }
        // Open it
        self.notificationCloseOnClick.open();
      },
      showNotificationCallbackOnClose() {
        const self = this;
        // Create toast
        if (!self.notificationCallbackOnClose) {
          self.notificationCallbackOnClose = self.$f7.notification.create({
            icon: '<i class="icon icon-f7"></i>',
            title: 'Framework7',
            titleRightText: 'now',
            subtitle: 'Notification with close on click',
            text: 'Click me to close',
            closeOnClick: true,
            on: {
              close() {
                self.$f7.dialog.alert('Notification closed');
              },
            },
          });
        }
        // Open it
        self.notificationCallbackOnClose.open();
      },
    },
    on: {
      pageBeforeOut() {
        const self = this;
        self.$f7.notification.close();
      },
      pageBeforeRemove() {
        const self = this;
        // Destroy toasts when page removed
        if (self.notificationFull) self.notificationFull.destroy();
        if (self.notificationWithButton) self.notificationWithButton.destroy();
        if (self.notificationCloseOnClick) self.notificationCloseOnClick.destroy();
        if (self.notificationCallbackOnClose) self.notificationCallbackOnClose.destroy();
      },
    },
  };
</script>
