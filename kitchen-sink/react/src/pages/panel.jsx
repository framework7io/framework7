import React from 'react';
import { Navbar, Page, Block, Button, Link, Panel } from 'framework7-react';

export default () => (
  <Page id="panel-page">
    <Navbar title="Panel / Side panels" backLink="Back"></Navbar>
    <Panel left cover containerEl="#panel-page" id="panel-nested">
      <Page>
        <Block strongIos outlineIos>
          <p>This is page-nested Panel.</p>
          <p>
            <Link panelClose>Close me</Link>
          </p>
        </Block>
      </Page>
    </Panel>
    <Block strongIos outlineIos>
      <p>
        Framework7 comes with 2 panels (on left and on right), both are optional. You can put
        absolutely anything inside: data lists, forms, custom content, and even other isolated app
        view (like in right panel now) with its own dynamic navbar.
      </p>
    </Block>
    <Block strongIos outlineIos>
      <p className="grid grid-cols-2 grid-gap">
        <Button raised fill panelOpen="left">
          Open left panel
        </Button>
        <Button raised fill panelOpen="right">
          Open right panel
        </Button>
      </p>
      <p>
        <Button raised fill panelOpen="#panel-nested">
          Open nested panel
        </Button>
      </p>
    </Block>
  </Page>
);
