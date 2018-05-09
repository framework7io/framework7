<template>
  <Page>
    <Navbar title="Statusbar Overlay" backLink="Back"></Navbar>
    <Block strong>
      <p>Framework7 automatically detects if your app in full screen mode, and automatically shows statusbar overlay if app is in full screen mode (or hides statusbar if app is not in full screen mode). Its visibility can be forced using app parameters or using API:</p>
      <Row tag="p">
        <Button raised className="col" @click={showStatusbar}>Show Statusbar</Button>
        <Button raised className="col" @click={hideStatusbar}>Hide Statusbar</Button>
      </Row>
    </Block>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, Block, Row, Button } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      Block,
      Row,
      Button,
    },
    methods: {
      showStatusbar() {
        this.$f7.statusbar.show();
      },
      hideStatusbar() {
        this.$f7.statusbar.hide();
      },
    },
  };
</script>
