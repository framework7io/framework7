<template>
  <Page>
    <Navbar title="Custom Controls" backLink="Back"></Navbar>
    <div className="demo-swiper-custom">
      <div data-pagination='{"el": ".swiper-pagination", "clickable": true}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-space-between="0" className="swiper-container swiper-init">
        <div className="swiper-pagination"></div>
        <div className="swiper-wrapper">
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/1/)" className="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/2/)" className="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/3/)" className="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/4/)" className="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/5/)" className="swiper-slide"></div>
          <div style="background-image:url(http://lorempixel.com/1024/1024/nightlife/6/)" className="swiper-slide"></div>
        </div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
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
