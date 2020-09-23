<template>
  <f7-page>
    <f7-navbar title="Pagination Fraction" back-link="Back"></f7-navbar>
    <f7-swiper :pagination="{ type: 'fraction' }" class="demo-swiper">
      <f7-swiper-slide>Slide 1</f7-swiper-slide>
      <f7-swiper-slide>Slide 2</f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Slide 4</f7-swiper-slide>
      <f7-swiper-slide>Slide 5</f7-swiper-slide>
      <f7-swiper-slide>Slide 6</f7-swiper-slide>
      <f7-swiper-slide>Slide 7</f7-swiper-slide>
      <f7-swiper-slide>Slide 8</f7-swiper-slide>
      <f7-swiper-slide>Slide 9</f7-swiper-slide>
      <f7-swiper-slide>Slide 10</f7-swiper-slide>
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
