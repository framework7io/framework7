<template>
  <f7-page>
    <f7-navbar title="Space Between Slides" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination", "hideOnClick": true}' data-space-between="50" class="swiper-container swiper-init demo-swiper">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide ks-slide-white">Slide 1</div>
        <div class="swiper-slide ks-slide-white">Slide 2</div>
        <div class="swiper-slide ks-slide-white">Slide 3</div>
        <div class="swiper-slide ks-slide-white">Slide 4</div>
        <div class="swiper-slide ks-slide-white">Slide 5</div>
        <div class="swiper-slide ks-slide-white">Slide 6</div>
        <div class="swiper-slide ks-slide-white">Slide 7</div>
        <div class="swiper-slide ks-slide-white">Slide 8</div>
        <div class="swiper-slide ks-slide-white">Slide 9</div>
        <div class="swiper-slide ks-slide-white">Slide 10</div>
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
