<template>
  <div ref="elRef" class="breadcrumbs">
    <slot />
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'f7-breadcrumbs',
  props: {},
  setup() {
    const elRef = ref(null);

    return {
      elRef,
    };
  },
};
</script>
