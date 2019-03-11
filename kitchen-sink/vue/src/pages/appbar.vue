<template>
  <f7-page>
    <f7-navbar title="Appbar" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Appbar is the main app bar with actions on top of the whole app. It is designed to be used in desktop apps with Aurora theme.</p>
    </f7-block>
    <f7-block strong>
      <f7-button fill @click="toggleAppbar">Toggle Appbar</f7-button>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7Block, f7Button } from 'framework7-vue';

  var appbarEnabled = false;
  export default {
    components: {
      f7Page,
      f7Navbar,
      f7Block,
      f7Button,
    },
    data: function () {
      return {
        appbarEnabled: appbarEnabled,
      };
    },
    methods: {
      enableAppbar: function () {
        var self = this;
        self.appbarEnabled = true;
        appbarEnabled = true;
        self.$f7.root.prepend(`
        <div class="appbar">
          <div class="appbar-inner">
            <div class="left">
              <a href="#" class="button button-small panel-toggle display-flex" data-panel="left">
                <i class="f7-icons">bars</i>
              </a>
              <a href="#" class="button button-small display-flex margin-left-half">
                <i class="f7-icons">list</i>
              </a>
              <a href="#" class="button button-small display-flex margin-left-half">
                <i class="f7-icons">reply_fill</i>
              </a>
              <a href="#" class="button button-small display-flex margin-left-half">
                <i class="f7-icons">forward_fill</i>
              </a>
            </div>
            <div class="right">
              <div class="searchbar searchbar-inline">
                <div class="searchbar-input-wrap">
                  <input type="text" placeholder="Search app">
                  <i class="searchbar-icon"></i>
                  <div class="input-clear-button"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
        `);
      },
      disableAppbar: function () {
        var self = this;
        self.appbarEnabled = false;
        appbarEnabled = false;
        self.$$('.appbar').remove();
      },
      toggleAppbar: function () {
        var self = this;
        if (self.appbarEnabled) {
          self.disableAppbar();
        } else {
          self.enableAppbar();
        }
      },
    },
  };
</script>
