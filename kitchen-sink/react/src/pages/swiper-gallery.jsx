import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page style={{background: '#000'}} onPageInit={this.onPageInit.bind(this)}>
        <Navbar title="Two Way Control Gallery" backLink="Back"></Navbar>
        <Swiper
          className="demo-swiper-gallery-top"
          navigation
          colorTheme="white"
          ref={(el) => {this.swiperTopComponent = el}}
          params={{
            spaceBetween: 10,
          }}
        >
          <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/1/)'}} />
          <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/2/)'}} />
          <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/3/)'}} />
          <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/4/)'}} />
          <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/5/)'}} />
          <SwiperSlide style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/6/)'}} />
        </Swiper>
        <Swiper
          className="demo-swiper-gallery-thumbs"
          ref={(el) => {this.swiperThumbsComponent = el}}
          params={{
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true,
            touchRatio: 0.2,
            slideToClickedSlide: true,
          }}
        >
          <SwiperSlide>
            <div style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/1/)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/2/)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/3/)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/4/)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/5/)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(http://lorempixel.com/800/800/nature/6/)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
        </Swiper>
      </Page>
    );
  }
  onPageInit() {
    const self = this;
    const { swiperTopComponent, swiperThumbsComponent } = self;
    const swiperTop = swiperTopComponent.swiper;
    const swiperThumbs = swiperThumbsComponent.swiper;

    swiperTop.controller.control = swiperThumbs;
    swiperThumbs.controller.control = swiperTop;
  }
}