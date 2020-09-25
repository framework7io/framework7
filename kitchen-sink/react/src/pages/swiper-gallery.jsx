import React, { useState } from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => {
  const [swiperThumbs, setSwiperThumbs] = useState(null);
  return (
    <Page style={{ background: '#000' }}>
      <Navbar title="Two Way Control Gallery" backLink="Back"></Navbar>
      <Swiper
        className="demo-swiper-gallery-top color-theme-white"
        navigation
        spaceBetween={10}
        thumbs={{ swiper: swiperThumbs }}
      >
        <SwiperSlide
          style={{
            backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)',
          }}
        />
        <SwiperSlide
          style={{
            backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)',
          }}
        />
        <SwiperSlide
          style={{
            backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)',
          }}
        />
        <SwiperSlide
          style={{
            backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)',
          }}
        />
        <SwiperSlide
          style={{
            backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)',
          }}
        />
        <SwiperSlide
          style={{
            backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)',
          }}
        />
      </Swiper>
      <Swiper
        className="demo-swiper-gallery-thumbs"
        onSwiper={setSwiperThumbs}
        slidesPerView={4}
        spaceBetween={10}
        freeMode={true}
        watchSlidesProgress={true}
        watchSlidesVisibility={true}
      >
        <SwiperSlide>
          <div
            style={{
              backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)',
            }}
            className="swiper-slide-pic"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)',
            }}
            className="swiper-slide-pic"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)',
            }}
            className="swiper-slide-pic"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)',
            }}
            className="swiper-slide-pic"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)',
            }}
            className="swiper-slide-pic"
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)',
            }}
            className="swiper-slide-pic"
          />
        </SwiperSlide>
      </Swiper>
    </Page>
  );
};
