import React from 'react';
import { Navbar, Page, Block, Row, Button } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page>
        <Navbar title="Statusbar Overlay" backLink="Back"></Navbar>
        <Block strong>
          <p>Framework7 automatically detects if your app in full screen mode, and automatically shows statusbar overlay if app is in full screen mode (or hides statusbar if app is not in full screen mode). Its visibility can be forced using app parameters or using API:</p>
          <Row tag="p">
            <Button fill className="col" onClick={this.showStatusbar.bind(this)}>Show Statusbar</Button>
            <Button fill className="col" onClick={this.hideStatusbar.bind(this)}>Hide Statusbar</Button>
          </Row>
        </Block>
      </Page>
    );
  }
  showStatusbar() {
    this.$f7.statusbar.show();
  }
  hideStatusbar() {
    this.$f7.statusbar.hide();
  }
};
