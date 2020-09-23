<template>
  <f7-page>
    <f7-navbar title="3D Cube" back-link="Back"></f7-navbar>
    <f7-swiper effect="cube" class="demo-swiper demo-swiper-cube">
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-1.jpg)"
      >
        Slide 1
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-2.jpg)"
      >
        Slide 2
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-3.jpg)"
      >
        Slide 3
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-4.jpg)"
      >
        Slide 4
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-5.jpg)"
      >
        Slide 5
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-6.jpg)"
      >
        Slide 6
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-7.jpg)"
      >
        Slide 7
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-8.jpg)"
      >
        Slide 8
      </f7-swiper-slide>
      <f7-swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-9.jpg)"
      >
        Slide 9
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
