<template>
  <f7-page>
    <f7-navbar :title="`Detail Page ${$f7route.params.id}`" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p><b>Detail Page {{$f7route.params.id}}</b></p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue turpis et risus fringilla condimentum. Aliquam vestibulum est tempor, sagittis massa nec, dictum massa. Phasellus non viverra dui, eget aliquam sem. Donec eleifend dolor id arcu ultrices, vel ultrices dolor fringilla. Phasellus feugiat consectetur libero, eget luctus felis rhoncus at. Duis scelerisque ligula sit amet purus congue pulvinar. Proin a risus id nibh fermentum auctor. Vestibulum at sem a risus mollis iaculis. In vestibulum malesuada arcu id consectetur.</p>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7Block,
    },
  };
</script>
