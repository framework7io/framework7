<template>
  <f7-page>
    <f7-navbar title="3D Flip Effect" back-link="Back"></f7-navbar>
    <swiper-container
      effect="flip"
      :pagination="true"
      slides-per-view="auto"
      :centered-slides="true"
      class="demo-swiper demo-swiper-cube"
    >
      <div slot="slide-0" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-1.jpg" />
        <span>Slide 1</span>
      </div>
      <div slot="slide-1" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-2.jpg" />
        <span>Slide 2</span>
      </div>
      <div slot="slide-2" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-3.jpg" />
        <span>Slide 3</span>
      </div>
      <div slot="slide-3" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-4.jpg" />
        <span>Slide 4</span>
      </div>
      <div slot="slide-4" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-5.jpg" />
        <span>Slide 5</span>
      </div>
      <div slot="slide-5" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-6.jpg" />
        <span>Slide 6</span>
      </div>
      <div slot="slide-6" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-7.jpg" />
        <span>Slide 7</span>
      </div>
      <div slot="slide-7" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-8.jpg" />
        <span>Slide 8</span>
      </div>
      <div slot="slide-8" class="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-9.jpg" />
        <span>Slide 9</span>
      </div>
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
