import React from 'react';
import { Page, Navbar, Block, Button } from 'framework7-react';

var appbarEnabled = false;

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      appbarEnabled,
    };
  }
  enableAppbar () {
    var self = this;
    self.setState({appbarEnabled: true});
    appbarEnabled = true;
    self.$f7.root.prepend(`
    <div class="appbar">
      <div class="appbar-inner">
        <div class="left">
          <a href="#" class="button button-small panel-toggle display-flex" data-panel="left">
            <i class="f7-icons">bars</i>
          </a>
          <a href="#" class="button button-small display-flex margin-left-half">
            <i class="f7-icons">list</i>
          </a>
          <a href="#" class="button button-small display-flex margin-left-half">
            <i class="f7-icons">reply_fill</i>
          </a>
          <a href="#" class="button button-small display-flex margin-left-half">
            <i class="f7-icons">forward_fill</i>
          </a>
        </div>
        <div class="right">
          <div class="searchbar searchbar-inline">
            <div class="searchbar-input-wrap">
              <input type="text" placeholder="Search app">
              <i class="searchbar-icon"></i>
              <div class="input-clear-button"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
    `);
  }
  disableAppbar () {
    var self = this;
    self.setState({appbarEnabled: false});
    appbarEnabled = false;
    self.$$('.appbar').remove();
  }
  toggleAppbar () {
    var self = this;
    if (self.state.appbarEnabled) {
      self.disableAppbar();
    } else {
      self.enableAppbar();
    }
  }
  render() {
    return (
      <Page>
        <Navbar title="Appbar" backLink="Back" />
        <Block strong>
          <p>Appbar is the main app bar with actions on top of the whole app. It is designed to be used in desktop apps with Aurora theme.</p>
        </Block>
        <Block strong>
          <Button fill onClick={() => this.toggleAppbar()}>Toggle Appbar</Button>
        </Block>
      </Page>
    )
  }
};
