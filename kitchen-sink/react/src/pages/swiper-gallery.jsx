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
          <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)'}} />
          <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)'}} />
          <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)'}} />
          <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)'}} />
          <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)'}} />
          <SwiperSlide style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)'}} />
        </Swiper>
        <Swiper
          className="demo-swiper-gallery-thumbs"
          init={false}
        >
          <SwiperSlide>
            <div style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)'}} className="swiper-slide-pic"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{backgroundImage: 'url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)'}} className="swiper-slide-pic"></div>
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