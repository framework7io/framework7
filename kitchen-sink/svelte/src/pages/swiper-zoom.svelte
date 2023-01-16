<script>
  import { Navbar, Page } from 'framework7-svelte';
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<Page>
  <Navbar title="Zoom" backLink="Back" />
  <swiper-container pagination={true} zoom={true} navigation={true} class="demo-swiper">
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-1.jpg" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-2.jpg" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-3.jpg" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-4.jpg" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-5.jpg" />
      </div>
    </swiper-slide>
    <swiper-slide>
      <div class="swiper-zoom-container">
        <img src="https://cdn.framework7.io/placeholder/nature-800x800-6.jpg" />
      </div>
    </swiper-slide>
  </swiper-container>
</Page>
