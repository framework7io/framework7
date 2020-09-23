<template>
  <f7-page>
    <f7-navbar title="Zoom" back-link="Back"></f7-navbar>
    <f7-swiper pagination zoom navigation class="demo-swiper">
      <f7-swiper-slide zoom>
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-1.jpg" />
      </f7-swiper-slide>
      <f7-swiper-slide zoom>
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-2.jpg" />
      </f7-swiper-slide>
      <f7-swiper-slide zoom>
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-3.jpg" />
      </f7-swiper-slide>
      <f7-swiper-slide zoom>
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-4.jpg" />
      </f7-swiper-slide>
      <f7-swiper-slide zoom>
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-5.jpg" />
      </f7-swiper-slide>
      <f7-swiper-slide zoom>
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-6.jpg" />
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
