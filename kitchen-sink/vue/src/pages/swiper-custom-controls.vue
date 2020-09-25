<template>
  <f7-page>
    <f7-navbar title="Custom Controls" back-link="Back"></f7-navbar>
    <div class="demo-swiper-custom">
      <f7-swiper :pagination="{ clickable: true }" navigation :space-between="0">
        <f7-swiper-slide
          style="
            background-image: url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-1.jpg);
          "
        ></f7-swiper-slide>
        <f7-swiper-slide
          style="
            background-image: url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-2.jpg);
          "
        ></f7-swiper-slide>
        <f7-swiper-slide
          style="
            background-image: url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-3.jpg);
          "
        ></f7-swiper-slide>
        <f7-swiper-slide
          style="
            background-image: url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-4.jpg);
          "
        ></f7-swiper-slide>
        <f7-swiper-slide
          style="
            background-image: url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-5.jpg);
          "
        ></f7-swiper-slide>
        <f7-swiper-slide
          style="
            background-image: url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-6.jpg);
          "
        ></f7-swiper-slide>
      </f7-swiper>
    </div>
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
