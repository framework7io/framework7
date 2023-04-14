<template>
  <f7-page>
    <f7-navbar title="Swiper Slider" back-link="Back"></f7-navbar>
    <div class="block">
      <p>
        Framework7 comes with powerful and most modern touch slider ever -
        <a href="https://swiperjs.com" class="external" target="_blank">Swiper Slider</a>
        with super flexible configuration and lot, lot of features. Just check the following demos:
      </p>
    </div>
    <f7-list strong inset-md outline-ios dividers-ios>
      <f7-list-item link="swiper-horizontal/" title="Swiper Horizontal" />
      <f7-list-item link="swiper-vertical/" title="Swiper Vertical" />
      <f7-list-item link="swiper-space-between/" title="Space Between Slides" />
      <f7-list-item link="swiper-multiple/" title="Multiple Per Page" />
      <f7-list-item link="swiper-nested/" title="Nested Swipers" />
      <f7-list-item link="swiper-loop/" title="Infinite Loop Mode" />
      <f7-list-item link="swiper-3d-cube/" title="3D Cube Effect" />
      <f7-list-item link="swiper-3d-coverflow/" title="3D Coverflow Effect" />
      <f7-list-item link="swiper-3d-flip/" title="3D Flip Effect" />
      <f7-list-item link="swiper-fade/" title="Fade Effect" />
      <f7-list-item link="swiper-scrollbar/" title="With Scrollbar" />
      <f7-list-item link="swiper-gallery/" title="Thumbs Gallery" />
      <f7-list-item link="swiper-parallax/" title="Parallax" />
      <f7-list-item link="swiper-lazy/" title="Lazy Loading" />
      <f7-list-item link="swiper-pagination-progress/" title="Progress Pagination" />
      <f7-list-item link="swiper-pagination-fraction/" title="Fraction Pagination" />
      <f7-list-item link="swiper-zoom/" title="Zoom" />
    </f7-list>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7List, f7ListItem } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7List,
    f7ListItem,
  },
};
</script>
