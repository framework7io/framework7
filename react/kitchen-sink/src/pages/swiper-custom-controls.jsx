import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="Custom Controls" backLink="Back"></Navbar>
    <div className="demo-swiper-custom">
      <Swiper
        pagination
        navigation
        params={{
          pagination: {
            clickable: true,
          }
        }}
      >
        <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/nightlife/1/)'}} />
        <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/nightlife/2/)'}} />
        <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/nightlife/3/)'}} />
        <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/nightlife/4/)'}} />
        <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/nightlife/5/)'}} />
        <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/1024/1024/nightlife/6/)'}} />
      </Swiper>
    </div>
  </Page>

);
