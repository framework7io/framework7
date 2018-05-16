<template>
  <Page>
    <Navbar title="Toast" backLink="Back"></Navbar>
    <Block>
      <p>Toasts provide brief feedback about an operation through a message on the screen.</p>
      <p>
        <Button raised onClick={showToastBottom}>Toast on Bottom</Button>
      </p>
      <p>
        <Button raised onClick={showToastTop}>Toast on Top</Button>
      </p>
      <p>
        <Button raised onClick={showToastCenter}>Toast on Center</Button>
      </p>
      <p>
        <Button raised onClick={showToastIcon}>Toast with icon</Button>
      </p>
      <p>
        <Button raised onClick={showToastLargeMessage}>Toast with large message</Button>
      </p>
      <p>
        <Button raised onClick={showToastWithButton}>Toast with close button</Button>
      </p>
      <p>
        <Button raised onClick={showToastWithCustomButton}>Toast with custom button</Button>
      </p>
      <p>
        <Button raised onClick={showToastWithCallback}>Toast with callback on close</Button>
      </p>
    </Block>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, Block, Button } from 'framework7-react';

  export default {
    components: {
      Navbar, Page, Block, Button,
    },
    methods: {
      showToastBottom() {
        const self = this;
        // Create toast
        if (!self.toastBottom) {
          self.toastBottom = self.$f7.toast.create({
            text: 'This is default bottom positioned toast',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastBottom.open();
      },
      showToastTop() {
        const self = this;
        // Create toast
        if (!self.toastTop) {
          self.toastTop = self.$f7.toast.create({
            text: 'Top positioned toast',
            position: 'top',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastTop.open();
      },
      showToastCenter() {
        const self = this;
        // Create toast
        if (!self.toastCenter) {
          self.toastCenter = self.$f7.toast.create({
            text: 'I\'m on center',
            position: 'center',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastCenter.open();
      },
      showToastIcon() {
        const self = this;
        // Create toast
        if (!self.toastIcon) {
          self.toastIcon = self.$f7.toast.create({
            icon: self.$theme.ios ? '<i class="f7-icons">start</i>' : '<i class="material-icons">start</i>',
            text: 'I\'m on center',
            position: 'center',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastIcon.open();
      },
      showToastLargeMessage() {
        const self = this;
        // Create toast
        if (!self.toastLargeMessage) {
          self.toastLargeMessage = self.$f7.toast.create({
            text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quae, ab. Delectus amet optio facere autem sapiente quisquam beatae culpa dolore.',
            closeTimeout: 2000,
          });
        }
        // Open it
        self.toastLargeMessage.open();
      },
      showToastWithButton() {
        const self = this;
        // Create toast
        if (!self.toastWithButton) {
          self.toastWithButton = self.$f7.toast.create({
            text: 'Toast with additional close button',
            closeButton: true,
          });
        }
        // Open it
        self.toastWithButton.open();
      },
      showToastWithCustomButton() {
        const self = this;
        // Create toast
        if (!self.toastWithCustomButton) {
          self.toastWithCustomButton = self.$f7.toast.create({
            text: 'Custom close button',
            closeButton: true,
            closeButtonText: 'Close Me',
            closeButtonColor: 'red',
          });
        }
        // Open it
        self.toastWithCustomButton.open();
      },
      showToastWithCallback() {
        const self = this;
        // Create toast
        if (!self.toastWithCallback) {
          self.toastWithCallback = self.$f7.toast.create({
            text: 'Callback on close',
            closeButton: true,
            on: {
              close() {
                self.$f7.dialog.alert('Toast closed');
              },
            },
          });
        }
        // Open it
        self.toastWithCallback.open();
      },
    },
    on: {
      pageBeforeOut() {
        const self = this;
        self.$f7.toast.close();
      },
      pageBeforeRemove() {
        const self = this;
        // Destroy toasts when page removed
        if (self.toastBottom) self.toastBottom.destroy();
        if (self.toastTop) self.toastTop.destroy();
        if (self.toastCenter) self.toastCenter.destroy();
        if (self.toastIcon) self.toastIcon.destroy();
        if (self.toastLargeMessage) self.toastLargeMessage.destroy();
        if (self.toastWithButton) self.toastWithButton.destroy();
        if (self.toastWithCustomButton) self.toastWithCustomButton.destroy();
        if (self.toastWithCallback) self.toastWithCallback.destroy();
      },
    },
  };
</script>
