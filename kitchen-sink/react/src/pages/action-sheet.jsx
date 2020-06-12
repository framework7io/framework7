import React from 'react';
import { Navbar, Page, BlockTitle, Block, Link, Button, Actions, ActionsGroup, ActionsLabel, ActionsButton } from 'framework7-react';

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      actionGridOpened: false,
      oneGroupOpened: false
    };
  }

  render() {
    return (
      <Page>
        <Navbar title="Action Sheet" backLink="Back"></Navbar>
        <Block strong>
          <p className="row">
            {/* One group, open by direct accessing instance .open() method */}
            <Button className="col" fill onClick={() => this.refs.actionsOneGroup.open()}>One group</Button>
            {/*  Two groups, open by "actionsOpen" attribute */}
            <Button className="col" fill actionsOpen="#actions-two-groups">Two groups</Button>
          </p>
          <p>
            {/* Actions Grid, open by changing actionGridOpened state property */}
            <Button fill onClick={() => this.setActionsGridOpened(true)}>Action Grid</Button>
          </p>
        </Block>

        <BlockTitle>Action Sheet To Popover</BlockTitle>
        <Block strong>
          <p ref={e => this.buttonToPopoverWrapper = e}>
            Action Sheet can be automatically converted to Popover (for tablets). This button will open Popover on tablets and Action Sheet on phones:
            <Button
              style={{ display: 'inline-block' }}
              className="button-to-popover"
              onClick={this.openActionsPopover.bind(this)}>
                Actions
              </Button>
          </p>
        </Block>

        {/* One Group */}
        <Actions ref="actionsOneGroup">
          <ActionsGroup>
            <ActionsLabel>Do something</ActionsLabel>
            <ActionsButton bold>Button 1</ActionsButton>
            <ActionsButton>Button 2</ActionsButton>
            <ActionsButton color="red">Cancel</ActionsButton>
          </ActionsGroup>
        </Actions>

        {/* Two Groups */}
        <Actions id="actions-two-groups">
          <ActionsGroup>
            <ActionsLabel>Do something</ActionsLabel>
            <ActionsButton bold>Button 1</ActionsButton>
            <ActionsButton>Button 2</ActionsButton>
          </ActionsGroup>
          <ActionsGroup>
            <ActionsButton color="red">Cancel</ActionsButton>
          </ActionsGroup>
        </Actions>

        {/* Grid */}
        <Actions grid={true} opened={this.state.actionGridOpened} onActionsClosed={() => this.setActionsGridOpened(false)}>
          <ActionsGroup>
            <ActionsButton>
              <img slot="media" src="https://cdn.framework7.io/placeholder/people-96x96-1.jpg" width="48" style={{maxWidth: '100%'}}/>
              <span>Button 1</span>
            </ActionsButton>
            <ActionsButton>
              <img slot="media" src="https://cdn.framework7.io/placeholder/people-96x96-2.jpg" width="48" style={{maxWidth: '100%'}}/>
              <span>Button 2</span>
            </ActionsButton>
            <ActionsButton>
              <img slot="media" src="https://cdn.framework7.io/placeholder/people-96x96-3.jpg" width="48" style={{maxWidth: '100%'}}/>
              <span>Button 3</span>
            </ActionsButton>
          </ActionsGroup>
          <ActionsGroup>
            <ActionsButton>
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-96x96-4.jpg" width="48" style={{maxWidth: '100%'}}/>
              <span>Button 4</span>
            </ActionsButton>
            <ActionsButton>
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-96x96-5.jpg" width="48" style={{maxWidth: '100%'}}/>
              <span>Button 5</span>
            </ActionsButton>
            <ActionsButton>
              <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-96x96-6.jpg" width="48" style={{maxWidth: '100%'}}/>
              <span>Button 6</span>
            </ActionsButton>
          </ActionsGroup>
        </Actions>

      </Page>
    )
  }

  componentWillUnmount() {
    if (this.actionsToPopover) {
      this.actionsToPopover.destroy();
    }
  }

  openActionsPopover() {
    const app = this.$f7;

    if (!this.actionsToPopover) {
      this.actionsToPopover = app.actions.create({
        buttons: [
          {
            text: 'Do something',
            label: true,
          },
          {
            text: 'Button 1',
            bold: true,
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
        targetEl: this.buttonToPopoverWrapper.querySelector('.button-to-popover'),
      });
    }

    // Open
    this.actionsToPopover.open();
  }

  setOneGroupOpened(oneGroupOpened) {
    this.setState({
      oneGroupOpened
    });
  }

  setActionsGridOpened(actionGridOpened) {
    this.setState({
      actionGridOpened
    });
  }
}