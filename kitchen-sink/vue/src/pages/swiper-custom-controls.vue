<template>
  <f7-page>
    <f7-navbar title="Custom Controls" back-link="Back"></f7-navbar>
    <div class="demo-swiper-custom">
      <div data-pagination='{"el": ".swiper-pagination", "clickable": true}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-space-between="0" class="swiper-container swiper-init">
        <div class="swiper-pagination"></div>
        <div class="swiper-wrapper">
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-1.jpg)" class="swiper-slide"></div>
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-2.jpg)" class="swiper-slide"></div>
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-3.jpg)" class="swiper-slide"></div>
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-4.jpg)" class="swiper-slide"></div>
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-5.jpg)" class="swiper-slide"></div>
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-6.jpg)" class="swiper-slide"></div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
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
