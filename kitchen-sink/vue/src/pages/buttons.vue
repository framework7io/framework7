<template>
  <f7-page>
    <f7-navbar title="Buttons" back-link="Back"></f7-navbar>

    <f7-block-title>Usual Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <div class="grid grid-cols-3 grid-gap">
        <f7-button>Button</f7-button>
        <f7-button>Button</f7-button>
        <f7-button round>Round</f7-button>
      </div>
    </f7-block>

    <f7-block-title>Tonal Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <div class="grid grid-cols-3 grid-gap">
        <f7-button tonal>Button</f7-button>
        <f7-button tonal>Button</f7-button>
        <f7-button tonal round>Round</f7-button>
      </div>
    </f7-block>

    <f7-block-title>Fill Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <div class="grid grid-cols-3 grid-gap">
        <f7-button fill>Button</f7-button>
        <f7-button fill>Button</f7-button>
        <f7-button fill round>Round</f7-button>
      </div>
    </f7-block>

    <f7-block-title>Outline Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <div class="grid grid-cols-3 grid-gap">
        <f7-button outline>Button</f7-button>
        <f7-button outline>Button</f7-button>
        <f7-button outline round>Round</f7-button>
      </div>
    </f7-block>

    <f7-block-title>Raised Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button raised>Button</f7-button>
        <f7-button raised fill>Fill</f7-button>
        <f7-button raised outline>Outline</f7-button>
      </p>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button raised round>Round</f7-button>
        <f7-button raised fill round>Fill</f7-button>
        <f7-button raised outline round>Outline</f7-button>
      </p>
    </f7-block>

    <f7-block-title>Large Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <p class="grid grid-cols-2 grid-gap">
        <f7-button large>Button</f7-button>
        <f7-button large fill>Fill</f7-button>
      </p>
      <p class="grid grid-cols-2 grid-gap">
        <f7-button large raised>Raised</f7-button>
        <f7-button large raised fill>Raised Fill</f7-button>
      </p>
    </f7-block>

    <f7-block-title>Small Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button small>Button</f7-button>
        <f7-button small outline>Outline</f7-button>
        <f7-button small fill>Fill</f7-button>
      </p>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button small round>Button</f7-button>
        <f7-button small outline round>Outline</f7-button>
        <f7-button small fill round>Fill</f7-button>
      </p>
    </f7-block>

    <f7-block-title>Preloader Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <p class="grid grid-cols-2 grid-gap">
        <f7-button preloader :loading="isLoading1" large @click="load1"> Load </f7-button>
        <f7-button preloader :loading="isLoading2" large fill @click="load2"> Load </f7-button>
      </p>
    </f7-block>

    <f7-block-title>Color Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <div class="grid grid-cols-3 grid-gap">
        <f7-button color="red">Red</f7-button>
        <f7-button color="green">Green</f7-button>
        <f7-button color="blue">Blue</f7-button>
      </div>
    </f7-block>

    <f7-block-title>Color Fill Buttons</f7-block-title>
    <f7-block strong outline-ios>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button color="red">Red</f7-button>
        <f7-button color="green">Green</f7-button>
        <f7-button color="blue">Blue</f7-button>
      </p>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button color="pink">Pink</f7-button>
        <f7-button color="yellow">Yellow</f7-button>
        <f7-button color="orange">Orange</f7-button>
      </p>
      <p class="grid grid-cols-3 grid-gap">
        <f7-button color="black">Black</f7-button>
        <f7-button color="white">White</f7-button>
      </p>
    </f7-block>
  </f7-page>
</template>
<script>
import { ref } from 'vue';
import { f7Navbar, f7Page, f7BlockTitle, f7Block, f7Button } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7BlockTitle,
    f7Block,
    f7Button,
  },
  setup() {
    const isLoading1 = ref(false);
    const isLoading2 = ref(false);

    const load1 = () => {
      if (isLoading1.value) return;
      isLoading1.value = true;
      setTimeout(() => {
        isLoading1.value = false;
      }, 4000);
    };

    const load2 = () => {
      if (isLoading2.value) return;
      isLoading2.value = true;
      setTimeout(() => {
        isLoading2.value = false;
      }, 4000);
    };

    return {
      isLoading1,
      isLoading2,
      load1,
      load2,
    };
  },
};
</script>
