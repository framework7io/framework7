<template>
  <f7-page>
    <f7-navbar title="Nested Swipers" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination-h"}' class="swiper-container swiper-init demo-swiper">
      <div class="swiper-pagination swiper-pagination-h"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Horizontal Slide 1</div>
        <div class="swiper-slide">
          <div data-pagination='{"el": ".swiper-pagination-v"}' data-direction="vertical" class="swiper-container swiper-init demo-swiper">
            <div class="swiper-pagination swiper-pagination-v"></div>
            <div class="swiper-wrapper">
              <div class="swiper-slide">Vertical Slide 1</div>
              <div class="swiper-slide">Vertical Slide 2</div>
              <div class="swiper-slide">Vertical Slide 3</div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">Horizontal Slide 3</div>
        <div class="swiper-slide">Horizontal Slide 4</div>
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
