<template>
  <div ref="elRef" :class="{ 'breadcrumbs-item': true, 'breadcrumbs-item-active': active }">
    <slot />
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  name: 'f7-breadcrumbs-item',
  props: {
    active: Boolean,
  },
  setup() {
    const elRef = ref(null);

    return {
      elRef,
    };
  },
};
</script>
