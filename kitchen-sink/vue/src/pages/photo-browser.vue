<template>
  <f7-page>
    <f7-navbar title="Photo Browser" back-link></f7-navbar>
    <f7-block strong inset>
      <p>
        Photo Browser is a standalone and highly configurable component that allows to open window
        with photo viewer and navigation elements with the following features:
      </p>
      <ul>
        <li>Swiper between photos</li>
        <li>Multi-gestures support for zooming</li>
        <li>Toggle zoom by double tap on photo</li>
        <li>Single click on photo to toggle Exposition mode</li>
      </ul>
    </f7-block>
    <f7-block strong inset>
      <p>
        Photo Browser could be opened in a three ways - as a Standalone component (Popup
        modification), in Popup, and as separate Page:
      </p>
      <div class="grid grid-cols-3 grid-gap">
        <div>
          <f7-photo-browser ref="standalone" :photos="photos" :thumbs="thumbs" />
          <f7-button round fill @click="$refs.standalone.open()">Standalone</f7-button>
        </div>
        <div>
          <f7-photo-browser ref="popup" :photos="photos" :thumbs="thumbs" type="popup" />
          <f7-button round fill @click="$refs.popup.open()">Popup</f7-button>
        </div>
        <div>
          <f7-photo-browser
            ref="page"
            :photos="photos"
            :thumbs="thumbs"
            type="page"
            page-back-link-text="Back"
          />
          <f7-button round fill @click="$refs.page.open()">Page</f7-button>
        </div>
      </div>
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7PhotoBrowser, f7Block, f7Button } from 'framework7-vue';

export default {
  components: { f7Navbar, f7Page, f7PhotoBrowser, f7Block, f7Button },
  data() {
    return {
      photos: [
        { url: 'img/beach.jpg', caption: 'Amazing beach in Goa, India' },
        'http://placekitten.com/1024/1024',
        'img/lock.jpg',
        { url: 'img/monkey.jpg', caption: 'I met this monkey in Chinese mountains' },
        { url: 'img/mountains.jpg', caption: 'Beautiful mountains in Zhangjiajie, China' },
      ],
      thumbs: [
        'img/beach.jpg',
        'http://placekitten.com/1024/1024',
        'img/lock.jpg',
        'img/monkey.jpg',
        'img/mountains.jpg',
      ],
    };
  },
};
</script>
