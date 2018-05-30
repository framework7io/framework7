<template>
  <f7-page>
    <f7-navbar title="Navbar" subtitle="Subtitle" back-link="Back">
      <f7-nav-right>
        <f7-link>Right</f7-link>
      </f7-nav-right>
    </f7-navbar>
    <f7-block>
      <p>Navbar is a fixed (with Fixed and Through layout types) area at the top of a screen that contains Page title and navigation elements.</p>
      <p>Navbar has 3 main parts: Left, Title and Right. Each part may contain any HTML content.</p>
    </f7-block>
    <f7-list>
      <f7-list-item link="/navbar-hide-scroll/" title="Hide Navbar On Scroll"></f7-list-item>
    </f7-list>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7Block, f7List, f7ListItem, f7NavRight, f7Link } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Block,
      f7List,
      f7ListItem,
      f7NavRight,
      f7Link,
    },
  };
</script>
