<template>
  <f7-page class="grid-demo">
    <f7-navbar title="Grid / Layout" back-link="Back"></f7-navbar>
    <f7-block>
      <p>
        Columns within a row are automatically set to have equal width. Otherwise you can define
        your column with pourcentage of screen you want.
      </p>
    </f7-block>
    <f7-block-title>Columns with gap</f7-block-title>
    <f7-block>
      <div class="grid grid-cols-2 grid-gap">
        <div>2 cols</div>
        <div>2 cols</div>
      </div>
      <div class="grid grid-cols-4 grid-gap">
        <div>4 cols</div>
        <div>4 cols</div>
        <div>4 cols</div>
        <div>4 cols</div>
      </div>
      <div class="grid grid-cols-3 grid-gap">
        <div>3 cols</div>
        <div>3 cols</div>
        <div>3 cols</div>
      </div>
      <div class="grid grid-cols-5 grid-gap">
        <div>5 cols</div>
        <div>5 cols</div>
        <div>5 cols</div>
        <div>5 cols</div>
        <div>5 cols</div>
      </div>
    </f7-block>
    <f7-block-title>No gap between columns</f7-block-title>
    <f7-block>
      <div class="grid grid-cols-2">
        <div>2 cols</div>
        <div>2 cols</div>
      </div>
      <div class="grid grid-cols-4">
        <div>4 cols</div>
        <div>4 cols</div>
        <div>4 cols</div>
        <div>4 cols</div>
      </div>
      <div class="grid grid-cols-3">
        <div>3 cols</div>
        <div>3 cols</div>
        <div>3 cols</div>
      </div>
      <div class="grid grid-cols-5">
        <div>5 cols</div>
        <div>5 cols</div>
        <div>5 cols</div>
        <div>5 cols</div>
        <div>5 cols</div>
      </div>
    </f7-block>

    <f7-block-title>Responsive Grid</f7-block-title>
    <f7-block>
      <p>Grid cells have different size on Phone/Tablet</p>
      <div class="grid grid-cols-1 medium-grid-cols-2 grid-gap">
        <div>1 col / medium 2 cols</div>
        <div>1 col / medium 2 cols</div>
      </div>
      <div class="grid grid-cols-2 medium-grid-cols-4 grid-gap">
        <div>2 col / medium 4 cols</div>
        <div>2 col / medium 4 cols</div>
        <div>2 col / medium 4 cols</div>
        <div>2 col / medium 4 cols</div>
      </div>
    </f7-block>
  </f7-page>
</template>
<script>
import { f7Navbar, f7Page, f7BlockTitle, f7Block } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Block,
  },
};
</script>
