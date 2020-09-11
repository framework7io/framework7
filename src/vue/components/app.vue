<template>
  <div id="framework7-root" ref="elRef" :class="classes">
    <slot />
    <routable-modals />
  </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

import RoutableModals from './routable-modals';
import { f7init, f7 } from '../shared/f7';

export default {
  name: 'f7-app',
  components: {
    RoutableModals,
  },
  props: {
    routes: Array,
    ...colorProps,
  },
  setup(props) {
    const elRef = ref(null);

    if (!f7 || typeof window === 'undefined') {
      f7init(elRef.value, props, false);
    }

    onMounted(() => {
      const parentEl = elRef.value && elRef.value.parentNode;
      /* eslint-disable no-restricted-globals */
      if (
        typeof document !== 'undefined' &&
        parentEl &&
        parentEl !== document.body &&
        parentEl.parentNode === document.body
      ) {
        parentEl.style.height = '100%';
      }
      /* eslint-enable no-restricted-globals */
      if (f7) {
        f7.init(elRef.value);
        return;
      }
      f7init(elRef.value, props, true);
    });

    const classes = computed(() => classNames('framework7-root', colorClasses(props)));

    return { classes, elRef };
  },
};
</script>
