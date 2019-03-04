<template>
  <f7-page>
    <f7-navbar title="Photo Browser" back-link="Back"></f7-navbar>
    <f7-block>
      <p>Photo Browser is a standalone and highly configurable component that allows to open window with photo viewer and navigation elements with the following features:</p>
      <ul>
        <li>Swiper between photos</li>
        <li>Multi-gestures support for zooming</li>
        <li>Toggle zoom by double tap on photo</li>
        <li>Single click on photo to toggle Exposition mode</li>
      </ul>
    </f7-block>
    <f7-block>
      <p>Photo Browser could be opened in a three ways - as a Standalone component (Popup modification), in Popup, and as separate Page:</p>
      <f7-row>
        <f7-col>
          <f7-photo-browser :photos="photos" ref="standalone"></f7-photo-browser>
          <f7-button fill @click="$refs.standalone.open()">Standalone</f7-button>
        </f7-col>
        <f7-col>
          <f7-photo-browser :photos="photos" type="popup" ref="popup"></f7-photo-browser>
          <f7-button fill @click="$refs.popup.open()">Popup</f7-button>
        </f7-col>
        <f7-col>
          <f7-photo-browser :photos="photos" type="page" back-link-text="Back" ref="page"></f7-photo-browser>
          <f7-button fill @click="$refs.page.open()">Page</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block>
      <p>Photo Browser suppots 2 default themes - default Light (like in previous examples) and Dark theme. Here is a Dark theme examples:</p>
      <f7-row>
        <f7-col>
          <f7-photo-browser :photos="photos" theme="dark" ref="standaloneDark"></f7-photo-browser>
          <f7-button fill @click="$refs.standaloneDark.open()">Standalone</f7-button>
        </f7-col>
        <f7-col>
          <f7-photo-browser :photos="photos" theme="dark" type="popup" ref="popupDark"></f7-photo-browser>
          <f7-button fill @click="$refs.popupDark.open()">Popup</f7-button>
        </f7-col>
        <f7-col>
          <f7-photo-browser :photos="photos" theme="dark" type="page" back-link-text="Back" ref="pageDark"></f7-photo-browser>
          <f7-button fill @click="$refs.pageDark.open()">Page</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7PhotoBrowser, f7Block, f7Row, f7Col, f7Button } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7PhotoBrowser,
      f7Block,
      f7Row,
      f7Col,
      f7Button,
    },
    data() {
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
