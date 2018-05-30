import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="Zoom" backLink="Back"></Navbar>
    <Swiper
      className="demo-swiper"
      pagination
      navigation
      params={{
        zoom: {
          enabled: true,
        }
      }}
    >
      <SwiperSlide zoom>
        <img src="http://lorempixel.com/800/800/nature/1/" />
      </SwiperSlide>
      <SwiperSlide zoom>
        <img src="http://lorempixel.com/800/800/nature/2/" />
      </SwiperSlide>
      <SwiperSlide zoom>
        <img src="http://lorempixel.com/800/800/nature/3/" />
      </SwiperSlide>
      <SwiperSlide zoom>
        <img src="http://lorempixel.com/800/800/nature/4/" />
      </SwiperSlide>
      <SwiperSlide zoom>
        <img src="http://lorempixel.com/800/800/nature/5/" />
      </SwiperSlide>
      <SwiperSlide zoom>
        <img src="http://lorempixel.com/800/800/nature/6/" />
      </SwiperSlide>
    </Swiper>
  </Page>

);
