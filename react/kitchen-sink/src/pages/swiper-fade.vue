<template>
  <Page>
    <Navbar title="Fade Effect" backLink="Back"></Navbar>
    <div data-pagination='{"el": ".swiper-pagination"}' data-effect="fade" className="swiper-container swiper-init demo-swiper demo-swiper-fade">
      <div className="swiper-pagination"></div>
      <div className="swiper-wrapper">
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/1/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/2/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/3/)" className="swiper-slide"></div>
        <div style="background-image:url(http://lorempixel.com/1024/1024/people/4/)" className="swiper-slide"></div>
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
