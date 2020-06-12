import React from 'react';
import { Navbar, Page, BlockTitle, Block, Button, Row } from 'framework7-react';

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
    const app = this.$f7;
    app.dialog.alert('Hello!');
  }
  openConfirm() {
    const app = this.$f7;
    app.dialog.confirm('Are you feel good today?', () => {
      app.dialog.alert('Great!');
    });
  }
  openPrompt() {
    const app = this.$f7;
    app.dialog.prompt('What is your name?', (name) => {
      app.dialog.confirm(`Are you sure that your name is ${name}?`, () => {
        app.dialog.alert(`Ok, your name is ${name}`);
      });
    });
  }
  openLogin() {
    const app = this.$f7;
    app.dialog.login('Enter your username and password', (username, password) => {
      app.dialog.alert(`Thank you!<br>Username:${username}<br>Password:${password}`);
    });
  }
  openPassword() {
    const app = this.$f7;
    app.dialog.password('Enter your username and password', (password) => {
      app.dialog.alert(`Thank you!<br>Password:${password}`);
    });
  }
  openAlerts() {
    const app = this.$f7;
    app.dialog.alert('Alert 1');
    app.dialog.alert('Alert 2');
    app.dialog.alert('Alert 3');
    app.dialog.alert('Alert 4');
    app.dialog.alert('Alert 5');
  }
  openVerticalButtons() {
    const app = this.$f7;
    app.dialog.create({
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
    const app = this.$f7;
    app.dialog.preloader();
    setTimeout(() => {
      app.dialog.close();
    }, 3000);
  }
  openCustomPreloader() {
    const app = this.$f7;
    app.dialog.preloader('My text...');
    setTimeout(() => {
      app.dialog.close();
    }, 3000);
  }
  openInfiniteProgress() {
    const app = this.$f7;
    app.dialog.progress();
    setTimeout(() => {
      app.dialog.close();
    }, 3000);
  }
  openDeterminedProgress() {
    const app = this.$f7;
    let progress = 0;
    const dialog = app.dialog.progress('Loading assets', progress);
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
