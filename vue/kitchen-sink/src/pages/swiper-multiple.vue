<template>
  <f7-page>
    <f7-navbar title="Multiple Swipers" back-link="Back"></f7-navbar>
    <f7-block-title>1 Slide Per View, 50px Between</f7-block-title>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="50" class="swiper-container swiper-init demo-swiper-multiple">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
    </div>
    <f7-block-title>2 Slides Per View, 20px Between</f7-block-title>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="20" data-slides-per-view="2" class="swiper-container swiper-init demo-swiper-multiple">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
    </div>
    <f7-block-title>3 Slides Per View, 10px Between</f7-block-title>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" data-slides-per-view="3" class="swiper-container swiper-init demo-swiper-multiple">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
    </div>
    <f7-block-title>Auto Slides Per View + Centered</f7-block-title>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" data-slides-per-view="auto" data-centered-slides="true" class="swiper-container swiper-init demo-swiper-multiple demo-swiper-multiple-auto">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
    </div>
    <f7-block-title>Vertical, 10px Between</f7-block-title>
    <div data-pagination='{"el": ".swiper-pagination"}' data-space-between="10" data-direction="vertical" class="swiper-container swiper-init demo-swiper-multiple">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
      </div>
    </div>
    <f7-block-title>Slow speed</f7-block-title>
    <div data-speed="900" data-pagination='{"el": ".swiper-pagination"}' data-space-between="50" class="swiper-container swiper-init demo-swiper-multiple">
      <div class="swiper-pagination"></div>
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
    </div>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
    }
  }
</script>
