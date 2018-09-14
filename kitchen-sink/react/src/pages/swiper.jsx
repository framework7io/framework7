import React from 'react';
import { Navbar, Page, Block, List, ListItem } from 'framework7-react';

export default () => (

  <Page>
    <Navbar title="Swiper Slider" backLink="Back"></Navbar>
    <Block>
      <p>
        Framework7 comes with powerful and most modern touch slider ever -
        <a href="http://idangero.us/swiper" className="external" target="_blank">Swiper Slider</a>
        with super flexible configuration and lot, lot of features. Just check the following demos:
      </p>
    </Block>
    <List>
      <ListItem link="swiper-horizontal/" title="Swiper Horizontal" />
      <ListItem link="swiper-vertical/" title="Swiper Vertical" />
      <ListItem link="swiper-space-between/" title="Space Between Slides" />
      <ListItem link="swiper-multiple/" title="Multiple Per Page" />
      <ListItem link="swiper-nested/" title="Nested Swipers" />
      <ListItem link="swiper-loop/" title="Infinite Loop Mode" />
      <ListItem link="swiper-3d-cube/" title="3D Cube Effect" />
      <ListItem link="swiper-3d-coverflow/" title="3D Coverflow Effect" />
      <ListItem link="swiper-3d-flip/" title="3D Flip Effect" />
      <ListItem link="swiper-fade/" title="Fade Effect" />
      <ListItem link="swiper-scrollbar/" title="With Scrollbar" />
      <ListItem link="swiper-gallery/" title="Thumbs Gallery" />
      <ListItem link="swiper-custom-controls/" title="Custom Controls" />
      <ListItem link="swiper-parallax/" title="Parallax" />
      <ListItem link="swiper-lazy/" title="Lazy Loading" />
      <ListItem link="swiper-pagination-progress/" title="Progress Pagination" />
      <ListItem link="swiper-pagination-fraction/" title="Fraction Pagination" />
      <ListItem link="swiper-zoom/" title="Zoom" />
    </List>
  </Page>

);
