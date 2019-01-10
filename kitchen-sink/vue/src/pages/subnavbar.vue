<template>
  <f7-page>
    <f7-navbar title="Subnavbar" back-link="Back">
      <f7-subnavbar>
        <f7-segmented>
          <f7-button outline active>Link 1</f7-button>
          <f7-button outline>Link 2</f7-button>
          <f7-button outline>Link 3</f7-button>
        </f7-segmented>
      </f7-subnavbar>
    </f7-navbar>
    <f7-block>
      <p>Subnavbar is useful when you need to put any additional elements into Navbar, like Tab Links or Search Bar. It also remains visible when Navbar hidden.</p>
    </f7-block>
    <f7-list>
      <f7-list-item link="/subnavbar-title/" title="Subnavbar Title"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Subnavbar, f7Segmented, f7Button, f7Block, f7List, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Navbar, f7Page, f7Subnavbar, f7Segmented, f7Button, f7Block, f7List, f7ListItem,
    },
  };
</script>
