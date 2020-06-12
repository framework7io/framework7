<template>
  <f7-page>
    <f7-navbar title="Page Transitions" back-link="Back"></f7-navbar>

    <f7-block strong>
      <p>In addition to default theme-specific page transition it is possible to create custom page transition or use one of the additional transition effects:</p>
    </f7-block>

    <f7-list>
      <f7-list-item
        v-for="effect in effects"
        :key="effect"
        :link="`/page-transitions/${effect}/`"
        :title="effect"
        :transition="effect"
      />
    </f7-list>

  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7List, f7ListItem } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7List,
      f7ListItem,
    },
    data: function () {
      return {
        effects: ['f7-circle', 'f7-cover', 'f7-cover-v', 'f7-dive', 'f7-fade', 'f7-flip', 'f7-parallax', 'f7-push'],
      }
    },
  }
</script>
