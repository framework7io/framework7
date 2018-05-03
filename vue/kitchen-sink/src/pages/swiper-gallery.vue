<template>
  <f7-page style="background: #000">
    <f7-navbar title="Two Way Control Gallery" back-link="Back"></f7-navbar>
    <div class="swiper-container demo-swiper-gallery-top">
      <div class="swiper-wrapper">
        <div style="background-image:url(http://lorempixel.com/800/800/nature/1/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/2/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/3/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/4/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/5/)" class="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/6/)" class="swiper-slide"></div>
      </div>
      <div class="swiper-button-next color-white"></div>
      <div class="swiper-button-prev color-white"></div>
    </div>
    <div class="swiper-container demo-swiper-gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/1/)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/2/)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/3/)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/4/)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/5/)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/6/)" class="swiper-slide-pic"></div>
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
    on: {
      pageBeforeRemove() {
        const self = this;
        self.swiperTop.destroy();
        self.swiperThumbs.destroy();
      },
      pageInit() {
        const self = this;
        const swiperTop = self.$f7.swiper.create('.demo-swiper-gallery-top', {
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        const swiperThumbs = self.$f7.swiper.create('.demo-swiper-gallery-thumbs', {
          slidesPerView: 'auto',
          spaceBetween: 10,
          centeredSlides: true,
          touchRatio: 0.2,
          slideToClickedSlide: true,
        });
        swiperTop.controller.control = swiperThumbs;
        swiperThumbs.controller.control = swiperTop;

        self.swiperTop = swiperTop;
        self.swiperThumbs = swiperThumbs;
      },
    },
  };
</script>
