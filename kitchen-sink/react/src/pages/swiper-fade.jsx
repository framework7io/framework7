import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="Fade Effect" backLink="Back"></Navbar>
    <Swiper className="demo-swiper demo-swiper-fade" pagination params={{
      effect: 'fade',
    }}>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-1024x1024-1.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-1024x1024-2.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-1024x1024-3.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-1024x1024-4.jpg)'}}></SwiperSlide>
    </Swiper>
  </Page>

);
