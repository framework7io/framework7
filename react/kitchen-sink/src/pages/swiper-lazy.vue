<template>
  <Page>
    <Navbar title="Slider Lazy Loading" backLink="Back"></Navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-lazy='{"enabled": true}' className="swiper-container swiper-init demo-swiper-lazy">
      <div className="swiper-wrapper">
        <div className="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/1/" className="swiper-lazy"/>
          <div className="preloader swiper-lazy-preloader"></div>
        </div>
        <div className="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/2/" className="swiper-lazy"/>
          <div className="preloader swiper-lazy-preloader"></div>
        </div>
        <div className="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/3/" className="swiper-lazy"/>
          <div className="preloader swiper-lazy-preloader"></div>
        </div>
        <div className="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/4/" className="swiper-lazy"/>
          <div className="preloader swiper-lazy-preloader"></div>
        </div>
        <div className="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/5/" className="swiper-lazy"/>
          <div className="preloader swiper-lazy-preloader"></div>
        </div>
        <div className="swiper-slide"><img data-src="http://lorempixel.com/1600/1200/nature/6/" className="swiper-lazy"/>
          <div className="preloader swiper-lazy-preloader"></div>
        </div>
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>
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
  };
</script>
