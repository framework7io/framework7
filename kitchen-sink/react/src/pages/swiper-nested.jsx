import React from 'react';
import { Navbar, Page } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Nested Swipers" backLink="Back"></Navbar>
    <swiper-container pagination class="demo-swiper">
      <swiper-slide>Horizontal Slide 1</swiper-slide>
      <swiper-slide>
        <swiper-container pagination direction="vertical" class="demo-swiper">
          <swiper-slide>Vertical Slide 1</swiper-slide>
          <swiper-slide>Vertical Slide 2</swiper-slide>
          <swiper-slide>Vertical Slide 3</swiper-slide>
        </swiper-container>
      </swiper-slide>
      <swiper-slide>Horizontal Slide 3</swiper-slide>
      <swiper-slide>Horizontal Slide 4</swiper-slide>
    </swiper-container>
  </Page>
);
