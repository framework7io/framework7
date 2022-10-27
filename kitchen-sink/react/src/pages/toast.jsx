import React, { useRef } from 'react';
import { Navbar, Page, Block, Button, theme, f7 } from 'framework7-react';

export default () => {
  const toastBottom = useRef(null);
  const toastTop = useRef(null);
  const toastCenter = useRef(null);
  const toastIcon = useRef(null);
  const toastLargeMessage = useRef(null);
  const toastWithButton = useRef(null);
  const toastWithCustomButton = useRef(null);
  const toastWithCallback = useRef(null);

  const showToastBottom = () => {
    // Create toast
    if (!toastBottom.current) {
      toastBottom.current = f7.toast.create({
        text: 'This is default bottom positioned toast',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastBottom.current.open();
  };
  const showToastTop = () => {
    // Create toast
    if (!toastTop.current) {
      toastTop.current = f7.toast.create({
        text: 'Top positioned toast',
        position: 'top',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastTop.current.open();
  };
  const showToastCenter = () => {
    // Create toast
    if (!toastCenter.current) {
      toastCenter.current = f7.toast.create({
        text: "I'm on center",
        position: 'center',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastCenter.current.open();
  };
  const showToastIcon = () => {
    // Create toast
    if (!toastIcon.current) {
      toastIcon.current = f7.toast.create({
        icon: theme.ios
          ? '<i class="f7-icons">star_fill</i>'
          : '<i class="material-icons">star</i>',
        text: "I'm on center",
        position: 'center',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastIcon.current.open();
  };
  const showToastLargeMessage = () => {
    // Create toast
    if (!toastLargeMessage.current) {
      toastLargeMessage.current = f7.toast.create({
        text: 'This toast contains a lot of text. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, quae, ab. Delectus amet optio facere autem sapiente quisquam beatae culpa dolore.',
        closeTimeout: 2000,
      });
    }
    // Open it
    toastLargeMessage.current.open();
  };
  const showToastWithButton = () => {
    // Create toast
    if (!toastWithButton.current) {
      toastWithButton.current = f7.toast.create({
        text: 'Toast with additional close button',
        closeButton: true,
      });
    }
    // Open it
    toastWithButton.current.open();
  };
  const showToastWithCustomButton = () => {
    // Create toast
    if (!toastWithCustomButton.current) {
      toastWithCustomButton.current = f7.toast.create({
        text: 'Custom close button',
        closeButton: true,
        closeButtonText: 'Close Me',
        closeButtonColor: 'red',
      });
    }
    // Open it
    toastWithCustomButton.current.open();
  };
  const showToastWithCallback = () => {
    // Create toast
    if (!toastWithCallback.current) {
      toastWithCallback.current = f7.toast.create({
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
    toastWithCallback.current.open();
  };
  const onPageBeforeOut = () => {
    f7.toast.close();
  };
  const onPageBeforeRemove = () => {
    // Destroy toasts when page removed
    if (toastBottom.current) toastBottom.current.destroy();
    if (toastTop.current) toastTop.current.destroy();
    if (toastCenter.current) toastCenter.current.destroy();
    if (toastIcon.current) toastIcon.current.destroy();
    if (toastLargeMessage.current) toastLargeMessage.current.destroy();
    if (toastWithButton.current) toastWithButton.current.destroy();
    if (toastWithCustomButton.current) toastWithCustomButton.current.destroy();
    if (toastWithCallback.current) toastWithCallback.current.destroy();
  };

  return (
    <Page onPageBeforeRemove={onPageBeforeRemove} onPageBeforeOut={onPageBeforeOut}>
      <Navbar title="Toast" backLink="Back"></Navbar>
      <Block strongIos outlineIos>
        <p>Toasts provide brief feedback about an operation through a message on the screen.</p>
        <p>
          <Button fill onClick={showToastBottom}>
            Toast on Bottom
          </Button>
        </p>
        <p>
          <Button fill onClick={showToastTop}>
            Toast on Top
          </Button>
        </p>
        <p>
          <Button fill onClick={showToastCenter}>
            Toast on Center
          </Button>
        </p>
        <p>
          <Button fill onClick={showToastIcon}>
            Toast with icon
          </Button>
        </p>
        <p>
          <Button fill onClick={showToastLargeMessage}>
            Toast with large message
          </Button>
        </p>
        <p>
          <Button fill onClick={showToastWithButton}>
            Toast with close button
          </Button>
        </p>
        <p>
          <Button fill onClick={showToastWithCustomButton}>
            Toast with custom button
          </Button>
        </p>
        <p>
          <Button fill onClick={showToastWithCallback}>
            Toast with callback on close
          </Button>
        </p>
      </Block>
    </Page>
  );
};
