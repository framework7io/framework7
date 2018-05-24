import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Nested Swipers" backLink="Back"></Navbar>
    <Swiper className="demo-swiper" pagination>
      <SwiperSlide>Horizontal Slide 1</SwiperSlide>
      <SwiperSlide>
        <Swiper className="demo-swiper" pagination params={{ direction: 'vertical' }}>
          <SwiperSlide>Vertical Slide 1</SwiperSlide>
          <SwiperSlide>Vertical Slide 2</SwiperSlide>
          <SwiperSlide>Vertical Slide 3</SwiperSlide>
        </Swiper>
      </SwiperSlide>
      <SwiperSlide>Horizontal Slide 3</SwiperSlide>
      <SwiperSlide>Horizontal Slide 3</SwiperSlide>
    </Swiper>
  </Page>
);
