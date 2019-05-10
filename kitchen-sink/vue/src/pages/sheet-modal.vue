<template>
  <f7-page @page:beforeremove="onPageBeforeRemove" @page:beforeout="onPageBeforeOut">
    <f7-navbar title="Sheet Modal" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Sheet Modals slide up from the bottom of the screen to reveal more content. Such modals allow to create custom overlays with custom content.</p>
      <f7-row tag="p">
        <f7-button class="col" fill sheet-open=".demo-sheet">Open Sheet</f7-button>
        <f7-button class="col" fill @click="createSheet">Create Dynamic Sheet</f7-button>
      </f7-row>
      <p>
        <f7-button class="col" fill sheet-open=".demo-sheet-top">Top Sheet</f7-button>
      </p>
      <p>
        <f7-button class="col" fill @click="sheetOpened = true">Open Via Prop Change</f7-button>
      </p>
    </f7-block>

    <f7-block-title>Swipeable Sheet</f7-block-title>
    <f7-block strong>
      <p>Sheet modal can be closed with swipe to top (for top Sheet) or bottom (for default Bottom sheet):</p>
      <p>
        <f7-button fill sheet-open=".demo-sheet-swipe-to-close">Swipe To Close</f7-button>
      </p>
      <p>Also there is swipe-step that can be set on Sheet modal to expand it with swipe:</p>
      <p>
        <f7-button fill sheet-open=".demo-sheet-swipe-to-step">Swipe To Step</f7-button>
      </p>
    </f7-block>

    <f7-sheet class="demo-sheet" :opened="sheetOpened" @sheet:closed="sheetOpened = false">
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Close</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in tempora harum sequi corporis alias ex adipisci.</p>
          <p>Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui sed, similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut deserunt soluta alias magnam. Consequatur, nisi, enim.</p>
          <p>Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae adipisci vel voluptatum, autem libero minus dignissimos repellat.</p>
          <p>Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?</p>
          <p>Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus sapiente repellendus nesciunt praesentium velit ipsa illo iusto.</p>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <f7-sheet top class="demo-sheet-top">
      <f7-toolbar bottom>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Close</f7-link>
        </div>
      </f7-toolbar>
      <!-- Scrollable sheet content -->
      <f7-page-content>
        <f7-block>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae ducimus dolorum ipsa aliquid accusamus perferendis laboriosam delectus numquam minima animi, libero illo in tempora harum sequi corporis alias ex adipisci.</p>
          <p>Sunt magni enim saepe quasi aspernatur delectus consectetur fugiat necessitatibus qui sed, similique quis facere tempora, laudantium quae expedita ea, aperiam dolores. Aut deserunt soluta alias magnam. Consequatur, nisi, enim.</p>
          <p>Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae adipisci vel voluptatum, autem libero minus dignissimos repellat.</p>
          <p>Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?</p>
          <p>Illum id laborum tempore, doloribus culpa labore ex iusto odit. Quibusdam consequuntur totam nam obcaecati, enim cumque nobis, accusamus, quos voluptates, voluptatibus sapiente repellendus nesciunt praesentium velit ipsa illo iusto.</p>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="height:auto"
      swipe-to-close
      backdrop
    >
      <div class="swipe-handler"></div>

      <f7-page-content>
        <f7-block-title large>Hello!</f7-block-title>
        <f7-block>
          <p>Eaque maiores ducimus, impedit unde culpa qui, explicabo accusamus, non vero corporis voluptatibus similique odit ab. Quaerat quasi consectetur quidem libero? Repudiandae adipisci vel voluptatum, autem libero minus dignissimos repellat.</p>
          <p>Iusto, est corrupti! Totam minus voluptas natus esse possimus nobis, delectus veniam expedita sapiente ut cum reprehenderit aliquid odio amet praesentium vero temporibus obcaecati beatae aspernatur incidunt, perferendis voluptates doloribus?</p>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <f7-sheet
      class="demo-sheet-swipe-to-step"
      style="height:auto"
      swipe-to-close
      swipe-to-step
      backdrop
    >
      <div class="swipe-handler" @click="toggleSwipeStep"></div>
      <div class="sheet-modal-swipe-step">
        <div class="display-flex padding justify-content-space-between align-items-center">
          <div style="font-size: 18px"><b>Total:</b></div>
          <div style="font-size: 22px"><b>$500</b></div>
        </div>
        <div class="padding-horizontal padding-bottom">
          <f7-button large fill>Make Payment</f7-button>
          <div class="margin-top text-align-center">Swipe up for more details</div>
        </div>
      </div>
      <f7-block-title medium class="margin-top">Your order:</f7-block-title>
      <f7-list no-hairlines>
        <f7-list-item title="Item 1">
          <b slot="after" class="text-color-black">$200</b>
        </f7-list-item>
        <f7-list-item title="Item 2">
          <b slot="after" class="text-color-black">$180</b>
        </f7-list-item>
        <f7-list-item title="Delivery">
          <b slot="after" class="text-color-black">$120</b>
        </f7-list-item>
      </f7-list>
    </f7-sheet>
  </f7-page>
</template>
<script>
import { f7Page, f7Navbar, f7Sheet, f7PageContent, f7Toolbar, f7BlockTitle, f7Block, f7Button, f7Link, f7Row, f7List, f7ListItem } from 'framework7-vue';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7Sheet,
    f7PageContent,
    f7Toolbar,
    f7BlockTitle,
    f7Block,
    f7Button,
    f7Link,
    f7Row,
    f7List,
    f7ListItem,
  },
  data() {
    return {
      sheetOpened: false,
    };
  },
  methods: {
    toggleSwipeStep() {
      const self = this;
      self.$f7.sheet.stepToggle('.demo-sheet-swipe-to-step');
    },
    createSheet() {
      const self = this;
      const $ = self.$$;
      // Create sheet modal
      if (!self.sheet) {
        self.sheet = self.$f7.sheet.create({
          content: `
            <div class="sheet-modal">
              <div class="toolbar">
                <div class="toolbar-inner justify-content-flex-end">
                  <a href="#" class="link sheet-close">Close</a>
                </div>
              </div>
              <div class="sheet-modal-inner">
                <div class="page-content">
                  <div class="block">
                    <p>This sheet modal was created dynamically</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
                  </div>
                </div>
              </div>
            </div>
          `.trim(),
        });
      }
      // Close inline sheet
      if ($('.demo-sheet.modal-in').length > 0) self.$f7.sheet.close('.demo-sheet');
      // Open it
      self.sheet.open();
    },
    onPageBeforeOut() {
      const self = this;
      // Close opened sheets on page out
      self.$f7.sheet.close();
    },
    onPageBeforeRemove() {
      const self = this;
      // Destroy sheet modal when page removed
      if (self.sheet) self.sheet.destroy();
    },
  },
};
</script>
