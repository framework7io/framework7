<template>
  <f7-page>
    <f7-navbar title="Stepper" back-link="Back"></f7-navbar>
    <f7-block-title>Shape and size</f7-block-title>
    <f7-block strong outline-ios class="text-align-center">
      <div class="grid grid-cols-2 grid-gap">
        <div>
          <small class="display-block">Default</small>
          <f7-stepper />
        </div>
        <div>
          <small class="display-block">Round</small>
          <f7-stepper round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Fill</small>
          <f7-stepper fill />
        </div>
        <div>
          <small class="display-block">Round Fill</small>
          <f7-stepper fill round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Small</small>
          <f7-stepper small />
        </div>
        <div>
          <small class="display-block">Small Round</small>
          <f7-stepper small round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Small Fill</small>
          <f7-stepper small fill />
        </div>
        <div>
          <small class="display-block">Small Round Fill</small>
          <f7-stepper small round fill />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Large</small>
          <f7-stepper large />
        </div>
        <div>
          <small class="display-block">Large Round</small>
          <f7-stepper large round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Large Fill</small>
          <f7-stepper large fill />
        </div>
        <div>
          <small class="display-block">Large Round Fill</small>
          <f7-stepper large round fill />
        </div>
      </div>
    </f7-block>

    <f7-block-title>Raised</f7-block-title>
    <f7-block strong outline-ios class="text-align-center">
      <div class="grid grid-cols-2 grid-gap">
        <div>
          <small class="display-block">Default</small>
          <f7-stepper raised />
        </div>
        <div>
          <small class="display-block">Round</small>
          <f7-stepper raised round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Fill</small>
          <f7-stepper raised fill />
        </div>
        <div>
          <small class="display-block">Round Fill</small>
          <f7-stepper raised fill round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Small</small>
          <f7-stepper raised small />
        </div>
        <div>
          <small class="display-block">Small Round</small>
          <f7-stepper raised small round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Small Fill</small>
          <f7-stepper raised small fill />
        </div>
        <div>
          <small class="display-block">Small Round Fill</small>
          <f7-stepper raised small round fill />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Large</small>
          <f7-stepper raised large />
        </div>
        <div>
          <small class="display-block">Large Round</small>
          <f7-stepper raised large round />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <small class="display-block">Large Fill</small>
          <f7-stepper raised large fill />
        </div>
        <div>
          <small class="display-block">Large Round Fill</small>
          <f7-stepper raised large round fill />
        </div>
      </div>
    </f7-block>
    <f7-block-title>Colors</f7-block-title>
    <f7-block strong outline-ios class="text-align-center">
      <div class="grid grid-cols-2 grid-gap">
        <div>
          <f7-stepper fill color="red" />
        </div>
        <div>
          <f7-stepper fill round color="green" />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <f7-stepper fill color="blue" />
        </div>
        <div>
          <f7-stepper fill round color="pink" />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <f7-stepper fill small color="yellow" />
        </div>
        <div>
          <f7-stepper fill small round color="orange" />
        </div>
      </div>

      <div class="grid grid-cols-2 grid-gap margin-top">
        <div>
          <f7-stepper fill small color="gray" />
        </div>
        <div>
          <f7-stepper fill small round color="black" />
        </div>
      </div>
    </f7-block>
    <f7-block-title>Without input element</f7-block-title>
    <f7-block strong outline-ios class="text-align-center">
      <div class="grid grid-cols-2 grid-gap">
        <div>
          <f7-stepper :input="false" />
        </div>
        <div>
          <f7-stepper :input="false" round />
        </div>
      </div>
    </f7-block>
    <f7-block-title>Min, max, step</f7-block-title>
    <f7-block strong outline-ios class="text-align-center">
      <div class="grid grid-cols-2 grid-gap">
        <div>
          <f7-stepper fill :value="100" :min="0" :max="1000" :step="100" />
        </div>
        <div>
          <f7-stepper fill :input="false" :value="5" :min="0" :max="10" :step="0.5" />
        </div>
      </div>
    </f7-block>

    <f7-block-title>Autorepeat (Tap & hold)</f7-block-title>
    <f7-block-header
      >Pressing and holding one of its buttons increments or decrements the stepper’s value
      repeatedly. With dynamic autorepeat, the rate of change depends on how long the user continues
      pressing the control.</f7-block-header
    >
    <f7-block strong outline-ios class="text-align-center">
      <div class="grid grid-cols-2 grid-gap">
        <div>
          <small class="display-block">Default</small>
          <f7-stepper fill :value="0" :min="0" :max="100" :step="1" :autorepeat="true" />
        </div>
        <div>
          <small class="display-block">Dynamic</small>
          <f7-stepper
            fill
            :value="0"
            :min="0"
            :max="100"
            :step="1"
            :autorepeat="true"
            :autorepeat-dynamic="true"
          />
        </div>
      </div>
    </f7-block>

    <f7-block-title>Wraps</f7-block-title>
    <f7-block-header
      >In wraps mode incrementing beyond maximum value sets value to minimum value, likewise,
      decrementing below minimum value sets value to maximum value</f7-block-header
    >
    <f7-block strong outline-ios class="text-align-center">
      <f7-stepper fill :value="0" :min="0" :max="10" :step="1" :autorepeat="true" :wraps="true" />
    </f7-block>

    <f7-block-title>Custom value element</f7-block-title>
    <f7-list strong-ios outline-ios dividers-ios>
      <f7-list-item :title="`Apples ${applesCount}`">
        <template #after>
          <f7-stepper :buttons-only="true" small raised @stepper:change="setApples" />
        </template>
      </f7-list-item>
      <f7-list-item :title="`Oranges ${orangesCount}`">
        <template #after>
          <f7-stepper :buttons-only="true" small raised @stepper:change="setOranges" />
        </template>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Custom value format</f7-block-title>
    <f7-list strong-ios outline-ios dividers-ios>
      <f7-list-item header="Meeting starts in" :title="meetingTimeComputed">
        <template #after>
          <f7-stepper
            :min="15"
            :max="240"
            :step="15"
            :value="meetingTime"
            :buttons-only="true"
            small
            fill
            raised
            @stepper:change="setMeetingTime"
          />
        </template>
      </f7-list-item>
    </f7-list>

    <f7-block-title>Manual input</f7-block-title>
    <f7-block-header
      >It is possible to enter value manually from keyboard or mobile keypad. When click on input
      field, stepper enter into manual input mode, which allow type value from keyboar and check
      fractional part with defined accurancy. Click outside or enter Return key, ending manual
      mode.</f7-block-header
    >
    <f7-block strong outline-ios class="text-align-center">
      <f7-stepper
        fill
        :value="0"
        :min="0"
        :max="1000"
        :step="1"
        :autorepeat="true"
        :wraps="true"
        :manual-input-mode="true"
        :decimal-point="2"
      />
    </f7-block>
  </f7-page>
</template>
<script>
import {
  f7Page,
  f7Navbar,
  f7BlockTitle,
  f7Block,
  f7BlockHeader,
  f7List,
  f7ListItem,
  f7Stepper,
} from 'framework7-vue';

export default {
  components: {
    f7Page,
    f7Navbar,
    f7BlockTitle,
    f7Block,
    f7BlockHeader,
    f7List,
    f7ListItem,
    f7Stepper,
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
      const minutes = value - hours * 60;
      const formatted = [];
      if (hours > 0) {
        formatted.push(`${hours} ${hours > 1 ? 'hours' : 'hour'}`);
      }
      if (minutes > 0) {
        formatted.push(`${minutes} minutes`);
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
