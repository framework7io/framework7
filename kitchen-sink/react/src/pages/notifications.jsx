import React from 'react';
import { Navbar, Page, Block, Button } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page onPageBeforeOut={this.onPageBeforeOut.bind(this)} onPageBeforeRemove={this.onPageBeforeRemove.bind(this)}>
        <Navbar title="Notifications" backLink="Back"></Navbar>
        <Block>
          <p>Framework7 comes with simple Notifications component that allows you to show some useful messages to user and request basic actions.</p>
          <p><Button fill onClick={this.showNotificationFull.bind(this)}>Full layout notification</Button></p>
          <p><Button fill onClick={this.showNotificationWithButton.bind(this)}>With close button</Button></p>
          <p><Button fill onClick={this.showNotificationCloseOnClick.bind(this)}>Click to close</Button></p>
          <p><Button fill onClick={this.showNotificationCallbackOnClose.bind(this)}>Callback on close</Button></p>
        </Block>
      </Page>
    )
  }
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
  }
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
  }
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
  }
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
  }
  onPageBeforeOut() {
    const self = this;
    self.$f7.notification.close();
  }
  onPageBeforeRemove() {
    const self = this;
    // Destroy toasts when page removed
    if (self.notificationFull) self.notificationFull.destroy();
    if (self.notificationWithButton) self.notificationWithButton.destroy();
    if (self.notificationCloseOnClick) self.notificationCloseOnClick.destroy();
    if (self.notificationCallbackOnClose) self.notificationCallbackOnClose.destroy();
  }
};