<template>
  <Page>
    <Navbar title="Parallax" backLink="Back"></Navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-navigation='{"nextEl": ".swiper-button-next", "prevEl": ".swiper-button-prev"}' data-parallax="true" data-speed="600" className="swiper-container swiper-init demo-swiper-parallax">
      <div data-swiper-parallax="-23%" style="background-image:url(http://lorempixel.com/900/600/nightlife/2/)" className="swiper-parallax-bg"></div>
      <div className="swiper-pagination color-white"></div>
      <div className="swiper-button-next color-white"></div>
      <div className="swiper-button-prev color-white"></div>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <div data-swiper-parallax="-300" className="swiper-slide-title">Slide 1</div>
          <div data-swiper-parallax="-200" className="swiper-slide-subtitle">Subtitle</div>
          <div data-swiper-parallax="-100" className="swiper-slide-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </div>
        <div className="swiper-slide">
          <div data-swiper-parallax="-300" className="swiper-slide-title">Slide 2</div>
          <div data-swiper-parallax="-200" className="swiper-slide-subtitle">Subtitle</div>
          <div data-swiper-parallax="-100" className="swiper-slide-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
        </div>
        <div className="swiper-slide">
          <div data-swiper-parallax="-300" className="swiper-slide-title">Slide 3</div>
          <div data-swiper-parallax="-200" className="swiper-slide-subtitle">Subtitle</div>
          <div data-swiper-parallax="-100" className="swiper-slide-text">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
          </div>
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
  };
</script>
