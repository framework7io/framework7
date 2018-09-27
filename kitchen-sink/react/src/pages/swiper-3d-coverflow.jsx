import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="3D Coverflow Effect" backLink="Back"></Navbar>
    <Swiper className="demo-swiper demo-swiper-coverflow" pagination params={{
      effect: 'coverflow',
      centeredSlides: true,
      slidesPerView: 'auto',
    }}>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/1/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/2/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/3/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/4/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/5/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/6/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/7/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/8/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/9/)'}}></SwiperSlide>
    </Swiper>
  </Page>
);
