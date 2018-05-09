<template>
  <Page>
    <Navbar title="3D Cube" backLink="Back"></Navbar>
    <div data-effect="cube" className="swiper-container swiper-init demo-swiper demo-swiper-cube">
      <div className="swiper-wrapper">
        <div style="background-image:url(http://lorempixel.com/800/800/people/1/)" className="swiper-slide">Slide 1</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/2/)" className="swiper-slide">Slide 2</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/3/)" className="swiper-slide">Slide 3</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/4/)" className="swiper-slide">Slide 4</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/5/)" className="swiper-slide">Slide 5</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/6/)" className="swiper-slide">Slide 6</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/7/)" className="swiper-slide">Slide 7</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/8/)" className="swiper-slide">Slide 8</div>
        <div style="background-image:url(http://lorempixel.com/800/800/people/9/)" className="swiper-slide">Slide 9</div>
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
