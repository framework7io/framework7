<script>
  import { Navbar, Page } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Space Between Slides" backLink="Back" />
  <swiper-container pagination={{ hideOnClick: true }} space-between={50} class="demo-swiper">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
    <swiper-slide>Slide 7</swiper-slide>
    <swiper-slide>Slide 8</swiper-slide>
    <swiper-slide>Slide 9</swiper-slide>
    <swiper-slide>Slide 10</swiper-slide>
  </swiper-container>
</Page>
