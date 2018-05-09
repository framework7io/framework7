<template>
  <Page>
    <Navbar title="Swiper Slider" backLink="Back"></Navbar>
    <div className="block">
      <p>
        Framework7 comes with powerful and most modern touch slider ever -
        <a href="http://idangero.us/swiper" className="external" target="_blank">Swiper Slider</a>
        with super flexible configuration and lot, lot of features. Just check the following demos:
      </p>
    </div>
    <div className="list links-list">
      <ul>
        <li>
          <a href="swiper-horizontal/">Swiper Horizontal</a>
        </li>
        <li>
          <a href="swiper-vertical/">Swiper Vertical</a>
        </li>
        <li>
          <a href="swiper-space-between/">Space Between Slides</a>
        </li>
        <li>
          <a href="swiper-multiple/">Multiple Per Page</a>
        </li>
        <li>
          <a href="swiper-nested/">Nested Swipers</a>
        </li>
        <li>
          <a href="swiper-loop/">Infinite Loop Mode</a>
        </li>
        <li>
          <a href="swiper-3d-cube/">3D Cube Effect</a>
        </li>
        <li>
          <a href="swiper-3d-coverflow/">3D Coverflow Effect</a>
        </li>
        <li>
          <a href="swiper-3d-flip/">3D Flip Effect</a>
        </li>
        <li>
          <a href="swiper-fade/">Fade Effect</a>
        </li>
        <li>
          <a href="swiper-scrollbar/">With Scrollbar</a>
        </li>
        <li>
          <a href="swiper-gallery/">Two Way Control Gallery</a>
        </li>
        <li>
          <a href="swiper-custom-controls/">Custom Controls</a>
        </li>
        <li>
          <a href="swiper-parallax/">Parallax</a>
        </li>
        <li>
          <a href="swiper-lazy/">Lazy Loading</a>
        </li>
        <li>
          <a href="swiper-pagination-progress/">Progress Pagination</a>
        </li>
        <li>
          <a href="swiper-pagination-fraction/">Fraction Pagination</a>
        </li>
        <li>
          <a href="swiper-zoom/">Zoom</a>
        </li>
      </ul>
    </div>
  </Page>
</template>
<script>
  import React from 'react';
  import { Navbar, Page } from 'framework7-react';

  export default {
    components: {
      Navbar,
      Page,
    },
  };
</script>
