import React, { useState } from 'react';
import { Navbar, Page, BlockTitle, Block, Button } from 'framework7-react';

export default () => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const load1 = () => {
    if (isLoading1) return;
    setIsLoading1(true);
    setTimeout(() => {
      setIsLoading1(false);
    }, 4000);
  };
  const load2 = () => {
    if (isLoading2) return;
    setIsLoading2(true);
    setTimeout(() => {
      setIsLoading2(false);
    }, 4000);
  };

  return (
    <Page>
      <Navbar title="Buttons" backLink="Back" />

      <BlockTitle>Usual Buttons</BlockTitle>
      <Block strong outlineIos>
        <div className="grid grid-cols-3 grid-gap">
          <Button>Button</Button>
          <Button>Button</Button>
          <Button round>Round</Button>
        </div>
      </Block>

      <BlockTitle>Tonal Buttons</BlockTitle>
      <Block strong outlineIos>
        <div className="grid grid-cols-3 grid-gap">
          <Button tonal>Button</Button>
          <Button tonal>Button</Button>
          <Button tonal round>
            Round
          </Button>
        </div>
      </Block>

      <BlockTitle>Fill Buttons</BlockTitle>
      <Block strong outlineIos>
        <div className="grid grid-cols-3 grid-gap">
          <Button fill>Button</Button>
          <Button fill>Button</Button>
          <Button fill round>
            Round
          </Button>
        </div>
      </Block>

      <BlockTitle>Outline Buttons</BlockTitle>
      <Block strong outlineIos>
        <div className="grid grid-cols-3 grid-gap">
          <Button outline>Button</Button>
          <Button outline>Button</Button>
          <Button outline round>
            Round
          </Button>
        </div>
      </Block>

      <BlockTitle>Raised Buttons</BlockTitle>
      <Block strong outlineIos>
        <p className="grid grid-cols-3 grid-gap">
          <Button raised>Button</Button>
          <Button raised fill>
            Fill
          </Button>
          <Button raised outline>
            Outline
          </Button>
        </p>
        <p className="grid grid-cols-3 grid-gap">
          <Button raised round>
            Round
          </Button>
          <Button raised fill round>
            Fill
          </Button>
          <Button raised outline round>
            Outline
          </Button>
        </p>
      </Block>

      <BlockTitle>Large Buttons</BlockTitle>
      <Block strong outlineIos>
        <p className="grid grid-cols-2 grid-gap">
          <Button large>Button</Button>
          <Button large fill>
            Fill
          </Button>
        </p>
        <p className="grid grid-cols-2 grid-gap">
          <Button large raised>
            Raised
          </Button>
          <Button large raised fill>
            Raised Fill
          </Button>
        </p>
      </Block>

      <BlockTitle>Small Buttons</BlockTitle>
      <Block strong outlineIos>
        <p className="grid grid-cols-3 grid-gap">
          <Button small>Button</Button>
          <Button small outline>
            Outline
          </Button>
          <Button small fill>
            Fill
          </Button>
        </p>
        <p className="grid grid-cols-3 grid-gap">
          <Button small round>
            Button
          </Button>
          <Button small outline round>
            Outline
          </Button>
          <Button small fill round>
            Fill
          </Button>
        </p>
      </Block>

      <BlockTitle>Preloader Buttons</BlockTitle>
      <Block strong outlineIos>
        <p className="grid grid-cols-2 grid-gap">
          <Button preloader loading={isLoading1} onClick={load1} large>
            Load
          </Button>
          <Button preloader loading={isLoading2} onClick={load2} large fill>
            Load
          </Button>
        </p>
      </Block>

      <BlockTitle>Color Buttons</BlockTitle>
      <Block strong outlineIos>
        <div className="grid grid-cols-3 grid-gap">
          <Button color="red">Red</Button>
          <Button color="green">Green</Button>
          <Button color="blue">Blue</Button>
        </div>
      </Block>

      <BlockTitle>Color Fill Buttons</BlockTitle>
      <Block strong outlineIos>
        <p className="grid grid-cols-3 grid-gap">
          <Button color="red">Red</Button>
          <Button color="green">Green</Button>
          <Button color="blue">Blue</Button>
        </p>
        <p className="grid grid-cols-3 grid-gap">
          <Button color="pink">Pink</Button>
          <Button color="yellow">Yellow</Button>
          <Button color="orange">Orange</Button>
        </p>
        <p className="grid grid-cols-3 grid-gap">
          <Button color="black">Black</Button>
          <Button color="white">White</Button>
        </p>
      </Block>
    </Page>
  );
};
