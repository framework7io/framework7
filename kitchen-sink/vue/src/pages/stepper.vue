<template>
  <f7-page>
    <f7-navbar title="Stepper" back-link="Back"></f7-navbar>
    <f7-block-title>Shape and size</f7-block-title>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <small class="display-block">Default</small>
          <f7-stepper></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Round</small>
          <f7-stepper round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Fill</small>
          <f7-stepper fill></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Round Fill</small>
          <f7-stepper fill round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Small</small>
          <f7-stepper small></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Small Round</small>
          <f7-stepper small round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Small Fill</small>
          <f7-stepper small fill></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Small Round Fill</small>
          <f7-stepper small round fill></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Large</small>
          <f7-stepper large></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Large Round</small>
          <f7-stepper large round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Large Fill</small>
          <f7-stepper large fill></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Large Round Fill</small>
          <f7-stepper large round fill></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Raised</f7-block-title>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <small class="display-block">Default</small>
          <f7-stepper raised></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Round</small>
          <f7-stepper raised round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Fill</small>
          <f7-stepper raised fill></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Round Fill</small>
          <f7-stepper raised fill round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Small</small>
          <f7-stepper raised small></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Small Round</small>
          <f7-stepper raised small round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Small Fill</small>
          <f7-stepper raised small fill></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Small Round Fill</small>
          <f7-stepper raised small round fill></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Large</small>
          <f7-stepper raised large></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Large Round</small>
          <f7-stepper raised large round></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <small class="display-block">Large Fill</small>
          <f7-stepper raised large fill></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Large Round Fill</small>
          <f7-stepper raised large round fill></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Colors</f7-block-title>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <f7-stepper fill color="red"></f7-stepper>
        </f7-col>
        <f7-col>
          <f7-stepper fill round color="green"></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <f7-stepper fill color="blue"></f7-stepper>
        </f7-col>
        <f7-col>
          <f7-stepper fill round color="pink"></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <f7-stepper fill small color="yellow"></f7-stepper>
        </f7-col>
        <f7-col>
          <f7-stepper fill small round color="orange"></f7-stepper>
        </f7-col>
      </f7-row>

      <f7-row class="margin-top">
        <f7-col>
          <f7-stepper fill small color="gray"></f7-stepper>
        </f7-col>
        <f7-col>
          <f7-stepper fill small round color="black"></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Without input element</f7-block-title>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <f7-stepper :input="false"></f7-stepper>
        </f7-col>
        <f7-col>
          <f7-stepper :input="false" round></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-block-title>Min, max, step</f7-block-title>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <f7-stepper fill :value="100" :min="0" :max="1000" :step="100"></f7-stepper>
        </f7-col>
        <f7-col>
          <f7-stepper fill :input="false" :value="5" :min="0" :max="10" :step="0.5"></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Autorepeat (Tap & hold)</f7-block-title>
    <f7-block-header>Pressing and holding one of its buttons increments or decrements the stepper’s value repeatedly. With dynamic autorepeat, the rate of change depends on how long the user continues pressing the control.</f7-block-header>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <small class="display-block">Default</small>
          <f7-stepper fill :value="0" :min="0" :max="100" :step="1" :autorepeat="true"></f7-stepper>
        </f7-col>
        <f7-col>
          <small class="display-block">Dynamic</small>
          <f7-stepper fill :value="0" :min="0" :max="100" :step="1" :autorepeat="true" :autorepeat-dynamic="true"></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Wraps</f7-block-title>
    <f7-block-header>In wraps mode incrementing beyond maximum value sets value to minimum value, likewise, decrementing below minimum value sets value to maximum value</f7-block-header>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <f7-stepper fill :value="0" :min="0" :max="10" :step="1" :autorepeat="true" :wraps="true"></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>

    <f7-block-title>Custom value element</f7-block-title>
    <f7-list>
      <f7-list-item :title="`Apples ${applesCount}`">
        <f7-stepper :buttons-only="true" small raised slot="after" @stepper:change="setApples"></f7-stepper>
      </f7-list-item>
      <f7-list-item :title="`Oranges ${orangesCount}`">
        <f7-stepper :buttons-only="true" small raised slot="after" @stepper:change="setOranges"></f7-stepper>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Custom value format</f7-block-title>
    <f7-list>
      <f7-list-item header="Meeting starts in" :title="meetingTimeComputed">
        <f7-stepper
          :min="15"
          :max="240"
          :step="15"
          :value="meetingTime"
          :buttons-only="true"
          small
          fill
          raised
          slot="after"
          @stepper:change="setMeetingTime"
        ></f7-stepper>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Manual input</f7-block-title>
    <f7-block-header>It is possible to enter value manually from keyboard or mobile keypad. When click on input field, stepper enter into manual input mode, which allow type value from keyboar and check fractional part with defined accurancy. Click outside or enter Return key, ending manual mode.</f7-block-header>
    <f7-block strong class="text-align-center">
      <f7-row>
        <f7-col>
          <f7-stepper fill :value="0" :min="0" :max="1000" :step="1" :autorepeat="true" :wraps="true" :manual-input-mode="true" :decimal-point="2"></f7-stepper>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7BlockHeader, f7Row, f7Col, f7List, f7ListItem, f7Stepper } from 'framework7-vue';
  export default {
    components: {
      f7Page, f7Navbar, f7BlockTitle, f7Block, f7BlockHeader, f7Row, f7Col, f7List, f7ListItem, f7Stepper
    },
    data() {
      return {
        applesCount: 0,
        orangesCount: 0,
        meetingTime: 15,
      };
    },
    computed: {
      meetingTimeComputed() {
        const self = this;
        const value = self.meetingTime;

        const hours = Math.floor(value / 60);
        const minutes = value - (hours * 60);
        const formatted = [];
        if (hours > 0) {
          formatted.push(hours + ' ' + (hours > 1 ? 'hours' : 'hour'));
        }
        if (minutes > 0) {
          formatted.push(minutes + ' minutes');
        }
        return formatted.join(' ');
      },
    },
    methods: {
      setApples(value) {
        this.applesCount = value;
      },
      setOranges(value) {
        this.orangesCount = value;
      },
      setMeetingTime(value) {
        this.meetingTime = value;
      },
    },
  };
</script>