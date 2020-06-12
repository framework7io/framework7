<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Zoom" backLink="Back"></Navbar>
  <Swiper
    class="demo-swiper"
    pagination
    navigation
    params={{
      zoom: {
        enabled: true,
      }
    }}
  >
    <SwiperSlide zoom>
      <img src="https://cdn.framework7.io/placeholder/nature-800x800-1.jpg" />
    </SwiperSlide>
    <SwiperSlide zoom>
      <img src="https://cdn.framework7.io/placeholder/nature-800x800-2.jpg" />
    </SwiperSlide>
    <SwiperSlide zoom>
      <img src="https://cdn.framework7.io/placeholder/nature-800x800-3.jpg" />
    </SwiperSlide>
    <SwiperSlide zoom>
      <img src="https://cdn.framework7.io/placeholder/nature-800x800-4.jpg" />
    </SwiperSlide>
    <SwiperSlide zoom>
      <img src="https://cdn.framework7.io/placeholder/nature-800x800-5.jpg" />
    </SwiperSlide>
    <SwiperSlide zoom>
      <img src="https://cdn.framework7.io/placeholder/nature-800x800-6.jpg" />
    </SwiperSlide>
  </Swiper>
</Page>
<script>
  import { Navbar, Page, Swiper, SwiperSlide } from 'framework7-svelte';
</script>
