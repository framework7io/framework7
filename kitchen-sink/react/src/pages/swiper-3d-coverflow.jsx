import React from 'react';
import { Navbar, Page } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="3D Coverflow Effect" backLink="Back"></Navbar>
    <swiper-container
      effect="coverflow"
      pagination
      slides-per-view="auto"
      centered-slides
      class="demo-swiper demo-swiper-coverflow"
    >
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)`,
        }}
      >
        Slide 1
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)`,
        }}
      >
        Slide 2
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)`,
        }}
      >
        Slide 3
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)`,
        }}
      >
        Slide 4
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)`,
        }}
      >
        Slide 5
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)`,
        }}
      >
        Slide 6
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-7.jpg)`,
        }}
      >
        Slide 7
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-8.jpg)`,
        }}
      >
        Slide 8
      </swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-9.jpg)`,
        }}
      >
        Slide 9
      </swiper-slide>
    </swiper-container>
  </Page>
);
