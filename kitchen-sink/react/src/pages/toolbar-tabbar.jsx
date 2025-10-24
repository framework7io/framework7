import React, { useState } from 'react';
import {
  Navbar,
  Page,
  Toolbar,
  List,
  ListItem,
  Button,
  Link,
  BlockTitle,
  Block,
  ToolbarPane,
} from 'framework7-react';

export default () => {
  const [toolbarPosition, setToolbarPosition] = useState('bottom');

  const toggleToolbarPosition = () => {
    setToolbarPosition(toolbarPosition === 'top' ? 'bottom' : 'top');
  };

  return (
    <Page>
      <Navbar title="Toolbar & Tabbar" backLink></Navbar>
      <Toolbar position={toolbarPosition}>
        <ToolbarPane>
          <Link>Left Link</Link>
          <Link>Right Link</Link>
        </ToolbarPane>
      </Toolbar>
      {/* example-hidden-start */}
      <List inset strong dividersIos className="example-hidden">
        <ListItem link="./tabbar/" title="Tabbar" />
        <ListItem link="./tabbar-icons/" title="Tabbar With Icons" />
        <ListItem link="./tabbar-scrollable/" title="Tabbar Scrollable" />
        <ListItem link="./toolbar-hide-scroll/" title="Hide Toolbar On Scroll" />
      </List>
      {/* example-hidden-end */}
      <BlockTitle>Toolbar Position</BlockTitle>
      <Block strong inset>
        <p>
          Toolbar supports both top and bottom positions. Click the following button to change its
          position.
        </p>
        <p>
          <Button
            fill
            round
            onClick={() => {
              toggleToolbarPosition();
            }}
          >
            Toggle Toolbar Position
          </Button>
        </p>
      </Block>
    </Page>
  );
};
