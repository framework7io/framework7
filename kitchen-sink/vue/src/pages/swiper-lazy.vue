<template>
  <f7-page>
    <f7-navbar title="Slider Lazy Loading" back-link="Back"></f7-navbar>
    <swiper-container :pagination="true" :navigation="true" class="demo-swiper-lazy">
      <swiper-slide :lazy="true">
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-1.jpg" />
      </swiper-slide>
      <swiper-slide :lazy="true">
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-2.jpg" />
      </swiper-slide>
      <swiper-slide :lazy="true">
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-3.jpg" />
      </swiper-slide>
      <swiper-slide :lazy="true">
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-4.jpg" />
      </swiper-slide>
      <swiper-slide :lazy="true">
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-5.jpg" />
      </swiper-slide>
      <swiper-slide :lazy="true">
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-6.jpg" />
      </swiper-slide>
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
