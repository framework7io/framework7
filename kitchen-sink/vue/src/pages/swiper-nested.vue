<template>
  <f7-page>
    <f7-navbar title="Nested Swipers" back-link="Back"></f7-navbar>
    <f7-swiper :pagination="{ el: '.swiper-pagination-h' }" class="demo-swiper">
      <div class="swiper-pagination swiper-pagination-h"></div>
      <f7-swiper-slide>Horizontal Slide 1</f7-swiper-slide>
      <f7-swiper-slide>
        <f7-swiper
          :pagination="{ el: '.swiper-pagination-v' }"
          direction="vertical"
          class="demo-swiper"
        >
          <div class="swiper-pagination swiper-pagination-v"></div>
          <f7-swiper-slide>Vertical Slide 1</f7-swiper-slide>
          <f7-swiper-slide>Vertical Slide 2</f7-swiper-slide>
          <f7-swiper-slide>Vertical Slide 3</f7-swiper-slide>
        </f7-swiper>
      </f7-swiper-slide>
      <f7-swiper-slide>Horizontal Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Horizontal Slide 4</f7-swiper-slide>
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
