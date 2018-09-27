import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="3D Cube" backLink="Back"></Navbar>
    <Swiper className="demo-swiper demo-swiper-cube" params={{
      effect: 'cube',
    }}>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/1/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/2/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/3/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/4/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/5/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/6/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/7/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/8/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/people/9/)'}}></SwiperSlide>
    </Swiper>
  </Page>
);
