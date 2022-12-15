import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Slider Lazy Loading" backLink="Back"></Navbar>
    <Swiper className="demo-swiper-lazy" pagination navigation lazy>
      <SwiperSlide lazy>
        <img src="https://cdn.framework7.io/placeholder/nature-1024x1024-1.jpg" loading="lazy" />
      </SwiperSlide>
      <SwiperSlide lazy>
        <img src="https://cdn.framework7.io/placeholder/nature-1024x1024-2.jpg" loading="lazy" />
      </SwiperSlide>
      <SwiperSlide lazy>
        <img src="https://cdn.framework7.io/placeholder/nature-1024x1024-3.jpg" loading="lazy" />
      </SwiperSlide>
      <SwiperSlide lazy>
        <img src="https://cdn.framework7.io/placeholder/nature-1024x1024-4.jpg" loading="lazy" />
      </SwiperSlide>
      <SwiperSlide lazy>
        <img src="https://cdn.framework7.io/placeholder/nature-1024x1024-5.jpg" loading="lazy" />
      </SwiperSlide>
      <SwiperSlide lazy>
        <img src="https://cdn.framework7.io/placeholder/nature-1024x1024-6.jpg" loading="lazy" />
      </SwiperSlide>
    </Swiper>
  </Page>
);
