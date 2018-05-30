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
        <img data-src="http://lorempixel.com/1600/1200/nature/1/" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="http://lorempixel.com/1600/1200/nature/2/" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="http://lorempixel.com/1600/1200/nature/3/" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="http://lorempixel.com/1600/1200/nature/4/" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="http://lorempixel.com/1600/1200/nature/5/" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
      <SwiperSlide>
        <img data-src="http://lorempixel.com/1600/1200/nature/6/" className="swiper-lazy"/>
        <div className="preloader swiper-lazy-preloader"></div>
      </SwiperSlide>
    </Swiper>
  </Page>

);
