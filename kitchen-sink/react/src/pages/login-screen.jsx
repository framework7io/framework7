import React from 'react';
import { Navbar, Page, LoginScreen, ListInput, List, ListItem, Block, Button, LoginScreenTitle, BlockFooter, ListButton } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginScreenOpened: false,
      username: '',
      password: '',
    };
  }
  render() {
    return (
      <Page>
        <Navbar title="Login Screen" backLink="Back"></Navbar>
        <Block>
          <p>Framework7 comes with ready to use Login Screen layout. It could be used inside of page or inside of popup (Embedded) or as a standalone overlay:</p>
        </Block>

        <List>
          <ListItem link="/login-screen-page/" title="As Separate Page"></ListItem>
        </List>

        <Block>
          <Button raised large fill loginScreenOpen=".demo-login-screen">As Overlay</Button>
        </Block>

        <Block>
          <Button raised large fill onClick={() => {this.setState({loginScreenOpened : true})}}>Open Via Prop Change</Button>
        </Block>

        <LoginScreen className="demo-login-screen" opened={this.state.loginScreenOpened} onLoginScreenClosed={() => {this.setState({loginScreenOpened : false})}}>
          <Page loginScreen>
            <LoginScreenTitle>Framework7</LoginScreenTitle>
            <List form>
              <ListInput
                label="Username"
                type="text"
                placeholder="Your username"
                value={this.state.username}
                onInput={(e) => {
                  this.setState({ username: e.target.value});
                }}
              />
              <ListInput
                label="Password"
                type="password"
                placeholder="Your password"
                value={this.state.password}
                onInput={(e) => {
                  this.setState({ password: e.target.value});
                }}
              />
            </List>
            <List>
              <ListButton onClick={this.signIn.bind(this)}>Sign In</ListButton>
              <BlockFooter>Some text about login information.<br />Lorem ipsum dolor sit amet, consectetur adipiscing elit.</BlockFooter>
            </List>
          </Page>
        </LoginScreen>
      </Page>
    )
  }
  signIn() {
    const self = this;
    const app = self.$f7;

    app.dialog.alert(`Username: ${self.state.username}<br>Password: ${self.state.password}`, () => {
      app.loginScreen.close();
    });
  }
};
