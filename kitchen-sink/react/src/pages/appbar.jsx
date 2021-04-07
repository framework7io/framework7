import React, { useState } from 'react';
import { Page, Navbar, Block, Button, f7 } from 'framework7-react';

let appbarEnabledCache = false;

export default () => {
  const [appbarEnabled, setAppbarEnabled] = useState(appbarEnabledCache);

  const enableAppbar = () => {
    setAppbarEnabled(true);
    appbarEnabledCache = true;
    f7.$el.prepend(`
    <div class="appbar">
      <div class="appbar-inner">
        <div class="left">
          <a href="#" class="button button-small panel-toggle display-flex" data-panel="left">
            <i class="f7-icons">bars</i>
          </a>
          <a href="#" class="button button-small display-flex margin-left-half">
            <i class="f7-icons">square_list</i>
          </a>
          <a href="#" class="button button-small display-flex margin-left-half">
            <i class="f7-icons">arrowshape_turn_up_left_fill</i>
          </a>
          <a href="#" class="button button-small display-flex margin-left-half">
            <i class="f7-icons">arrowshape_turn_up_right_fill</i>
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
  };
  const disableAppbar = () => {
    setAppbarEnabled(false);
    appbarEnabledCache = false;
    f7.$('.appbar').remove();
  };
  const toggleAppbar = () => {
    if (appbarEnabled) {
      disableAppbar();
    } else {
      enableAppbar();
    }
  };
  return (
    <Page>
      <Navbar title="Appbar" backLink="Back" />
      <Block strong>
        <p>
          Appbar is the main app bar with actions on top of the whole app. It is designed to be used
          in desktop apps with Aurora theme.
        </p>
      </Block>
      <Block strong>
        <Button fill onClick={() => toggleAppbar()}>
          Toggle Appbar
        </Button>
      </Block>
    </Page>
  );
};
