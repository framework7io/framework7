<template>
  <f7-page>
    <f7-navbar title="Toggle" back-link="Back"></f7-navbar>
    <f7-block-title>Super Heroes</f7-block-title>
    <f7-list simple-list>
      <f7-list-item>
        <span>Batman</span>
        <f7-toggle checked></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Aquaman</span>
        <f7-toggle checked color="blue"></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Superman</span>
        <f7-toggle checked color="red"></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Hulk</span>
        <f7-toggle color="green"></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Spiderman (Disabled)</span>
        <f7-toggle disabled></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Ironman (Disabled)</span>
        <f7-toggle checked disabled></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Thor</span>
        <f7-toggle checked color="orange"></f7-toggle>
      </f7-list-item>
      <f7-list-item>
        <span>Wonder Woman</span>
        <f7-toggle color="pink"></f7-toggle>
      </f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7List, f7ListItem, f7Toggle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7List,
      f7ListItem,
      f7Toggle,
    },
  };
</script>
