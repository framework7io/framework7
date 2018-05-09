<template>
  <Page>
    <Navbar title="Zoom" backLink="Back"></Navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-zoom='{"enabled": true}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' className="swiper-container swiper-init demo-swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div className="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/1/"/></div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/2/"/></div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/3/"/></div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/4/"/></div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/5/"/></div>
        </div>
        <div className="swiper-slide">
          <div className="swiper-zoom-container"><img src="http://lorempixel.com/800/800/nature/6/"/></div>
        </div>
      </div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
      <div className="swiper-pagination"></div>
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
