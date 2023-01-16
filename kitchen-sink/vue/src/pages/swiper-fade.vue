<template>
  <f7-page>
    <f7-navbar title="Fade Effect" back-link="Back"></f7-navbar>
    <swiper-container effect="fade" :pagination="true" class="demo-swiper demo-swiper-fade">
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-1.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-2.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-3.jpg)"
      ></swiper-slide>
      <swiper-slide
        style="background-image: url(https://cdn.framework7.io/placeholder/people-800x800-4.jpg)"
      ></swiper-slide>
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
