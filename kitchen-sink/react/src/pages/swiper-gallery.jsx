import React from 'react';
import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-react';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Page style={{background: '#000'}} onPageInit={this.onPageInit.bind(this)} onPageBeforeRemove={this.onPageBeforeRemove.bind(this)}>
        <Navbar title="Two Way Control Gallery" backLink="Back"></Navbar>
        <Swiper
          className="demo-swiper-gallery-top"
          navigation
          colorTheme="white"
          init={false}
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
          init={false}
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
  onPageBeforeRemove() {
    const self = this;
    self.swiperTop.destroy();
    self.swiperThumbs.destroy();
  }
  onPageInit() {
    const self = this;

    const swiperThumbs = self.$f7.swiper.create('.demo-swiper-gallery-thumbs', {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
    });
    const swiperTop = self.$f7.swiper.create('.demo-swiper-gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });

    self.swiperTop = swiperTop;
    self.swiperThumbs = swiperThumbs;
  }
}