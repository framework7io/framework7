<template>
  <f7-page>
    <f7-navbar title="Zoom" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-zoom='{"enabled": true}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' class="swiper-container swiper-init demo-swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/1/"/></div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/2/"/></div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/3/"/></div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/4/"/></div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/5/"/></div>
        </div>
        <div class="swiper-slide">
          <div class="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/6/"/></div>
        </div>
      </div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
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
