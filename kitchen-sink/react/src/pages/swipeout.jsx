import React from 'react';
import { Navbar, Page, BlockTitle, List, ListItem, Icon, SwipeoutActions, SwipeoutButton, Block } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Page onPageBeforeRemove={this.onPageBeforeRemove.bind(this)} onPageInit={this.onPageInit.bind(this)}>
        <Navbar title="Swipeout" backLink="Back"></Navbar>

        <Block>
          <p>
            Swipe out actions on list elements is one of the most awesome F7 features. It allows you to call hidden menu for each list element where you can put default ready-to use delete button or any other buttons for some required actions.
          </p>
        </Block>

        <BlockTitle>Swipe to delete with confirm modal</BlockTitle>
        <List>
          <ListItem
            swipeout
            title="Swipe left on me please">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton delete confirmText="Are you sure you want to delete this item?">Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="Swipe left on me too">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton delete confirmText="Are you sure you want to delete this item?">Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            title="I am not removable">
            <Icon slot="media" icon="icon-f7"></Icon>
          </ListItem>
        </List>

        <BlockTitle>Swipe to delete without confirm</BlockTitle>
        <List>
          <ListItem
            swipeout
            title="Swipe left on me please">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton delete>Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="Swipe left on me too">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton delete>Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            title="I am not removable">
            <Icon slot="media" icon="icon-f7"></Icon>
          </ListItem>
        </List>

        <BlockTitle>Swipe for actions</BlockTitle>
        <List>
          <ListItem
            swipeout
            title="Swipe left on me please">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton onClick={this.more.bind(this)}>More</SwipeoutButton>
              <SwipeoutButton delete>Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="Swipe left on me too">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton onClick={this.more.bind(this)}>More</SwipeoutButton>
              <SwipeoutButton delete>Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="You can't delete me">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton onClick={this.more.bind(this)}>More</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
        </List>

        <BlockTitle>With callback on remove</BlockTitle>
        <List>
          <ListItem
            swipeout
            onSwipeoutDeleted={this.onDeleted.bind(this)}
            title="Swipe left on me please">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton delete>Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            onSwipeoutDeleted={this.onDeleted.bind(this)}
            title="Swipe left on me too">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions right>
              <SwipeoutButton delete>Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            title="I am not removable">
            <Icon slot="media" icon="icon-f7"></Icon>
          </ListItem>
        </List>

        <BlockTitle>With actions on left side (swipe to right)</BlockTitle>
        <List>
          <ListItem
            swipeout
            title="Swipe right on me please">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions left>
              <SwipeoutButton color="green" onClick={this.reply.bind(this)}>Reply</SwipeoutButton>
              <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>Forward</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="Swipe right on me too">
            <Icon slot="media" icon="icon-f7"></Icon>
            <SwipeoutActions left>
              <SwipeoutButton color="green" onClick={this.reply.bind(this)}>Reply</SwipeoutButton>
              <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>Forward</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
        </List>

        <BlockTitle>On both sides with overswipes</BlockTitle>
        <List mediaList>
          <ListItem
            swipeout
            title="Facebook"
            after="17:14"
            subtitle="New messages from John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          >
            <SwipeoutActions left>
              <SwipeoutButton overswipe color="green" onClick={this.reply.bind(this)}>Reply</SwipeoutButton>
              <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>Forward</SwipeoutButton>
            </SwipeoutActions>
            <SwipeoutActions right>
              <SwipeoutButton onClick={this.more.bind(this)}>More</SwipeoutButton>
              <SwipeoutButton color="orange" onClick={this.mark.bind(this)}>Mark</SwipeoutButton>
              <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this item?">Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="John Doe (via Twitter)"
            after="17:11"
            subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          >
            <SwipeoutActions left>
              <SwipeoutButton overswipe color="green" onClick={this.reply.bind(this)}>Reply</SwipeoutButton>
              <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>Forward</SwipeoutButton>
            </SwipeoutActions>
            <SwipeoutActions right>
              <SwipeoutButton onClick={this.more.bind(this)}>More</SwipeoutButton>
              <SwipeoutButton color="orange" onClick={this.mark.bind(this)}>Mark</SwipeoutButton>
              <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this item?">Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="Facebook"
            after="16:48"
            subtitle="New messages from John Doe"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          >
            <SwipeoutActions left>
              <SwipeoutButton overswipe color="green" onClick={this.reply.bind(this)}>Reply</SwipeoutButton>
              <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>Forward</SwipeoutButton>
            </SwipeoutActions>
            <SwipeoutActions right>
              <SwipeoutButton onClick={this.more.bind(this)}>More</SwipeoutButton>
              <SwipeoutButton color="orange" onClick={this.mark.bind(this)}>Mark</SwipeoutButton>
              <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this item?">Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
          <ListItem
            swipeout
            title="John Doe (via Twitter)"
            after="15:32"
            subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
          >
            <SwipeoutActions left>
              <SwipeoutButton overswipe color="green" onClick={this.reply.bind(this)}>Reply</SwipeoutButton>
              <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>Forward</SwipeoutButton>
            </SwipeoutActions>
            <SwipeoutActions right>
              <SwipeoutButton onClick={this.more.bind(this)}>More</SwipeoutButton>
              <SwipeoutButton color="orange" onClick={this.mark.bind(this)}>Mark</SwipeoutButton>
              <SwipeoutButton delete overswipe confirmText="Are you sure you want to delete this item?">Delete</SwipeoutButton>
            </SwipeoutActions>
          </ListItem>
        </List>
      </Page>
    );
  }
  more() {
    const self = this;
    self.actions.open();
  }
  mark() {
    const app = this.$f7;
    app.dialog.alert('Mark');
  }
  reply() {
    const app = this.$f7;
    app.dialog.alert('Reply');
  }
  forward() {
    const app = this.$f7;
    app.dialog.alert('Forward');
  }
  onDeleted() {
    const app = this.$f7;
    app.dialog.alert('Thanks, item removed!');
  }
  onPageBeforeRemove() {
    const self = this;
    self.actions.destroy();
  }
  onPageInit() {
    const self = this;
    const app = self.$f7;
    self.actions = app.actions.create({
      buttons: [
        [
          {
            text: 'Here comes some optional description or warning for actions below',
            label: true,
          },
          {
            text: 'Action 1',
          },
          {
            text: 'Action 2',
          },
        ],
        [
          {
            text: 'Cancel',
            bold: true,
          },
        ],
      ],
    });
  }
};
