<template>
  <Page>
    <Navbar title="Color Themes" backLink="Back"></Navbar>
    <BlockTitle>Layout Themes</BlockTitle>
    <Block>
      <p>Framework7 comes with 2 main layout themes: Light (default) and Dark:</p>
      <Row>
        <Col width="50" className="bg-color-white" @click.native="setLayoutTheme('light')" style="cursor: pointer; padding: 30px; border: 1px solid rgba(0,0,0,0.1)"></Col>
        <Col width="50" className="bg-color-black" @click.native="setLayoutTheme('dark')" style="cursor: pointer; padding: 30px; border: 1px solid rgba(255,255,255,0.1)"></Col>
      </Row>
    </Block>
    <BlockTitle>Choose Color Theme</BlockTitle>
    <Block>
      <p>Framework7 comes with {{colorsAmount}} color themes set.</p>
      <Row>
        <Col width="33" v-for="color in colors" key={color}>
          <Button style="margin-bottom:1em; text-transform: capitalize;" fill round raised color={color} onClick={setColorTheme(color)}>
            {{ color }}
          </Button>
        </Col>
        <Col width="33"></Col>
      </Row>
    </Block>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, BlockTitle, Button, Row, Col, Block } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      BlockTitle,
      Button,
      Row,
      Col,
      Block,
    },
    data() {
      const colors = [
        'red',
        'green',
        'blue',
        'pink',
        'yellow',
        'orange',
        'gray',
        'black',
      ];
      return {
        colors,
        colorsAmount: colors.length,
      };
    },
    methods: {
      setLayoutTheme(theme) {
        const self = this;
        const app = self.$f7;
        app.root.removeClass('theme-dark theme-light').addClass(`theme-${theme}`);
      },
      setColorTheme(color) {
        const self = this;
        const app = self.$f7;
        const currentColorClass = app.root[0].className.match(/color-theme-([a-z]*)/);
        if (currentColorClass) app.root.removeClass(currentColorClass[0]);
        app.root.addClass(`color-theme-${color}`);
      },
    },
  };
</script>
