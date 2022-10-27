<script>
  import { f7, Navbar, Page, Block, Button } from 'framework7-svelte';

  let notificationFull;
  let notificationWithButton;
  let notificationCloseOnClick;
  let notificationCallbackOnClose;

  function showNotificationFull() {
    // Create notification
    if (!notificationFull) {
      notificationFull = f7.notification.create({
        icon: '<i class="icon icon-f7"></i>',
        title: 'Framework7',
        titleRightText: 'now',
        subtitle: 'This is a subtitle',
        text: 'This is a simple notification message',
        closeTimeout: 3000,
      });
    }
    // Open it
    notificationFull.open();
  }

  function showNotificationWithButton() {
    // Create notification
    if (!notificationWithButton) {
      notificationWithButton = f7.notification.create({
        icon: '<i class="icon icon-f7"></i>',
        title: 'Framework7',
        subtitle: 'Notification with close button',
        text: 'Click (x) button to close me',
        closeButton: true,
      });
    }
    // Open it
    notificationWithButton.open();
  }

  function showNotificationCloseOnClick() {
    // Create notification
    if (!notificationCloseOnClick) {
      notificationCloseOnClick = f7.notification.create({
        icon: '<i class="icon icon-f7"></i>',
        title: 'Framework7',
        titleRightText: 'now',
        subtitle: 'Notification with close on click',
        text: 'Click me to close',
        closeOnClick: true,
      });
    }
    // Open it
    notificationCloseOnClick.open();
  }

  function showNotificationCallbackOnClose() {
    // Create notification
    if (!notificationCallbackOnClose) {
      notificationCallbackOnClose = f7.notification.create({
        icon: '<i class="icon icon-f7"></i>',
        title: 'Framework7',
        titleRightText: 'now',
        subtitle: 'Notification with close on click',
        text: 'Click me to close',
        closeOnClick: true,
        on: {
          close() {
            f7.dialog.alert('Notification closed');
          },
        },
      });
    }
    // Open it
    notificationCallbackOnClose.open();
  }
  function onPageBeforeOut() {
    f7.notification.close();
  }
  function onPageBeforeRemove() {
    // Destroy notifications when page removed
    if (notificationFull) notificationFull.destroy();
    if (notificationWithButton) notificationWithButton.destroy();
    if (notificationCloseOnClick) notificationCloseOnClick.destroy();
    if (notificationCallbackOnClose) notificationCallbackOnClose.destroy();
  }
</script>

<Page {onPageBeforeOut} {onPageBeforeRemove}>
  <Navbar title="Notifications" backLink="Back" />
  <Block strongIos outlineIos>
    <p>
      Framework7 comes with simple Notifications component that allows you to show some useful
      messages to user and request basic actions.
    </p>
    <p>
      <Button fill onClick={showNotificationFull}>Full layout notification</Button>
    </p>
    <p>
      <Button fill onClick={showNotificationWithButton}>With close button</Button>
    </p>
    <p>
      <Button fill onClick={showNotificationCloseOnClick}>Click to close</Button>
    </p>
    <p>
      <Button fill onClick={showNotificationCallbackOnClose}>Callback on close</Button>
    </p>
  </Block>
</Page>
