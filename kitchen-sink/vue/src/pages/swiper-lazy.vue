<template>
  <f7-page>
    <f7-navbar title="Slider Lazy Loading" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-lazy='{"enabled": true}' class="swiper-container swiper-init demo-swiper-lazy">
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/1/" class="swiper-lazy"/>
          <div class="preloader swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/2/" class="swiper-lazy"/>
          <div class="preloader swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/3/" class="swiper-lazy"/>
          <div class="preloader swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/4/" class="swiper-lazy"/>
          <div class="preloader swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/5/" class="swiper-lazy"/>
          <div class="preloader swiper-lazy-preloader"></div>
        </div>
        <div class="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/6/" class="swiper-lazy"/>
          <div class="preloader swiper-lazy-preloader"></div>
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
