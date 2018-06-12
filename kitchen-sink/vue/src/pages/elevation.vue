<template>
  <f7-page>
    <f7-navbar title="Elevation" back-link="Back"></f7-navbar>
    <f7-block strong>
      <p>Shadows provide important visual cues about objects’ depth and directional movement. They are the only visual cue indicating the amount of separation between surfaces. An object’s elevation determines the appearance of its shadow. The elevation values are mapped out in a "z-space" and range from 1 to 24.</p>
      <p>Elevation can be added to any element by adding <code>elevation-1</code>, <code>elevation-2</code>, ..., <code>elevation-24</code> classes</p>
    </f7-block>
    <f7-block>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-1">1</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-2">2</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-3">3</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-4">4</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-5">5</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-6">6</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-7">7</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-8">8</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-9">9</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-10">10</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-11">11</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-12">12</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-13">13</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-14">14</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-15">15</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-16">16</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-17">17</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-18">18</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-19">19</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-20">20</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-21">21</div>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <div class="elevation-demo elevation-22">22</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-23">23</div>
        </f7-col>
        <f7-col>
          <div class="elevation-demo elevation-24">24</div>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7Row, f7Col } from 'framework7-vue';

  export default {
    components: {
      f7Page,
      f7Navbar,
      f7BlockTitle,
      f7Block,
      f7Row,
      f7Col,
    },
  };
</script>
