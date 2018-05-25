<template>
  <f7-actions>
    <f7-actions-group>
      <f7-actions-label>This Action Sheet was loaded as standalone component</f7-actions-label>
      <f7-actions-button>Action 1</f7-actions-button>
      <f7-actions-button>Action 2</f7-actions-button>
    </f7-actions-group>
    <f7-actions-group>
      <f7-actions-button color="red">Cancel</f7-actions-button>
    </f7-actions-group>
  </f7-actions>
</template>
<script>
  import { f7Actions, f7ActionsLabel, f7ActionsGroup, f7ActionsButton } from 'framework7-vue';
  export default {
    components: {
      f7Actions, f7ActionsLabel, f7ActionsGroup, f7ActionsButton,
    },
  };
</script>