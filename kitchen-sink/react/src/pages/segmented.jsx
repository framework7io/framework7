import React, { useState } from 'react';
import { Navbar, Page, Block, Button, Segmented } from 'framework7-react';

export default () => {
  const [activeStrongButton, setActiveStrongButton] = useState(0);

  return (
    <Page>
      <Navbar title="Segmented" backLink="Back" />

      <Block strong outlineIos>
        <Segmented tag="p">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button active>Active</Button>
        </Segmented>
        <Segmented strong tag="p">
          <Button active={activeStrongButton === 0} onClick={() => setActiveStrongButton(0)}>
            Button
          </Button>
          <Button active={activeStrongButton === 1} onClick={() => setActiveStrongButton(1)}>
            Button
          </Button>
          <Button active={activeStrongButton === 2} onClick={() => setActiveStrongButton(2)}>
            Button
          </Button>
        </Segmented>
        <Segmented raised tag="p">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button active>Active</Button>
        </Segmented>
        <Segmented tag="p">
          <Button outline>Outline</Button>
          <Button outline>Outline</Button>
          <Button outline active>
            Active
          </Button>
        </Segmented>
        <Segmented raised round tag="p">
          <Button round>Button</Button>
          <Button round>Button</Button>
          <Button round active>
            Active
          </Button>
        </Segmented>
        <Segmented round tag="p">
          <Button round outline>
            Outline
          </Button>
          <Button round outline>
            Outline
          </Button>
          <Button round outline active>
            Active
          </Button>
        </Segmented>
      </Block>
    </Page>
  );
};
