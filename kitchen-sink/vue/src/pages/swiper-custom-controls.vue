<template>
  <f7-page>
    <f7-navbar title="Custom Controls" back-link="Back"></f7-navbar>
    <div class="demo-swiper-custom">
      <div data-pagination='{"el": ".swiper-pagination", "clickable": true}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-space-between="0" class="swiper-container swiper-init">
        <div class="swiper-pagination"></div>
        <div class="swiper-wrapper">
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/1/)" class="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/2/)" class="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/3/)" class="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/4/)" class="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/5/)" class="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/6/)" class="swiper-slide"></div>
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
