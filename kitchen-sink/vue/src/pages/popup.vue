<template>
  <f7-page @page:beforeremove="onPageBeforeRemove">
    <f7-navbar title="Popup" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Popup is a modal window with any HTML content that pops up over App's main content. Popup as all other overlays is part of so called "Temporary Views".</p>
      <p>
        <f7-button fill popup-open=".demo-popup">Open Popup</f7-button>
      </p>
      <p>
        <f7-button fill @click="popupOpened = true">Open Via Prop Change</f7-button>
      </p>
      <p>
        <f7-button fill @click="createPopup">Create Dynamic Popup</f7-button>
      </p>
    </f7-block>
    <f7-block-title>Swipe To Close</f7-block-title>
    <f7-block strong>
      <p>Popup can be closed with swipe to top or bottom:</p>
      <p>
        <f7-button fill popup-open=".demo-popup-swipe">Swipe To Close</f7-button>
      </p>
      <p>Or it can be closed with swipe on special swipe handler and, for example, only to bottom:</p>
      <p>
        <f7-button fill popup-open=".demo-popup-swipe-handler">With Swipe Handler</f7-button>
      </p>
    </f7-block>
    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar title="Popup Title">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <p>Here comes popup. You can put here anything, even independent view with its own navigation. Also not, that by default popup looks a bit different on iPhone/iPod and iPad, on iPhone it is fullscreen.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
        </f7-block>
      </f7-page>
    </f7-popup>

    <f7-popup class="demo-popup-swipe" swipe-to-close>
      <f7-page>
        <f7-navbar title="Swipe To Close">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>

        <div style="height: 100%" class="display-flex justify-content-center align-items-center">
          <p>Swipe me up or down</p>
        </div>
      </f7-page>
    </f7-popup>

    <f7-popup class="demo-popup-swipe-handler" swipe-to-close="to-bottom" swipe-handler=".swipe-handler">
      <f7-page>
        <div slot="fixed" class="swipe-handler"></div>
        <f7-block-title large>Hello!</f7-block-title>
        <f7-block strong>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
          <p>Duis ut mauris sollicitudin, venenatis nisi sed, luctus ligula. Phasellus blandit nisl ut lorem semper pharetra. Nullam tortor nibh, suscipit in consequat vel, feugiat sed quam. Nam risus libero, auctor vel tristique ac, malesuada ut ante. Sed molestie, est in eleifend sagittis, leo tortor ullamcorper erat, at vulputate eros sapien nec libero. Mauris dapibus laoreet nibh quis bibendum. Fusce dolor sem, suscipit in iaculis id, pharetra at urna. Pellentesque tempor congue massa quis faucibus. Vestibulum nunc eros, convallis blandit dui sit amet, gravida adipiscing libero.</p>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Popup, f7BlockTitle, f7Block, f7NavRight, f7Link, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Popup,
      f7BlockTitle,
      f7Block,
      f7NavRight,
      f7Link,
      f7Button,
    },
    data() {
      return {
        popupOpened: false,
      };
    },
    methods: {
      createPopup() {
        const self = this;
        // Create popup
        if (!self.popup) {
          self.popup = self.$f7.popup.create({
            content: `
              <div class="popup">
                <div class="page">
                  <div class="navbar">
                    <div class="navbar-inner">
                      <div class="title">Dynamic Popup</div>
                      <div class="right"><a href="#" class="link popup-close">Close</a></div>
                    </div>
                  </div>
                  <div class="page-content">
                    <div class="block">
                      <p>This popup was created dynamically</p>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse faucibus mauris leo, eu bibendum neque congue non. Ut leo mauris, eleifend eu commodo a, egestas ac urna. Maecenas in lacus faucibus, viverra ipsum pulvinar, molestie arcu. Etiam lacinia venenatis dignissim. Suspendisse non nisl semper tellus malesuada suscipit eu et eros. Nulla eu enim quis quam elementum vulputate. Mauris ornare consequat nunc viverra pellentesque. Aenean semper eu massa sit amet aliquam. Integer et neque sed libero mollis elementum at vitae ligula. Vestibulum pharetra sed libero sed porttitor. Suspendisse a faucibus lectus.</p>
                    </div>
                  </div>
                </div>
              </div>
            `.trim(),
          });
        }
        // Open it
        self.popup.open();
      },
      onPageBeforeRemove() {
        const self = this;
        // Destroy popup when page removed
        if (self.popup) self.popup.destroy();
      },
    },
  };
</script>
