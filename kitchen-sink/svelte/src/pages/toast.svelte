<script>
  import { f7, theme, Navbar, Page, Block, Button } from 'framework7-svelte';

  let toastBottom;
  let toastTop;
  let toastCenter;
  let toastIcon;
  let toastLargeMessage;
  let toastWithButton;
  let toastWithCustomButton;
  let toastWithCallback;

  function showToastBottom() {
    // Create toast
    if (toastBottom) {
      toastBottom = f7.toast.create({
        text: 'This is default bottom positioned toast',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastBottom.open();
  }
  function showToastTop() {
    // Create toast
    if (!toastTop) {
      toastTop = f7.toast.create({
        text: 'Top positioned toast',
        position: 'top',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastTop.open();
  }
  function showToastCenter() {
    // Create toast
    if (!toastCenter) {
      toastCenter = f7.toast.create({
        text: "I'm on center",
        position: 'center',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastCenter.open();
  }
  function showToastIcon() {
    // Create toast
    if (!toastIcon) {
      toastIcon = f7.toast.create({
        icon: theme.ios
          ? '<i class="f7-icons">star_fill</i>'
          : '<i class="material-icons">star</i>',
        text: "I'm on center",
        position: 'center',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastIcon.open();
  }
  function showToastLargeMessage() {
    // Create toast
    if (!toastLargeMessage) {
      toastLargeMessage = f7.toast.create({
        text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quae, ab. Delectus amet optio facere autem sapiente quisquam beatae culpa dolore.',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastLargeMessage.open();
  }
  function showToastWithButton() {
    // Create toast
    if (!toastWithButton) {
      toastWithButton = f7.toast.create({
        text: 'Toast with additional close button',
        closeButton: true,
      });
    }
    // Open it
    toastWithButton.open();
  }
  function showToastWithCustomButton() {
    // Create toast
    if (!toastWithCustomButton) {
      toastWithCustomButton = f7.toast.create({
        text: 'Custom close button',
        closeButton: true,
        closeButtonText: 'Close Me',
        closeButtonColor: 'red',
      });
    }
    // Open it
    toastWithCustomButton.open();
  }
  function showToastWithCallback() {
    // Create toast
    if (!toastWithCallback) {
      toastWithCallback = f7.toast.create({
        text: 'Callback on close',
        closeButton: true,
        on: {
          close() {
            f7.dialog.alert('Toast closed');
          },
        },
      });
    }
    // Open it
    toastWithCallback.open();
  }

  function onPageBeforeOut() {
    f7.toast.close();
  }

  function onPageBeforeRemove() {
    // Destroy toasts when page removed
    if (toastBottom) toastBottom.destroy();
    if (toastTop) toastTop.destroy();
    if (toastCenter) toastCenter.destroy();
    if (toastIcon) toastIcon.destroy();
    if (toastLargeMessage) toastLargeMessage.destroy();
    if (toastWithButton) toastWithButton.destroy();
    if (toastWithCustomButton) toastWithCustomButton.destroy();
    if (toastWithCallback) toastWithCallback.destroy();
  }
</script>

<Page {onPageBeforeRemove} {onPageBeforeOut}>
  <Navbar title="Toast" backLink="Back" />
  <Block strongIos outlineIos>
    <p>Toasts provide brief feedback about an operation through a message on the screen.</p>
    <p>
      <Button fill onClick={showToastBottom}>Toast on Bottom</Button>
    </p>
    <p>
      <Button fill onClick={showToastTop}>Toast on Top</Button>
    </p>
    <p>
      <Button fill onClick={showToastCenter}>Toast on Center</Button>
    </p>
    <p>
      <Button fill onClick={showToastIcon}>Toast with icon</Button>
    </p>
    <p>
      <Button fill onClick={showToastLargeMessage}>Toast with large message</Button>
    </p>
    <p>
      <Button fill onClick={showToastWithButton}>Toast with close button</Button>
    </p>
    <p>
      <Button fill onClick={showToastWithCustomButton}>Toast with custom button</Button>
    </p>
    <p>
      <Button fill onClick={showToastWithCallback}>Toast with callback on close</Button>
    </p>
  </Block>
</Page>
