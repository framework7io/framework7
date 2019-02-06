import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="Parallax" backLink="Back"></Navbar>
    <Swiper
      className="demo-swiper-parallax"
      pagination
      navigation
      colorTheme="white"
      params={{
        parallax: true,
        speed: 600,
      }}
    >
      <div
        slot="before-wrapper"
        data-swiper-parallax="-23%"
        style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nightlife-1024x1024-2.jpg)'}}
        className="swiper-parallax-bg"
      ></div>
      <SwiperSlide>
        <div data-swiper-parallax="-300" className="swiper-slide-title">Slide 1</div>
        <div data-swiper-parallax="-200" className="swiper-slide-subtitle">Subtitle</div>
        <div data-swiper-parallax="-100" className="swiper-slide-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div data-swiper-parallax="-300" className="swiper-slide-title">Slide 2</div>
        <div data-swiper-parallax="-200" className="swiper-slide-subtitle">Subtitle</div>
        <div data-swiper-parallax="-100" className="swiper-slide-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div data-swiper-parallax="-300" className="swiper-slide-title">Slide 3</div>
        <div data-swiper-parallax="-200" className="swiper-slide-subtitle">Subtitle</div>
        <div data-swiper-parallax="-100" className="swiper-slide-text">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in sem justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>
        </div>
      </SwiperSlide>
    </Swiper>
  </Page>

);
