<template>
  <f7-page id="panel-page">
    <f7-navbar title="Panel / Side panels" back-link="Back"></f7-navbar>
    <f7-panel id="panel-nested" left cover container-el="#panel-page">
      <f7-page>
        <f7-block strong-ios outline-ios>
          <p>This is page-nested Panel.</p>
          <p>
            <f7-link panel-close>Close me</f7-link>
          </p>
        </f7-block>
      </f7-page>
    </f7-panel>
    <f7-block strong-ios outline-ios>
      <p>
        Framework7 comes with 2 panels (on left and on right), both are optional. You can put
        absolutely anything inside: data lists, forms, custom content, and even other isolated app
        view (like in right panel now) with its own dynamic navbar.
      </p>
    </f7-block>
    <f7-block strong-ios outline-ios>
      <p class="grid grid-cols-2 grid-gap">
        <f7-button raised fill panel-open="left"> Open left panel </f7-button>
        <f7-button raised fill panel-open="right"> Open right panel </f7-button>
      </p>
      <p>
        <f7-button raised fill panel-open="#panel-nested"> Open nested panel </f7-button>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7Block, f7Button, f7Link, f7Panel } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Block,
    f7Button,
    f7Link,
    f7Panel,
  },
};
</script>
