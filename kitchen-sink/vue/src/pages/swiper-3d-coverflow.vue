<template>
  <f7-page>
    <f7-navbar title="3D Coverflow Effect" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-effect="coverflow" data-slides-per-view="auto" data-centered-slides="true" class="swiper-container swiper-init demo-swiper demo-swiper-coverflow">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div style="background-image:url(http://lorempixel.com/800/800/nature/1/)" class="swiper-slide">Slide 1</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/2/)" class="swiper-slide">Slide 2</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/3/)" class="swiper-slide">Slide 3</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/4/)" class="swiper-slide">Slide 4</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/5/)" class="swiper-slide">Slide 5</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/6/)" class="swiper-slide">Slide 6</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/7/)" class="swiper-slide">Slide 7</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/8/)" class="swiper-slide">Slide 8</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/9/)" class="swiper-slide">Slide 9</div>
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
