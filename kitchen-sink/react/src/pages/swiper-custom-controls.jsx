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
        <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-1.jpg)'}} />
        <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-2.jpg)'}} />
        <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-3.jpg)'}} />
        <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-4.jpg)'}} />
        <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-5.jpg)'}} />
        <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-6.jpg)'}} />
      </Swiper>
    </div>
  </Page>

);
