import React from 'react';
import { Navbar, Page } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Swiper Horizontal" backLink="Back"></Navbar>
    <swiper-container pagination pagination-hide-on-click class="demo-swiper" direction="vertical">
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
  </Page>
);
