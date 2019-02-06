import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="3D Cube" backLink="Back"></Navbar>
    <Swiper className="demo-swiper demo-swiper-cube" params={{
      effect: 'cube',
    }}>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-1.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-2.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-3.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-4.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-5.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-6.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-7.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-8.jpg)'}}></SwiperSlide>
      <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/people-800x800-9.jpg)'}}></SwiperSlide>
    </Swiper>
  </Page>
);
