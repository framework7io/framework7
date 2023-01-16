import React from 'react';
import { Navbar, Page } from 'framework7-react';

export default () => (
  <Page>
    <Navbar title="Fade Effect" backLink="Back"></Navbar>
    <swiper-container effect="fade" pagination class="demo-swiper demo-swiper-fade">
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/people-800x800-1.jpg)`,
        }}
      ></swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/people-800x800-2.jpg)`,
        }}
      ></swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/people-800x800-3.jpg)`,
        }}
      ></swiper-slide>
      <swiper-slide
        style={{
          backgroundImage: `url(https://cdn.framework7.io/placeholder/people-800x800-4.jpg)`,
        }}
      ></swiper-slide>
    </swiper-container>
  </Page>
);
