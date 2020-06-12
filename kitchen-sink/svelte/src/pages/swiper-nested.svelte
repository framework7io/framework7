<Page>
  <Navbar title="Nested Swipers" backLink="Back"></Navbar>
  <Swiper class="demo-swiper" pagination>
    <SwiperSlide>Horizontal Slide 1</SwiperSlide>
    <SwiperSlide>
      <Swiper class="demo-swiper" pagination params={{ direction: 'vertical' }}>
        <SwiperSlide>Vertical Slide 1</SwiperSlide>
        <SwiperSlide>Vertical Slide 2</SwiperSlide>
        <SwiperSlide>Vertical Slide 3</SwiperSlide>
      </Swiper>
    </SwiperSlide>
    <SwiperSlide>Horizontal Slide 3</SwiperSlide>
    <SwiperSlide>Horizontal Slide 3</SwiperSlide>
  </Swiper>
</Page>
<script>
  import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-svelte';
</script>
