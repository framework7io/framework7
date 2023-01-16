import React from 'react';
import { Navbar, Page } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Zoom" backLink="Back"></Navbar>
    <swiper-container pagination zoom navigation class="demo-swiper">
      <swiper-slide>
        <div className="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-1.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-2.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-3.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-4.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-5.jpg" />
        </div>
      </swiper-slide>
      <swiper-slide>
        <div className="swiper-zoom-container">
          <img src="https://cdn.framework7.io/placeholder/nature-800x800-6.jpg" />
        </div>
      </swiper-slide>
    </swiper-container>
  </Page>
);
