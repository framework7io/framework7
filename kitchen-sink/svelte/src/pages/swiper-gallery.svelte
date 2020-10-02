<script>
  import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-svelte';

  let swiperThumbs;
  const setSwiperThumbs = (e) => {
    const [swiper] = e.detail;
    setTimeout(() => {
      swiperThumbs = swiper;
    });
  };
</script>

<Page style="background: #000">
  <Navbar title="Two Way Control Gallery" backLink="Back" />
  <Swiper
    class="demo-swiper-gallery-top color-theme-white"
    navigation
    spaceBetween={10}
    thumbs={{ swiper: swiperThumbs }}>
    <SwiperSlide
      style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)" />
    <SwiperSlide
      style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)" />
    <SwiperSlide
      style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)" />
    <SwiperSlide
      style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)" />
    <SwiperSlide
      style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)" />
    <SwiperSlide
      style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)" />
  </Swiper>
  <Swiper
    class="demo-swiper-gallery-thumbs"
    on:swiper={setSwiperThumbs}
    slidesPerView={4}
    spaceBetween={10}
    freeMode={true}
    watchSlidesProgress={true}
    watchSlidesVisibility={true}>
    <SwiperSlide>
      <div
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-1.jpg)"
        class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-2.jpg)"
        class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-3.jpg)"
        class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-4.jpg)"
        class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-5.jpg)"
        class="swiper-slide-pic" />
    </SwiperSlide>
    <SwiperSlide>
      <div
        style="background-image: url(https://cdn.framework7.io/placeholder/nature-800x800-6.jpg)"
        class="swiper-slide-pic" />
    </SwiperSlide>
  </Swiper>
</Page>
