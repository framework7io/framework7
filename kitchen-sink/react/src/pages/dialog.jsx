import React from 'react';
import { Navbar, Page, BlockTitle, Block, Button, f7 } from 'framework7-react';

export default () => {
  const openAlert = () => {
    f7.dialog.alert('Hello!');
  };
  const openConfirm = () => {
    f7.dialog.confirm('Are you feel good today?', () => {
      f7.dialog.alert('Great!');
    });
  };
  const openPrompt = () => {
    f7.dialog.prompt('What is your name?', (name) => {
      f7.dialog.confirm(`Are you sure that your name is ${name}?`, () => {
        f7.dialog.alert(`Ok, your name is ${name}`);
      });
    });
  };
  const openLogin = () => {
    f7.dialog.login('Enter your username and password', (username, password) => {
      f7.dialog.alert(`Thank you!<br>Username:${username}<br>Password:${password}`);
    });
  };
  const openPassword = () => {
    f7.dialog.password('Enter your password', (password) => {
      f7.dialog.alert(`Thank you!<br>Password:${password}`);
    });
  };
  const openAlerts = () => {
    f7.dialog.alert('Alert 1');
    f7.dialog.alert('Alert 2');
    f7.dialog.alert('Alert 3');
    f7.dialog.alert('Alert 4');
    f7.dialog.alert('Alert 5');
  };
  const openVerticalButtons = () => {
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
  };
  const openPreloader = () => {
    f7.dialog.preloader();
    setTimeout(() => {
      f7.dialog.close();
    }, 3000);
  };
  const openCustomPreloader = () => {
    f7.dialog.preloader('My text...');
    setTimeout(() => {
      f7.dialog.close();
    }, 3000);
  };
  const openInfiniteProgress = () => {
    f7.dialog.progress();
    setTimeout(() => {
      f7.dialog.close();
    }, 3000);
  };
  const openDeterminedProgress = () => {
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
  };
  return (
    <Page>
      <Navbar title="Dialog" backLink="Back"></Navbar>
      <Block strongIos outlineIos>
        <p>
          There are 1:1 replacements of native Alert, Prompt and Confirm modals. They support
          callbacks, have very easy api and can be combined with each other. Check these examples:
        </p>
        <p className="grid grid-cols-3 grid-gap">
          <Button fill onClick={openAlert}>
            Alert
          </Button>
          <Button fill onClick={openConfirm}>
            Confirm
          </Button>
          <Button fill onClick={openPrompt}>
            Prompt
          </Button>
        </p>
        <p className="grid grid-cols-3 grid-gap">
          <Button fill onClick={openLogin}>
            Login
          </Button>
          <Button fill onClick={openPassword}>
            Password
          </Button>
        </p>
      </Block>
      <BlockTitle>Vertical Buttons</BlockTitle>
      <Block strongIos outlineIos>
        <p>
          <Button fill onClick={openVerticalButtons}>
            Vertical Buttons
          </Button>
        </p>
      </Block>
      <BlockTitle>Preloader Dialog</BlockTitle>
      <Block strongIos outlineIos>
        <p className="grid grid-cols-2 grid-gap">
          <Button fill onClick={openPreloader}>
            Preloader
          </Button>
          <Button fill onClick={openCustomPreloader}>
            Custom Text
          </Button>
        </p>
      </Block>
      <BlockTitle>Progress Dialog</BlockTitle>
      <Block strongIos outlineIos>
        <p className="grid grid-cols-2 grid-gap">
          <Button fill onClick={openInfiniteProgress}>
            Infinite
          </Button>
          <Button fill onClick={openDeterminedProgress}>
            Determined
          </Button>
        </p>
      </Block>
      <BlockTitle>Dialogs Stack</BlockTitle>
      <Block strongIos outlineIos>
        <p>
          This feature doesn't allow to open multiple dialogs at the same time, and will
          automatically open next dialog when you close the current one. Such behavior is similar to
          browser native dialogs:{' '}
        </p>
        <p>
          <Button fill onClick={openAlerts}>
            Open Multiple Alerts
          </Button>
        </p>
      </Block>
    </Page>
  );
};
