<script>
  import { Navbar, Page } from 'framework7-svelte';
</script>

<Page>
  <Navbar title="Fade Effect" backLink="Back" />
  <swiper-container effect="fade" pagination={true} class="demo-swiper demo-swiper-fade">
    <swiper-slide
      style="background-image:url(https://cdn.framework7.io/placeholder/people-800x800-1.jpg)"
    />
    <swiper-slide
      style="background-image:url(https://cdn.framework7.io/placeholder/people-800x800-2.jpg)"
    />
    <swiper-slide
      style="background-image:url(https://cdn.framework7.io/placeholder/people-800x800-3.jpg)"
    />
    <swiper-slide
      style="background-image:url(https://cdn.framework7.io/placeholder/people-800x800-4.jpg)"
    />
  </swiper-container>
</Page>
