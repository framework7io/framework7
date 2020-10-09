<template>
  <f7-page id="panel-page">
    <f7-navbar title="Panel / Side panels" back-link="Back"></f7-navbar>
    <f7-panel id="panel-nested" left cover container-el="#panel-page">
      <f7-page>
        <f7-block strong>
          <p>This is page-nested Panel.</p>
          <p>
            <f7-link panel-close>Close me</f7-link>
          </p>
        </f7-block>
      </f7-page>
    </f7-panel>
    <f7-block>
      <p>
        Framework7 comes with 2 panels (on left and on right), both are optional. They have two
        different layouts/effects - <b>cover</b> above the content (like left panel here) and
        <b>reveal</b> (like right panel). You can put absolutely anything inside: data lists, forms,
        custom content, and even other isolated app view (like in right panel now) with its own
        dynamic navbar. Checkout panels:
      </p>
    </f7-block>
    <f7-block>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill panel-open="left"> Open left panel </f7-button>
        </f7-col>
        <f7-col tag="span">
          <f7-button raised fill panel-open="right"> Open right panel </f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col tag="span">
          <f7-button raised fill panel-open="#panel-nested"> Open nested panel </f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7Block, f7Col, f7Button, f7Link, f7Panel, f7Row } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Block,
    f7Col,
    f7Button,
    f7Link,
    f7Panel,
    f7Row,
  },
};
</script>
