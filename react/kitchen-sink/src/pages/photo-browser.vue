<template>
  <Page>
    <Navbar title="Photo Browser" backLink="Back"></Navbar>
    <Block>
      <p>Photo Browser is a standalone and highly configurable component that allows to open window with photo viewer and navigation elements with the following features:</p>
      <ul>
        <li>Swiper between photos</li>
        <li>Multi-gestures support for zooming</li>
        <li>Toggle zoom by double tap on photo</li>
        <li>Single click on photo to toggle Exposition mode</li>
      </ul>
    </Block>
    <Block>
      <p>Photo Browser could be opened in a three ways - as a Standalone component (Popup modification), in Popup, and as separate Page:</p>
      <Row>
        <Col>
          <PhotoBrowser photos={photos} ref="standalone"></PhotoBrowser>
          <Button raised onClick={$refs.standalone.open()}>Standalone</Button>
        </Col>
        <Col>
          <PhotoBrowser photos={photos} type="popup" ref="popup"></PhotoBrowser>
          <Button raised onClick={$refs.popup.open()}>Popup</Button>
        </Col>
        <Col>
          <PhotoBrowser photos={photos} type="page" back-link-text="Back" ref="page"></PhotoBrowser>
          <Button raised onClick={$refs.page.open()}>Page</Button>
        </Col>
      </Row>
    </Block>
    <Block>
      <p>Photo Browser suppots 2 default themes - default Light (like in previous examples) and Dark theme. Here is a Dark theme examples:</p>
      <Row>
        <Col>
          <PhotoBrowser photos={photos} theme="dark" ref="standaloneDark"></PhotoBrowser>
          <Button raised onClick={$refs.standaloneDark.open()}>Standalone</Button>
        </Col>
        <Col>
          <PhotoBrowser photos={photos} theme="dark" type="popup" ref="popupDark"></PhotoBrowser>
          <Button raised onClick={$refs.popupDark.open()}>Popup</Button>
        </Col>
        <Col>
          <PhotoBrowser photos={photos} theme="dark" type="page" back-link-text="Back" ref="pageDark"></PhotoBrowser>
          <Button raised onClick={$refs.pageDark.open()}>Page</Button>
        </Col>
      </Row>
    </Block>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page, PhotoBrowser, Block, Row, Col, Button } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      PhotoBrowser,
      Block,
      Row,
      Col,
      Button,
    },
    data() {
      console.log('aha?!');
      return {
        photos: [
          {
            url: 'img/beach.jpg',
            caption: 'Amazing beach in Goa, India',
          },
          'http://placekitten.com/1024/1024',
          'img/lock.jpg',
          {
            url: 'img/monkey.jpg',
            caption: 'I met this monkey in Chinese mountains',
          },
          {
            url: 'img/mountains.jpg',
            caption: 'Beautiful mountains in Zhangjiajie, China',
          },
        ],
      };
    },
  };
</script>
