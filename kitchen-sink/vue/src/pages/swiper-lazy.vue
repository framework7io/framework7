<template>
  <f7-page>
    <f7-navbar title="Slider Lazy Loading" back-link="Back"></f7-navbar>
    <f7-swiper pagination navigation lazy class="demo-swiper-lazy">
      <f7-swiper-slide>
        <img
          data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-1.jpg"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <img
          data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-2.jpg"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <img
          data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-3.jpg"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <img
          data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-4.jpg"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <img
          data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-5.jpg"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
      </f7-swiper-slide>
      <f7-swiper-slide>
        <img
          data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-6.jpg"
          class="swiper-lazy"
        />
        <div class="swiper-lazy-preloader"></div>
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
};
</script>
