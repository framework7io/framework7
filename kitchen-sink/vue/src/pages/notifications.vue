<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:beforeout="onPageBeforeOut">
    <f7-navbar title="Notifications" back-link="Back"></f7-navbar>
    <f7-block>
      <p>Framework7 comes with simple Notifications component that allows you to show some useful messages to user and request basic actions.</p>
      <p><f7-button fill @click="showNotificationFull">Full layout notification</f7-button></p>
      <p><f7-button fill @click="showNotificationWithButton">With close button</f7-button></p>
      <p><f7-button fill @click="showNotificationCloseOnClick">Click to close</f7-button></p>
      <p><f7-button fill @click="showNotificationCallbackOnClose">Callback on close</f7-button></p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Button,
      f7Block,
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
      onPageBeforeOut() {
        const self = this;
        self.$f7.notification.close();
      },
      onPageBeforeRemove() {
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
