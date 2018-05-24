import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="Fade Effect" backLink="Back"></Navbar>
    <Swiper className="demo-swiper demo-swiper-fade" pagination params={{
      effect: 'fade',
    }}>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/people/1/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/people/2/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/people/3/)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/people/4/)'}}></SwiperSlide>
    </Swiper>
  </Page>

);
