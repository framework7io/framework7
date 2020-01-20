<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Slider Lazy Loading" backLink="Back"></Navbar>
  <Swiper
    class="demo-swiper-lazy"
    pagination
    navigation
    params={{
      lazy: true,
    }}
  >
    <SwiperSlide>
      <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-1.jpg" class="swiper-lazy"/>
      <div class="swiper-lazy-preloader"></div>
    </SwiperSlide>
    <SwiperSlide>
      <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-2.jpg" class="swiper-lazy"/>
      <div class="swiper-lazy-preloader"></div>
    </SwiperSlide>
    <SwiperSlide>
      <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-3.jpg" class="swiper-lazy"/>
      <div class="swiper-lazy-preloader"></div>
    </SwiperSlide>
    <SwiperSlide>
      <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-4.jpg" class="swiper-lazy"/>
      <div class="swiper-lazy-preloader"></div>
    </SwiperSlide>
    <SwiperSlide>
      <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-5.jpg" class="swiper-lazy"/>
      <div class="swiper-lazy-preloader"></div>
    </SwiperSlide>
    <SwiperSlide>
      <img data-src="https://cdn.framework7.io/placeholder/nature-1024x1024-6.jpg" class="swiper-lazy"/>
      <div class="swiper-lazy-preloader"></div>
    </SwiperSlide>
  </Swiper>
</Page>
<script>
  import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-svelte';
</script>
