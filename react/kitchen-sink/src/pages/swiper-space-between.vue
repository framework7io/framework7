<template>
  <Page>
    <Navbar title="Space Between Slides" backLink="Back"></Navbar>
    <div data-pagination='{"el": ".swiper-pagination", "hideOnClick": true}' data-space-between="50" className="swiper-container swiper-init demo-swiper">
      <div className="swiper-pagination"></div>
      <div className="swiper-wrapper">
        <div className="swiper-slide ks-slide-white">Slide 1</div>
        <div className="swiper-slide ks-slide-white">Slide 2</div>
        <div className="swiper-slide ks-slide-white">Slide 3</div>
        <div className="swiper-slide ks-slide-white">Slide 4</div>
        <div className="swiper-slide ks-slide-white">Slide 5</div>
        <div className="swiper-slide ks-slide-white">Slide 6</div>
        <div className="swiper-slide ks-slide-white">Slide 7</div>
        <div className="swiper-slide ks-slide-white">Slide 8</div>
        <div className="swiper-slide ks-slide-white">Slide 9</div>
        <div className="swiper-slide ks-slide-white">Slide 10</div>
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
