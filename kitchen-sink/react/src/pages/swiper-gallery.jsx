import React from 'react';
import { Navbar, Page } from 'framework7-react';

export default () => {
  return (
    <Page style={{ background: '#000' }}>
      <Navbar title="Two Way Control Gallery" backLink="Back"></Navbar>
      <swiper-container
        navigation
        space-between="10"
        thumbs-swiper=".demo-swiper-gallery-thumbs"
        class="demo-swiper-gallery-top color-white"
      >
        <swiper-slide
          style={{
            backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)`,
          }}
        ></swiper-slide>
        <swiper-slide
          style={{
            backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)`,
          }}
        ></swiper-slide>
        <swiper-slide
          style={{
            backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)`,
          }}
        ></swiper-slide>
        <swiper-slide
          style={{
            backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)`,
          }}
        ></swiper-slide>
        <swiper-slide
          style={{
            backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)`,
          }}
        ></swiper-slide>
        <swiper-slide
          style={{
            backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)`,
          }}
        ></swiper-slide>
      </swiper-container>
      <swiper-container
        slides-per-view="4"
        space-between="10"
        free-mode
        watch-slides-progress
        watch-slides-visibility
        class="demo-swiper-gallery-thumbs"
      >
        <swiper-slide>
          <div
            style={{
              backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)`,
            }}
            className="swiper-slide-pic"
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div
            style={{
              backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)`,
            }}
            className="swiper-slide-pic"
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div
            style={{
              backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)`,
            }}
            className="swiper-slide-pic"
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div
            style={{
              backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)`,
            }}
            className="swiper-slide-pic"
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div
            style={{
              backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)`,
            }}
            className="swiper-slide-pic"
          ></div>
        </swiper-slide>
        <swiper-slide>
          <div
            style={{
              backgroundImage: `url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)`,
            }}
            className="swiper-slide-pic"
          ></div>
        </swiper-slide>
      </swiper-container>
    </Page>
  );
};
