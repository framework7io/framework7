<Page>
  <Navbar title="Fade Effect" backLink="Back"></Navbar>
  <Swiper class="demo-swiper demo-swiper-fade" pagination params={{
    effect: 'fade',
  }}>
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-1.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-2.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-3.jpg)" />
    <SwiperSlide style="background-image: url(https://cdn.framework7.io/placeholder/people-1024x1024-4.jpg)" />
  </Swiper>
</Page>
<script>
  import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-svelte';
</script>
