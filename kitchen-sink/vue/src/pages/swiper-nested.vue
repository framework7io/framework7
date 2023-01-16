<template>
  <f7-page>
    <f7-navbar title="Nested Swipers" back-link="Back"></f7-navbar>
    <swiper-container :pagination="true" class="demo-swiper">
      <swiper-slide>Horizontal Slide 1</swiper-slide>
      <swiper-slide>
        <swiper-container :pagination="true" direction="vertical" class="demo-swiper">
          <swiper-slide>Vertical Slide 1</swiper-slide>
          <swiper-slide>Vertical Slide 2</swiper-slide>
          <swiper-slide>Vertical Slide 3</swiper-slide>
        </swiper-container>
      </swiper-slide>
      <swiper-slide>Horizontal Slide 3</swiper-slide>
      <swiper-slide>Horizontal Slide 4</swiper-slide>
    </swiper-container>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
  },
};
</script>
