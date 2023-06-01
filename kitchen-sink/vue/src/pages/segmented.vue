<template>
  <f7-page>
    <f7-navbar title="Segmented" back-link="Back"></f7-navbar>

    <f7-block strong outline-ios>
      <f7-segmented tag="p">
        <f7-button>Button</f7-button>
        <f7-button>Button</f7-button>
        <f7-button active>Active</f7-button>
      </f7-segmented>
      <f7-segmented strong tag="p">
        <f7-button :active="activeStrongButton === 0" @click="activeStrongButton = 0"
          >Button</f7-button
        >
        <f7-button :active="activeStrongButton === 1" @click="activeStrongButton = 1"
          >Button</f7-button
        >
        <f7-button :active="activeStrongButton === 2" @click="activeStrongButton = 2"
          >Button</f7-button
        >
      </f7-segmented>
      <f7-segmented raised tag="p">
        <f7-button>Button</f7-button>
        <f7-button>Button</f7-button>
        <f7-button active>Active</f7-button>
      </f7-segmented>
      <f7-segmented tag="p">
        <f7-button outline>Outline</f7-button>
        <f7-button outline>Outline</f7-button>
        <f7-button outline active>Active</f7-button>
      </f7-segmented>
      <f7-segmented raised round tag="p">
        <f7-button round>Button</f7-button>
        <f7-button round>Button</f7-button>
        <f7-button round active>Active</f7-button>
      </f7-segmented>
      <f7-segmented round tag="p">
        <f7-button round outline>Outline</f7-button>
        <f7-button round outline>Outline</f7-button>
        <f7-button round outline active>Active</f7-button>
      </f7-segmented>
    </f7-block>
  </f7-page>
</template>
<script>
import { ref } from 'vue';
import { f7Navbar, f7Page, f7Block, f7Button, f7Segmented } from 'framework7-vue';

export default {
  components: {
    f7Navbar,
    f7Page,
    f7Block,
    f7Button,
    f7Segmented,
  },
  setup() {
    const activeStrongButton = ref(0);

    return {
      activeStrongButton,
    };
  },
};
</script>
