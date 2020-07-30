import React from 'react';
import { Navbar, Page, BlockTitle, Block, Button, Row, f7 } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page>
        <Navbar title="Dialog" backLink="Back"></Navbar>
        <Block strong>
          <p>There are 1:1 replacements of native Alert, Prompt and Confirm modals. They support callbacks, have very easy api and can be combined with each other. Check these examples:</p>
          <Row tag="p">
            <Button fill className="col" onClick={this.openAlert.bind(this)}>Alert</Button>
            <Button fill className="col" onClick={this.openConfirm.bind(this)}>Confirm</Button>
            <Button fill className="col" onClick={this.openPrompt.bind(this)}>Prompt</Button>
          </Row>
          <Row tag="p">
            <Button fill className="col" onClick={this.openLogin.bind(this)}>Login</Button>
            <Button fill className="col" onClick={this.openPassword.bind(this)}>Password</Button>
          </Row>
        </Block>
        <BlockTitle>Vertical Buttons</BlockTitle>
        <Block strong>
          <p>
            <Button fill onClick={this.openVerticalButtons.bind(this)}>Vertical Buttons</Button>
          </p>
        </Block>
        <BlockTitle>Preloader Dialog</BlockTitle>
        <Block strong>
          <Row tag="p">
            <Button fill className="col" onClick={this.openPreloader.bind(this)}>Preloader</Button>
            <Button fill className="col" onClick={this.openCustomPreloader.bind(this)}>Custom Text</Button>
          </Row>
        </Block>
        <BlockTitle>Progress Dialog</BlockTitle>
        <Block strong>
          <Row tag="p">
            <Button fill className="col" onClick={this.openInfiniteProgress.bind(this)}>Infinite</Button>
            <Button fill className="col" onClick={this.openDeterminedProgress.bind(this)}>Determined</Button>
          </Row>
        </Block>
        <BlockTitle>Dialogs Stack</BlockTitle>
        <Block strong>
          <p>This feature doesn't allow to open multiple dialogs at the same time, and will automatically open next dialog when you close the current one. Such behavior is similar to browser native dialogs: </p>
          <p>
            <Button fill onClick={this.openAlerts.bind(this)}>Open Multiple Alerts</Button>
          </p>
        </Block>
      </Page>
    );
  }
  openAlert() {
    f7.dialog.alert('Hello!');
  }
  openConfirm() {
    f7.dialog.confirm('Are you feel good today?', () => {
      f7.dialog.alert('Great!');
    });
  }
  openPrompt() {
    f7.dialog.prompt('What is your name?', (name) => {
      f7.dialog.confirm(`Are you sure that your name is ${name}?`, () => {
        f7.dialog.alert(`Ok, your name is ${name}`);
      });
    });
  }
  openLogin() {
    f7.dialog.login('Enter your username and password', (username, password) => {
      f7.dialog.alert(`Thank you!<br>Username:${username}<br>Password:${password}`);
    });
  }
  openPassword() {
    f7.dialog.password('Enter your username and password', (password) => {
      f7.dialog.alert(`Thank you!<br>Password:${password}`);
    });
  }
  openAlerts() {
    f7.dialog.alert('Alert 1');
    f7.dialog.alert('Alert 2');
    f7.dialog.alert('Alert 3');
    f7.dialog.alert('Alert 4');
    f7.dialog.alert('Alert 5');
  }
  openVerticalButtons() {
    f7.dialog.create({
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
  }
  openPreloader() {
    f7.dialog.preloader();
    setTimeout(() => {
      f7.dialog.close();
    }, 3000);
  }
  openCustomPreloader() {
    f7.dialog.preloader('My text...');
    setTimeout(() => {
      f7.dialog.close();
    }, 3000);
  }
  openInfiniteProgress() {
    f7.dialog.progress();
    setTimeout(() => {
      f7.dialog.close();
    }, 3000);
  }
  openDeterminedProgress() {
    let progress = 0;
    const dialog = f7.dialog.progress('Loading assets', progress);
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
  }
};
