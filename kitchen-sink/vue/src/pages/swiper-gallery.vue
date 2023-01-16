<template>
  <f7-page style="background: #000">
    <f7-navbar title="Thumbs Gallery" back-link="Back"></f7-navbar>
    <swiper-container
      :navigation="true"
      :space-between="10"
      :thumbs="{ swiper: `.demo-swiper-gallery-thumbs` }"
      class="demo-swiper-gallery-top color-white"
    >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)"
      ></swiper-slide>
    </swiper-container>
    <swiper-container
      slides-per-view="4"
      space-between="10"
      free-mode
      watch-slides-progress
      watch-slides-visibility
      class="demo-swiper-gallery-thumbs"
    >
      <swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)"
          class="swiper-slide-pic"
        ></div>
      </swiper-slide>
      <swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)"
          class="swiper-slide-pic"
        ></div>
      </swiper-slide>
      <swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)"
          class="swiper-slide-pic"
        ></div>
      </swiper-slide>
      <swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)"
          class="swiper-slide-pic"
        ></div>
      </swiper-slide>
      <swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)"
          class="swiper-slide-pic"
        ></div>
      </swiper-slide>
      <swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)"
          class="swiper-slide-pic"
        ></div>
      </swiper-slide>
    </swiper-container>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
  },
  data() {
    return {
      swiperThumbs: null,
    };
  },
};
</script>
