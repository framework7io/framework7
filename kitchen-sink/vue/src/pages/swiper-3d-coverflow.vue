<template>
  <f7-page>
    <f7-navbar title="3D Coverflow Effect" back-link="Back"></f7-navbar>
    <swiper-container
      effect="coverflow"
      :pagination="true"
      slides-per-view="auto"
      :centered-slides="true"
      class="demo-swiper demo-swiper-coverflow"
    >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)"
        >Slide 1</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)"
        >Slide 2</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)"
        >Slide 3</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)"
        >Slide 4</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)"
        >Slide 5</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)"
        >Slide 6</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-7.jpg)"
        >Slide 7</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-8.jpg)"
        >Slide 8</swiper-slide
      >
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-9.jpg)"
        >Slide 9</swiper-slide
      >
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
