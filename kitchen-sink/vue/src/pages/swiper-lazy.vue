<template>
  <f7-page>
    <f7-navbar title="Slider Lazy Loading" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-lazy='{"enabled": true}' class="swiper-container swiper-init demo-swiper-lazy">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-1.jpg" class="swiper-lazy"/>
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-2.jpg" class="swiper-lazy"/>
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-3.jpg" class="swiper-lazy"/>
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-4.jpg" class="swiper-lazy"/>
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-5.jpg" class="swiper-lazy"/>
          <div class="swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-6.jpg" class="swiper-lazy"/>
          <div class="swiper-lazy-preloader"></div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
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
