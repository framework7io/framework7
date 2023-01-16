<template>
  <f7-page>
    <f7-navbar title="Zoom" back-link="Back"></f7-navbar>
    <swiper-container :pagination="true" :zoom="true" :navigation="true" class="demo-swiper">
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-1.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-2.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-3.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-4.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-5.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-6.jpg" />
        </div>
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
};
</script>
