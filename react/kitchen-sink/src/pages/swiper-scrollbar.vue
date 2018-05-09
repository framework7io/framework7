<template>
  <Page>
    <Navbar title="Scrollbar" backLink="Back"></Navbar>
    <div data-scrollbar='{"el": ".swiper-scrollbar"}' className="swiper-container swiper-init demo-swiper">
      <div className="swiper-pagination"></div>
      <div className="swiper-scrollbar"></div>
      <div className="swiper-wrapper">
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
        <div className="swiper-slide">Slide 4</div>
        <div className="swiper-slide">Slide 5</div>
        <div className="swiper-slide">Slide 6</div>
        <div className="swiper-slide">Slide 7</div>
        <div className="swiper-slide">Slide 8</div>
        <div className="swiper-slide">Slide 9</div>
        <div className="swiper-slide">Slide 10</div>
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
