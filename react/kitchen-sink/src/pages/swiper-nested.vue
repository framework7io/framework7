<template>
  <Page>
    <Navbar title="Nested Swipers" backLink="Back"></Navbar>
    <div data-pagination='{"el": ".swiper-pagination-h"}' className="swiper-container swiper-init demo-swiper">
      <div className="swiper-pagination swiper-pagination-h"></div>
      <div className="swiper-wrapper">
        <div className="swiper-slide">Horizontal Slide 1</div>
        <div className="swiper-slide">
          <div data-pagination='{"el": ".swiper-pagination-v"}' data-direction="vertical" className="swiper-container swiper-init demo-swiper">
            <div className="swiper-pagination swiper-pagination-v"></div>
            <div className="swiper-wrapper">
              <div className="swiper-slide">Vertical Slide 1</div>
              <div className="swiper-slide">Vertical Slide 2</div>
              <div className="swiper-slide">Vertical Slide 3</div>
            </div>
          </div>
        </div>
        <div className="swiper-slide">Horizontal Slide 3</div>
        <div className="swiper-slide">Horizontal Slide 4</div>
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
  };
</script>
