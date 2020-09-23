<template>
  <f7-page style="background: #000">
    <f7-navbar title="Thumbs Gallery" back-link="Back"></f7-navbar>
    <f7-swiper
      class="demo-swiper-gallery-top color-theme-white"
      :space-between="10"
      navigation
      :thumbs="{
        swiper: swiperThumbs,
      }"
    >
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)"
      />
      >
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)"
      />
      >
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)"
      />
      >
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)"
      />
      >
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)"
      />
      >
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)"
      />
      >
    </f7-swiper>
    <f7-swiper
      class="demo-swiper-gallery-thumbs"
      :slides-per-view="4"
      :space-between="10"
      :free-mode="true"
      :watch-slides-progress="true"
      :watch-slides-visibility="true"
      @swiper="swiperThumbs = $event"
    >
      <f7-swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)"
          class="swiper-slide-pic"
        />
      </f7-swiper-slide>
      <f7-swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)"
          class="swiper-slide-pic"
        />
      </f7-swiper-slide>
      <f7-swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)"
          class="swiper-slide-pic"
        />
      </f7-swiper-slide>
      <f7-swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)"
          class="swiper-slide-pic"
        />
      </f7-swiper-slide>
      <f7-swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)"
          class="swiper-slide-pic"
        />
      </f7-swiper-slide>
      <f7-swiper-slide>
        <div
          style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)"
          class="swiper-slide-pic"
        />
      </f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7Swiper, f7SwiperSlide } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Swiper,
    f7SwiperSlide,
  },
  data() {
    return {
      swiperThumbs: null,
    };
  },
};
</script>
