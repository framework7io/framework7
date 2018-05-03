<template>
  <f7-page>
    <f7-navbar title="Fade Effect" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-effect="fade" class="swiper-container swiper-init demo-swiper demo-swiper-fade">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/1/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/2/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/3/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/4/)" class="swiper-slide"></div>
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
