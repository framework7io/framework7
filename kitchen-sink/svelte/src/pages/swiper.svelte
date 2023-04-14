<script>
  import { Navbar, Page, Block, List, ListItem } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Swiper Slider" backLink="Back" />
  <Block>
    <p>
      Framework7 comes with powerful and most modern touch slider ever -
      <a href="https://swiperjs.com" class="external" target="_blank">Swiper Slider</a>
      with super flexible configuration and lot, lot of features. Just check the following demos:
    </p>
  </Block>
  <List strong insetMd outlineIos dividersIos>
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
    <ListItem link="swiper-parallax/" title="Parallax" />
    <ListItem link="swiper-lazy/" title="Lazy Loading" />
    <ListItem link="swiper-pagination-progress/" title="Progress Pagination" />
    <ListItem link="swiper-pagination-fraction/" title="Fraction Pagination" />
    <ListItem link="swiper-zoom/" title="Zoom" />
  </List>
</Page>
