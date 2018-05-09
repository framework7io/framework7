<template>
  <Page>
    <Navbar title="3D Coverflow Effect" backLink="Back"></Navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-effect="coverflow" data-slides-per-view="auto" data-centered-slides="true" className="swiper-container swiper-init demo-swiper demo-swiper-coverflow">
      <div className="swiper-pagination"></div>
      <div className="swiper-wrapper">
        <div style="background-image:url(http://lorempixel.com/800/800/nature/1/)" className="swiper-slide">Slide 1</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/2/)" className="swiper-slide">Slide 2</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/3/)" className="swiper-slide">Slide 3</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/4/)" className="swiper-slide">Slide 4</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/5/)" className="swiper-slide">Slide 5</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/6/)" className="swiper-slide">Slide 6</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/7/)" className="swiper-slide">Slide 7</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/8/)" className="swiper-slide">Slide 8</div>
        <div style="background-image:url(http://lorempixel.com/800/800/nature/9/)" className="swiper-slide">Slide 9</div>
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
