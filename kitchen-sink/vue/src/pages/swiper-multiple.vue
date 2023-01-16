<template>
  <f7-page>
    <f7-navbar title="Multiple Swipers" back-link="Back"></f7-navbar>
    <f7-block-title>1 Slide Per View, 50px Between</f7-block-title>
    <swiper-container :pagination="true" class="demo-swiper-multiple" :space-between="50">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper-container>
    <f7-block-title>2 Slides Per View, 20px Between</f7-block-title>
    <swiper-container
      :pagination="true"
      class="demo-swiper-multiple"
      :space-between="20"
      :slides-per-view="2"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper-container>
    <f7-block-title>3 Slides Per View, 10px Between</f7-block-title>
    <swiper-container
      :pagination="true"
      class="demo-swiper-multiple"
      :space-between="10"
      :slides-per-view="3"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper-container>
    <f7-block-title>Auto Slides Per View + Centered</f7-block-title>
    <swiper-container
      :pagination="true"
      class="demo-swiper-multiple demo-swiper-multiple-auto"
      :space-between="10"
      :slides-per-view="'auto'"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper-container>
    <f7-block-title>Vertical, 10px Between</f7-block-title>
    <swiper-container
      :pagination="true"
      class="demo-swiper-multiple"
      :space-between="10"
      direction="vertical"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
    </swiper-container>
    <f7-block-title>Slow speed</f7-block-title>
    <swiper-container
      :pagination="true"
      class="demo-swiper-multiple"
      :space-between="50"
      :speed="900"
    >
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
      <swiper-slide>Slide 10</swiper-slide>
    </swiper-container>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7BlockTitle } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
  },
};
</script>
