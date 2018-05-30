<template>
  <f7-page class="grid-demo">
    <f7-navbar title="Grid / Layout" back-link="Back"></f7-navbar>
    <f7-block>
      <p>Columns within a row are automatically set to have equal width. Otherwise you can define your column with pourcentage of screen you want.</p>
    </f7-block>
    <f7-block-title>Columns with gap</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col>50% (.col)</f7-col>
        <f7-col>50% (.col)</f7-col>
      </f7-row>
      <f7-row>
        <f7-col>25% (.col)</f7-col>
        <f7-col>25% (.col)</f7-col>
        <f7-col>25% (.col)</f7-col>
        <f7-col>25% (.col)</f7-col>
      </f7-row>
      <f7-row>
        <f7-col>33% (.col)</f7-col>
        <f7-col>33% (.col)</f7-col>
        <f7-col>33% (.col)</f7-col>
      </f7-row>
      <f7-row>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="33">33% (.col-33)</f7-col>
        <f7-col width="66">66% (.col-66)</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="25">25% (.col-25)</f7-col>
        <f7-col width="25">25% (.col-25)</f7-col>
        <f7-col width="50">50% (.col-50)</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="75">75% (.col-75)</f7-col>
        <f7-col width="25">25% (.col-25)</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="80">80% (.col-80)</f7-col>
        <f7-col width="20">20% (.col-20)</f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>No gap between columns</f7-block-title>
    <f7-block>
      <f7-row no-gap>
        <f7-col>50% (.col)</f7-col>
        <f7-col>50% (.col)</f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col>25% (.col)</f7-col>
        <f7-col>25% (.col)</f7-col>
        <f7-col>25% (.col)</f7-col>
        <f7-col>25% (.col)</f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col>33% (.col)</f7-col>
        <f7-col>33% (.col)</f7-col>
        <f7-col>33% (.col)</f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
        <f7-col>20% (.col)</f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col width="33">33% (.col-33)</f7-col>
        <f7-col width="66">66% (.col-66)</f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col width="25">25% (.col-25)</f7-col>
        <f7-col width="25">25% (.col-25)</f7-col>
        <f7-col width="50">50% (.col-50)</f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col width="75">75% (.col-75)</f7-col>
        <f7-col width="25">25% (.col-25)</f7-col>
      </f7-row>
      <f7-row no-gap>
        <f7-col width="80">80% (.col-80)</f7-col>
        <f7-col width="20">20% (.col-20)</f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Nested</f7-block-title>
    <f7-block>
      <f7-row>
        <f7-col>50% (.col)
          <f7-row>
            <f7-col>50% (.col)</f7-col>
            <f7-col>50% (.col)</f7-col>
          </f7-row>
        </f7-col>
        <f7-col>50% (.col)
          <f7-row>
            <f7-col width="33">33% (.col-33)</f7-col>
            <f7-col width="66">66% (.col-66)</f7-col>
          </f7-row>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Responsive Grid</f7-block-title>
    <f7-block>
      <p>Grid cells have different size on Phone/Tablet</p>
      <f7-row>
        <f7-col width="100" tablet-width="50">.col-100.tablet-50</f7-col>
        <f7-col width="100" tablet-width="50">.col-100.tablet-50</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="50" tablet-width="25">.col-50.tablet-25</f7-col>
        <f7-col width="50" tablet-width="25">.col-50.tablet-25</f7-col>
        <f7-col width="50" tablet-width="25">.col-50.tablet-25</f7-col>
        <f7-col width="50" tablet-width="25">.col-50.tablet-25</f7-col>
      </f7-row>
      <f7-row>
        <f7-col width="100" tablet-width="40">.col-100.tablet-40</f7-col>
        <f7-col width="50" tablet-width="60">.col-50.tablet-60</f7-col>
        <f7-col width="50" tablet-width="66">.col-50.tablet-66</f7-col>
        <f7-col width="100" tablet-width="33">.col-100.tablet-33</f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Navbar, f7Page, f7BlockTitle, f7Row, f7Col, f7Block } from 'framework7-vue';

  export default {
    components: {
      f7Navbar,
      f7Page,
      f7BlockTitle,
      f7Row,
      f7Col,
      f7Block,
    },
  };
</script>
