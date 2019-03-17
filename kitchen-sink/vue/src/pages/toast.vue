<template>
  <f7-page  @page:beforeremove="onPageBeforeRemove" @page:beforeout="onPageBeforeOut">
    <f7-navbar title="Toast" back-link="Back"></f7-navbar>
    <f7-block>
      <p>Toasts provide brief feedback about an operation through a message on the screen.</p>
      <p>
        <f7-button fill @click="showToastBottom">Toast on Bottom</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastTop">Toast on Top</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastCenter">Toast on Center</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastIcon">Toast with icon</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastLargeMessage">Toast with large message</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastWithButton">Toast with close button</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastWithCustomButton">Toast with custom button</f7-button>
      </p>
      <p>
        <f7-button fill @click="showToastWithCallback">Toast with callback on close</f7-button>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7Block, f7Button,
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
            icon: self.$theme.ios || self.$theme.aurora ? '<i class="f7-icons">star_fill</i>' : '<i class="material-icons">star</i>',
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
      onPageBeforeOut() {
        const self = this;
        self.$f7.toast.close();
      },
      onPageBeforeRemove() {
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
