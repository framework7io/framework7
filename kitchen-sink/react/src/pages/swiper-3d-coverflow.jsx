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
      <div slot="slide-0" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-1.jpg" />
        <span>Slide 1</span>
      </div>
      <div slot="slide-1" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-2.jpg" />
        <span>Slide 2</span>
      </div>
      <div slot="slide-2" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-3.jpg" />
        <span>Slide 3</span>
      </div>
      <div slot="slide-3" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-4.jpg" />
        <span>Slide 4</span>
      </div>
      <div slot="slide-4" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-5.jpg" />
        <span>Slide 5</span>
      </div>
      <div slot="slide-5" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-6.jpg" />
        <span>Slide 6</span>
      </div>
      <div slot="slide-6" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-7.jpg" />
        <span>Slide 7</span>
      </div>
      <div slot="slide-7" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-8.jpg" />
        <span>Slide 8</span>
      </div>
      <div slot="slide-8" className="demo-swiper-slide-content">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-9.jpg" />
        <span>Slide 9</span>
      </div>
    </swiper-container>
  </Page>
);
