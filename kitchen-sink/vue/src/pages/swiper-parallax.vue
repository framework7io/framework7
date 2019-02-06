<template>
  <f7-page>
    <f7-navbar title="Parallax" back-link="Back"></f7-navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-parallax="true" data-speed="600" class="swiper-container swiper-init demo-swiper-parallax">
      <div data-swiper-parallax="-23%" style="background-image:url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-2.jpg)" class="swiper-parallax-bg"></div>
      <div class="swiper-pagination color-white"></div>
      <div class="swiper-button-next color-white"></div>
      <div class="swiper-button-prev color-white"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div data-swiper-parallax="-300" class="swiper-slide-title">Slide 1</div>
          <div data-swiper-parallax="-200" class="swiper-slide-subtitle">Subtitle</div>
          <div data-swiper-parallax="-100" class="swiper-slide-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <div data-swiper-parallax="-300" class="swiper-slide-title">Slide 2</div>
          <div data-swiper-parallax="-200" class="swiper-slide-subtitle">Subtitle</div>
          <div data-swiper-parallax="-100" class="swiper-slide-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </div>
        <div class="swiper-slide">
          <div data-swiper-parallax="-300" class="swiper-slide-title">Slide 3</div>
          <div data-swiper-parallax="-200" class="swiper-slide-subtitle">Subtitle</div>
          <div data-swiper-parallax="-100" class="swiper-slide-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </div>
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
