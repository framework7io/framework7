<template>
  <Page>
    <Navbar title="Multiple Swipers" backLink="Back"></Navbar>
    <BlockTitle>1 Slide Per View, 50px Between</BlockTitle>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="50" className="swiper-container swiper-init demo-swiper-multiple">
      <div className="swiper-pagination"></div>
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
    <BlockTitle>2 Slides Per View, 20px Between</BlockTitle>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="20" data-slides-per-view="2" className="swiper-container swiper-init demo-swiper-multiple">
      <div className="swiper-pagination"></div>
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
    <BlockTitle>3 Slides Per View, 10px Between</BlockTitle>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" data-slides-per-view="3" className="swiper-container swiper-init demo-swiper-multiple">
      <div className="swiper-pagination"></div>
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
    <BlockTitle>Auto Slides Per View + Centered</BlockTitle>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" data-slides-per-view="auto" data-centered-slides="true" className="swiper-container swiper-init demo-swiper-multiple demo-swiper-multiple-auto">
      <div className="swiper-pagination"></div>
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
    <BlockTitle>Vertical, 10px Between</BlockTitle>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" data-direction="vertical" className="swiper-container swiper-init demo-swiper-multiple">
      <div className="swiper-pagination"></div>
      <div className="swiper-wrapper">
        <div className="swiper-slide">Slide 1</div>
        <div className="swiper-slide">Slide 2</div>
        <div className="swiper-slide">Slide 3</div>
        <div className="swiper-slide">Slide 4</div>
        <div className="swiper-slide">Slide 5</div>
      </div>
    </div>
    <BlockTitle>Slow speed</BlockTitle>
    <div data-speed="900" data-pagination='{"el": ".swiper-pagination"}' data-space-between="50" className="swiper-container swiper-init demo-swiper-multiple">
      <div className="swiper-pagination"></div>
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
  import { Navbar, Page, BlockTitle } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
      BlockTitle,
    }
  }
</script>
