<template>
  <f7-page>
    <f7-navbar title="Multiple Swipers" back-link="Back"></f7-navbar>
    <f7-block-title>1 Slide Per View, 50px Between</f7-block-title>
    <f7-swiper pagination :space-between="50" class="demo-swiper-multiple">
      <f7-swiper-slide>Slide 1</f7-swiper-slide>
      <f7-swiper-slide>Slide 2</f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Slide 4</f7-swiper-slide>
      <f7-swiper-slide>Slide 5</f7-swiper-slide>
      <f7-swiper-slide>Slide 6</f7-swiper-slide>
      <f7-swiper-slide>Slide 7</f7-swiper-slide>
      <f7-swiper-slide>Slide 8</f7-swiper-slide>
      <f7-swiper-slide>Slide 9</f7-swiper-slide>
      <f7-swiper-slide>Slide 10</f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>2 Slides Per View, 20px Between</f7-block-title>
    <f7-swiper pagination :space-between="20" :slides-per-view="2" class="demo-swiper-multiple">
      <f7-swiper-slide>Slide 1</f7-swiper-slide>
      <f7-swiper-slide>Slide 2</f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Slide 4</f7-swiper-slide>
      <f7-swiper-slide>Slide 5</f7-swiper-slide>
      <f7-swiper-slide>Slide 6</f7-swiper-slide>
      <f7-swiper-slide>Slide 7</f7-swiper-slide>
      <f7-swiper-slide>Slide 8</f7-swiper-slide>
      <f7-swiper-slide>Slide 9</f7-swiper-slide>
      <f7-swiper-slide>Slide 10</f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>3 Slides Per View, 10px Between</f7-block-title>
    <f7-swiper pagination :space-between="10" :slides-per-view="3" class="demo-swiper-multiple">
      <f7-swiper-slide>Slide 1</f7-swiper-slide>
      <f7-swiper-slide>Slide 2</f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Slide 4</f7-swiper-slide>
      <f7-swiper-slide>Slide 5</f7-swiper-slide>
      <f7-swiper-slide>Slide 6</f7-swiper-slide>
      <f7-swiper-slide>Slide 7</f7-swiper-slide>
      <f7-swiper-slide>Slide 8</f7-swiper-slide>
      <f7-swiper-slide>Slide 9</f7-swiper-slide>
      <f7-swiper-slide>Slide 10</f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>Auto Slides Per View + Centered</f7-block-title>
    <f7-swiper
      pagination
      :space-between="10"
      :slides-per-view="'auto'"
      centered-slides
      class="demo-swiper-multiple demo-swiper-multiple-auto"
    >
      <f7-swiper-slide>Slide 1</f7-swiper-slide>
      <f7-swiper-slide>Slide 2</f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Slide 4</f7-swiper-slide>
      <f7-swiper-slide>Slide 5</f7-swiper-slide>
      <f7-swiper-slide>Slide 6</f7-swiper-slide>
      <f7-swiper-slide>Slide 7</f7-swiper-slide>
      <f7-swiper-slide>Slide 8</f7-swiper-slide>
      <f7-swiper-slide>Slide 9</f7-swiper-slide>
      <f7-swiper-slide>Slide 10</f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>Vertical, 10px Between</f7-block-title>
    <f7-swiper pagination :space-between="10" direction="vertical" class="demo-swiper-multiple">
      <f7-swiper-slide>Slide 1</f7-swiper-slide>
      <f7-swiper-slide>Slide 2</f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Slide 4</f7-swiper-slide>
      <f7-swiper-slide>Slide 5</f7-swiper-slide>
    </f7-swiper>
    <f7-block-title>Slow speed</f7-block-title>
    <f7-swiper :speed="900" pagination :space-between="50" class="demo-swiper-multiple">
      <f7-swiper-slide>Slide 1</f7-swiper-slide>
      <f7-swiper-slide>Slide 2</f7-swiper-slide>
      <f7-swiper-slide>Slide 3</f7-swiper-slide>
      <f7-swiper-slide>Slide 4</f7-swiper-slide>
      <f7-swiper-slide>Slide 5</f7-swiper-slide>
      <f7-swiper-slide>Slide 6</f7-swiper-slide>
      <f7-swiper-slide>Slide 7</f7-swiper-slide>
      <f7-swiper-slide>Slide 8</f7-swiper-slide>
      <f7-swiper-slide>Slide 9</f7-swiper-slide>
      <f7-swiper-slide>Slide 10</f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7BlockTitle, f7Swiper, f7SwiperSlide } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Swiper,
    f7SwiperSlide,
  },
};
</script>
