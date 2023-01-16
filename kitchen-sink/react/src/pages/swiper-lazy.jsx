import React from 'react';
import { Navbar, Page } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Slider Lazy Loading" backLink="Back"></Navbar>
    <swiper-container pagination navigation class="demo-swiper-lazy">
      <swiper-slide lazy>
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-1.jpg" />
      </swiper-slide>
      <swiper-slide lazy>
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-2.jpg" />
      </swiper-slide>
      <swiper-slide lazy>
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-3.jpg" />
      </swiper-slide>
      <swiper-slide lazy>
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-4.jpg" />
      </swiper-slide>
      <swiper-slide lazy>
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-5.jpg" />
      </swiper-slide>
      <swiper-slide lazy>
        <img loading="lazy" src="https://cdn.framework7.io/placeholder/nature-1024x1024-6.jpg" />
      </swiper-slide>
    </swiper-container>
  </Page>
);
