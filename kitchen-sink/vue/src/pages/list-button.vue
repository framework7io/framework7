<template>
  <f7-page>
    <f7-navbar title="List Button" back-link="Back"></f7-navbar>

    <f7-list inset strong>
      <f7-list-button title="List Button 1"></f7-list-button>
      <f7-list-button title="List Button 2"></f7-list-button>
      <f7-list-button title="List Button 3"></f7-list-button>
    </f7-list>
    <f7-list inset strong>
      <f7-list-button title="Large Red Button" color="red"></f7-list-button>
    </f7-list>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7List, f7ListButton } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7List,
    f7ListButton,
  },
  setup() {},
};
</script>
