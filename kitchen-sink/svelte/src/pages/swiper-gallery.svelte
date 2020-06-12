<Page style="background: #000" onPageInit={onPageInit} onPageBeforeRemove={onPageBeforeRemove}>
  <Navbar title="Two Way Control Gallery" backLink="Back"></Navbar>
  <Swiper
    class="demo-swiper-gallery-top"
    navigation
    colorTheme="white"
    init={false}
  >
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)" />
  </Swiper>
  <Swiper
    class="demo-swiper-gallery-thumbs"
    init={false}
  >
    <SwiperSlide>
      <div style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)" class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)" class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)" class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)" class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)" class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)" class="swiper-slide-pic" />
    </SwiperSlide>
  </Swiper>
</Page>
<script>
  import { f7, Navbar, Page, Swiper, SwiperSlide } from 'framework7-svelte';

  let swiperTop;
  let swiperThumbs;

  function onPageBeforeRemove() {
    swiperTop.destroy();
    swiperThumbs.destroy();
  }
  function onPageInit() {
    swiperThumbs = f7.swiper.create('.demo-swiper-gallery-thumbs', {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
    });
    swiperTop = f7.swiper.create('.demo-swiper-gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }
</script>
