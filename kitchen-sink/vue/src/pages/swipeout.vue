<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar title="Swipeout" back-link="Back"></f7-navbar>

    <f7-block>
      <p>
        Swipe out actions on list elements is one of the most awesome F7 features. It allows you to
        call hidden menu for each list element where you can put default ready-to use delete button
        or any other buttons for some required actions.
      </p>
    </f7-block>

    <f7-block-title>Swipe to delete with confirm modal</f7-block-title>
    <f7-list strong inset-md dividers-ios outline-ios>
      <f7-list-item swipeout title="Swipe left on me please">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button delete confirm-text="Are you sure you want to delete this item?"
            >Delete</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="Swipe left on me too">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button delete confirm-text="Are you sure you want to delete this item?"
            >Delete</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item title="I am not removable">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Swipe to delete without confirm</f7-block-title>
    <f7-list strong inset-md dividers-ios outline-ios>
      <f7-list-item swipeout title="Swipe left on me please">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="Swipe left on me too">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item title="I am not removable">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Swipe for actions</f7-block-title>
    <f7-list strong inset-md dividers-ios outline-ios>
      <f7-list-item swipeout title="Swipe left on me please">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button @click="more">More</f7-swipeout-button>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="Swipe left on me too">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button @click="more">More</f7-swipeout-button>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="You can't delete me">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button @click="more">More</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

    <f7-block-title>With callback on remove</f7-block-title>
    <f7-list strong inset-md dividers-ios outline-ios>
      <f7-list-item swipeout title="Swipe left on me please" @swipeout:deleted="onDeleted">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="Swipe left on me too" @swipeout:deleted="onDeleted">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions right>
          <f7-swipeout-button delete>Delete</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item title="I am not removable">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
      </f7-list-item>
    </f7-list>

    <f7-block-title>With actions on left side (swipe to right)</f7-block-title>
    <f7-list strong inset-md dividers-ios outline-ios>
      <f7-list-item swipeout title="Swipe right on me please">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions left>
          <f7-swipeout-button color="green" @click="reply">Reply</f7-swipeout-button>
          <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item swipeout title="Swipe right on me too">
        <template #media>
          <f7-icon icon="icon-f7" />
        </template>
        <f7-swipeout-actions left>
          <f7-swipeout-button color="green" @click="reply">Reply</f7-swipeout-button>
          <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>

    <f7-block-title>On both sides with overswipes</f7-block-title>
    <f7-list media-list strong inset-md outline-ios dividers-ios>
      <f7-list-item
        swipeout
        title="Facebook"
        after="17:14"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      >
        <f7-swipeout-actions left>
          <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
          <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
        </f7-swipeout-actions>
        <f7-swipeout-actions right>
          <f7-swipeout-button @click="more">More</f7-swipeout-button>
          <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
          <f7-swipeout-button
            delete
            overswipe
            confirm-text="Are you sure you want to delete this item?"
            >Delete</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item
        swipeout
        title="John Doe (via Twitter)"
        after="17:11"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      >
        <f7-swipeout-actions left>
          <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
          <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
        </f7-swipeout-actions>
        <f7-swipeout-actions right>
          <f7-swipeout-button @click="more">More</f7-swipeout-button>
          <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
          <f7-swipeout-button
            delete
            overswipe
            confirm-text="Are you sure you want to delete this item?"
            >Delete</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item
        swipeout
        title="Facebook"
        after="16:48"
        subtitle="New messages from John Doe"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      >
        <f7-swipeout-actions left>
          <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
          <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
        </f7-swipeout-actions>
        <f7-swipeout-actions right>
          <f7-swipeout-button @click="more">More</f7-swipeout-button>
          <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
          <f7-swipeout-button
            delete
            overswipe
            confirm-text="Are you sure you want to delete this item?"
            >Delete</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
      <f7-list-item
        swipeout
        title="John Doe (via Twitter)"
        after="15:32"
        subtitle="John Doe (@_johndoe) mentioned you on Twitter!"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
      >
        <f7-swipeout-actions left>
          <f7-swipeout-button overswipe color="green" @click="reply">Reply</f7-swipeout-button>
          <f7-swipeout-button color="blue" @click="forward">Forward</f7-swipeout-button>
        </f7-swipeout-actions>
        <f7-swipeout-actions right>
          <f7-swipeout-button @click="more">More</f7-swipeout-button>
          <f7-swipeout-button color="orange" @click="mark">Mark</f7-swipeout-button>
          <f7-swipeout-button
            delete
            overswipe
            confirm-text="Are you sure you want to delete this item?"
            >Delete</f7-swipeout-button
          >
        </f7-swipeout-actions>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
import {
  f7Navbar,
  f7Page,
  f7BlockTitle,
  f7List,
  f7ListItem,
  f7Icon,
  f7SwipeoutActions,
  f7SwipeoutButton,
  f7Block,
  f7,
} from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7List,
    f7ListItem,
    f7Icon,
    f7SwipeoutActions,
    f7SwipeoutButton,
    f7Block,
  },
  methods: {
    more() {
      const self = this;
      self.actions.open();
    },
    mark() {
      f7.dialog.alert('Mark');
    },
    reply() {
      f7.dialog.alert('Reply');
    },
    forward() {
      f7.dialog.alert('Forward');
    },
    onDeleted() {
      f7.dialog.alert('Thanks, item removed!');
    },
    onPageBeforeRemove() {
      const self = this;
      self.actions.destroy();
    },
    onPageInit() {
      const self = this;
      self.actions = f7.actions.create({
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
              strong: true,
            },
          ],
        ],
      });
    },
  },
};
</script>
