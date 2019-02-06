import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="Slider Lazy Loading" backLink="Back"></Navbar>
    <Swiper
      className="demo-swiper-lazy"
      pagination
      navigation
      params={{
        lazy: true,
      }}
    >
      <SwiperSlide>
        <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-1.jpg" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-2.jpg" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-3.jpg" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-4.jpg" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-5.jpg" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-6.jpg" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
    </Swiper>
  </Page>

);
