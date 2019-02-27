<template>
  <f7-page @page:beforeremove="onPageBeforeRemove">
    <f7-navbar title="Action Sheet" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p class="row">
        <!-- One group, open by direct accessing instance .open() method -->
        <f7-button class="col" fill @click="$refs.actionsOneGroup.open()">One group</f7-button>
        <!-- Two groups, open by "actions-open" attribute -->
        <f7-button class="col" fill actions-open="#actions-two-groups">Two groups</f7-button>
      </p>
      <p>
        <!-- Actions Grid, open by changing actionGridOpened prop -->
        <f7-button fill @click="actionGridOpened = true">Action Grid</f7-button>
      </p>
    </f7-block>

    <f7-block-title>Action Sheet To Popover</f7-block-title>
    <f7-block strong>
      <p>Action Sheet can be automatically converted to Popover (for tablets). This button will open Popover on tablets and Action Sheet on phones: <f7-button style="display:inline-block" class="button-to-popover" @click="openActionsPopover">Actions</f7-button></p>
    </f7-block>

    <!-- One Group -->
    <f7-actions ref="actionsOneGroup">
      <f7-actions-group>
        <f7-actions-label>Do something</f7-actions-label>
        <f7-actions-button bold>Button 1</f7-actions-button>
        <f7-actions-button>Button 2</f7-actions-button>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>

    <!-- Two Groups -->
    <f7-actions id="actions-two-groups">
      <f7-actions-group>
        <f7-actions-label>Do something</f7-actions-label>
        <f7-actions-button bold>Button 1</f7-actions-button>
        <f7-actions-button>Button 2</f7-actions-button>
      </f7-actions-group>
      <f7-actions-group>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>

    <!-- Grid -->
    <f7-actions :grid="true" :opened="actionGridOpened" @actions:closed="actionGridOpened = false">
      <f7-actions-group>
        <f7-actions-button>
          <img slot="media" src="https://cdn.framework7.io/placeholder/people-96x96-1.jpg" width="48" style="max-width: 100%"/>
          <span>Button 1</span>
        </f7-actions-button>
        <f7-actions-button>
          <img slot="media" src="https://cdn.framework7.io/placeholder/people-96x96-2.jpg" width="48" style="max-width: 100%"/>
          <span>Button 2</span>
        </f7-actions-button>
        <f7-actions-button>
          <img slot="media" src="https://cdn.framework7.io/placeholder/people-96x96-3.jpg" width="48" style="max-width: 100%"/>
          <span>Button 3</span>
        </f7-actions-button>
      </f7-actions-group>
      <f7-actions-group>
        <f7-actions-button>
          <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-96x96-4.jpg" width="48" style="max-width: 100%"/>
          <span>Button 4</span>
        </f7-actions-button>
        <f7-actions-button>
          <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-96x96-5.jpg" width="48" style="max-width: 100%"/>
          <span>Button 5</span>
        </f7-actions-button>
        <f7-actions-button>
          <img slot="media" src="https://cdn.framework7.io/placeholder/fashion-96x96-6.jpg" width="48" style="max-width: 100%"/>
          <span>Button 6</span>
        </f7-actions-button>
      </f7-actions-group>
    </f7-actions>

  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Link, f7Button, f7Actions, f7ActionsGroup, f7ActionsLabel, f7ActionsButton } from 'framework7-vue';

export default {
  props: {
    id: String,
  },
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    f7Link,
    f7Button,
    f7Actions,
    f7ActionsGroup,
    f7ActionsLabel,
    f7ActionsButton,
  },
  data() {
    return {
      actionGridOpened: false,
    };
  },
  methods: {
    openActionsPopover() {
      const self = this;
      const app = self.$f7;
      if (!self.actionsToPopover) {
        self.actionsToPopover = app.actions.create({
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
          targetEl: self.$el.querySelector('.button-to-popover'),
        });
      }

      // Open
      self.actionsToPopover.open();
    },
    onPageBeforeRemove() {
      const self = this;
      if (self.actionsToPopover) {
        self.actionsToPopover.destroy();
      }
    }
  },
};
</script>
