<template>
  <f7-page>
    <f7-navbar title="Toolbar & Tabbar" back-link="Back"></f7-navbar>
    <f7-toolbar>
      <f7-link>Left Link</f7-link>
      <f7-link>Right Link</f7-link>
    </f7-toolbar>
    <f7-list>
      <f7-list-item link="./tabbar/" title="Tabbar"></f7-list-item>
      <f7-list-item link="./tabbar-labels/" title="Tabbar With Labels"></f7-list-item>
      <f7-list-item link="./tabbar-scrollable/" title="Tabbar Scrollable"></f7-list-item>
      <f7-list-item link="./toolbar-hide-scroll/" title="Hide Toolbar On Scroll"></f7-list-item>
    </f7-list>
    <f7-block-title v-if="$theme.md">Toolbar Position</f7-block-title>
    <f7-block v-if="$theme.md">
      <p>Material (MD) theme toolbar supports both top and bottom positions. Click the following button to change its position.</p>
      <p>
        <f7-button raised @click="toggleToolbarPosition">Toggle Toolbar Position</f7-button>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Toolbar, f7List, f7ListItem, f7Button, f7Link, f7BlockTitle, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7Toolbar, f7List, f7ListItem, f7Button, f7Link, f7BlockTitle, f7Block,
    },
    methods: {
      toggleToolbarPosition() {
        this.$$(this.$el).find('.toolbar, .tabbar').toggleClass('toolbar-bottom-md');
      },
    },
  };
</script>

