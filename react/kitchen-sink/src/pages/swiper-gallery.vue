<template>
  <Page style="background: #000">
    <Navbar title="Two Way Control Gallery" backLink="Back"></Navbar>
    <div className="swiper-container demo-swiper-gallery-top">
      <div className="swiper-wrapper">
        <div style="background-image:url(http://lorempixel.com/800/800/nature/1/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/2/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/3/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/4/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/5/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/6/)" className="swiper-slide"></div>
      </div>
      <div className="swiper-button-next color-white"></div>
      <div className="swiper-button-prev color-white"></div>
    </div>
    <div className="swiper-container demo-swiper-gallery-thumbs">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/1/)" className="swiper-slide-pic"></div>
        </div>
        <div className="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/2/)" className="swiper-slide-pic"></div>
        </div>
        <div className="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/3/)" className="swiper-slide-pic"></div>
        </div>
        <div className="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/4/)" className="swiper-slide-pic"></div>
        </div>
        <div className="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/5/)" className="swiper-slide-pic"></div>
        </div>
        <div className="swiper-slide">
          <div style="background-image:url(http://lorempixel.com/800/800/nature/6/)" className="swiper-slide-pic"></div>
        </div>
      </div>
    </div>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
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
