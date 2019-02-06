<template>
  <f7-page style="background: #000" @page:beforeremove="onPageBeforeRemove" @page:init="onPageInit">
    <f7-navbar title="Thumbs Gallery" back-link="Back"></f7-navbar>
    <div class="swiper-container demo-swiper-gallery-top">
      <div class="swiper-wrapper">
        <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)" class="swiper-slide"></div>
        <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)" class="swiper-slide"></div>
        <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)" class="swiper-slide"></div>
        <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)" class="swiper-slide"></div>
        <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)" class="swiper-slide"></div>
        <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)" class="swiper-slide"></div>
      </div>
      <div class="swiper-button-next color-white"></div>
      <div class="swiper-button-prev color-white"></div>
    </div>
    <div class="swiper-container demo-swiper-gallery-thumbs">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)" class="swiper-slide-pic"></div>
        </div>
        <div class="swiper-slide">
          <div style="background-image:url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)" class="swiper-slide-pic"></div>
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
    methods: {
      onPageBeforeRemove() {
        const self = this;
        self.swiperTop.destroy();
        self.swiperThumbs.destroy();
      },
      onPageInit() {
        const self = this;
        const swiperThumbs = self.$f7.swiper.create('.demo-swiper-gallery-thumbs', {
          slidesPerView: 4,
          spaceBetween: 10,
          freeMode: true,
          watchSlidesProgress: true,
          watchSlidesVisibility: true,
        });
        const swiperTop = self.$f7.swiper.create('.demo-swiper-gallery-top', {
          spaceBetween: 10,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          thumbs: {
            swiper: swiperThumbs,
          },
        });

        self.swiperTop = swiperTop;
        self.swiperThumbs = swiperThumbs;
      },
    },
  };
</script>
