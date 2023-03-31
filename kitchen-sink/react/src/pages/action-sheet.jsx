import React, { useRef, useState, useEffect } from 'react';
import {
  Navbar,
  Page,
  BlockTitle,
  Block,
  Button,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  f7,
} from 'framework7-react';

export default () => {
  const actionsToPopover = useRef(null);
  const buttonToPopoverWrapper = useRef(null);
  const [actionsOneGroupOpened, setActionsOneGroupOpened] = useState(false);
  const [actionsGridOpened, setActionsGridOpened] = useState(false);

  useEffect(() => {
    return () => {
      if (actionsToPopover.current) {
        actionsToPopover.current.destroy();
      }
    };
  }, []);

  const openActionsPopover = () => {
    if (!actionsToPopover.current) {
      actionsToPopover.current = f7.actions.create({
        buttons: [
          {
            text: 'Do something',
            label: true,
          },
          {
            text: 'Button 1',
            strong: true,
          },
          {
            text: 'Button 2',
          },
          {
            text: 'Cancel',
            color: 'red',
          },
        ],
        // Need to specify popover target
        targetEl: buttonToPopoverWrapper.current.querySelector('.button-to-popover'),
      });
    }

    // Open
    actionsToPopover.current.open();
  };

  return (
    <Page>
      <Navbar title="Action Sheet" backLink="Back"></Navbar>
      <Block strong inset>
        <p className="grid grid-cols-2 grid-gap">
          {/* One group, open by changing actionsOneGroupOpened property */}
          <Button fill onClick={() => setActionsOneGroupOpened(true)}>
            One group
          </Button>
          {/*  Two groups, open by "actionsOpen" attribute */}
          <Button fill actionsOpen="#actions-two-groups">
            Two groups
          </Button>
        </p>
        <p>
          {/* Actions Grid, open by changing actionsGridOpened property */}
          <Button fill onClick={() => setActionsGridOpened(true)}>
            Action Grid
          </Button>
        </p>
      </Block>

      <BlockTitle>Action Sheet To Popover</BlockTitle>
      <Block strong inset>
        <p ref={buttonToPopoverWrapper}>
          Action Sheet can be automatically converted to Popover (for tablets). This button will
          open Popover on tablets and Action Sheet on phones:
          <Button
            style={{ display: 'inline-block' }}
            className="button-to-popover"
            onClick={openActionsPopover}
          >
            Actions
          </Button>
        </p>
      </Block>

      {/* One Group */}
      <Actions
        opened={actionsOneGroupOpened}
        onActionsClosed={() => setActionsOneGroupOpened(false)}
      >
        <ActionsGroup>
          <ActionsLabel>Do something</ActionsLabel>
          <ActionsButton strong>Button 1</ActionsButton>
          <ActionsButton>Button 2</ActionsButton>
          <ActionsButton color="red">Cancel</ActionsButton>
        </ActionsGroup>
      </Actions>

      {/* Two Groups */}
      <Actions id="actions-two-groups">
        <ActionsGroup>
          <ActionsLabel>Do something</ActionsLabel>
          <ActionsButton strong>Button 1</ActionsButton>
          <ActionsButton>Button 2</ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton color="red">Cancel</ActionsButton>
        </ActionsGroup>
      </Actions>

      {/* Grid */}
      <Actions
        grid={true}
        opened={actionsGridOpened}
        onActionsClosed={() => setActionsGridOpened(false)}
      >
        <ActionsGroup>
          <ActionsButton>
            <img
              slot="media"
              src="https://cdn.framework7.io/placeholder/people-96x96-1.jpg"
              width="48"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <span>Button 1</span>
          </ActionsButton>
          <ActionsButton>
            <img
              slot="media"
              src="https://cdn.framework7.io/placeholder/people-96x96-2.jpg"
              width="48"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <span>Button 2</span>
          </ActionsButton>
          <ActionsButton>
            <img
              slot="media"
              src="https://cdn.framework7.io/placeholder/people-96x96-3.jpg"
              width="48"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <span>Button 3</span>
          </ActionsButton>
        </ActionsGroup>
        <ActionsGroup>
          <ActionsButton>
            <img
              slot="media"
              src="https://cdn.framework7.io/placeholder/fashion-96x96-4.jpg"
              width="48"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <span>Button 4</span>
          </ActionsButton>
          <ActionsButton>
            <img
              slot="media"
              src="https://cdn.framework7.io/placeholder/fashion-96x96-5.jpg"
              width="48"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <span>Button 5</span>
          </ActionsButton>
          <ActionsButton>
            <img
              slot="media"
              src="https://cdn.framework7.io/placeholder/fashion-96x96-6.jpg"
              width="48"
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
            <span>Button 6</span>
          </ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};
