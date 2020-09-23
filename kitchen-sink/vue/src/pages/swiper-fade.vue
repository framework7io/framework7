<template>
  <f7-page>
    <f7-navbar title="Fade Effect" back-link="Back"></f7-navbar>
    <f7-swiper pagination effect="fade" class="demo-swiper demo-swiper-fade">
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-1.jpg)"
      ></f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-2.jpg)"
      ></f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-3.jpg)"
      ></f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-4.jpg)"
      ></f7-swiper-slide>
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
