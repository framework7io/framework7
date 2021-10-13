<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { ref, computed, onBeforeUnmount, onMounted } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7, f7ready } from '../shared/f7.js';

export default {
  name: 'f7-accordion-item',
  props: {
    opened: Boolean,
    ...colorProps,
  },
  emits: [
    'accordion:beforeopen',
    'accordion:open',
    'accordion:opened',
    'accordion:beforeclose',
    'accordion:close',
    'accordion:closed',
  ],
  setup(props, { emit }) {
    const elRef = ref(null);

    const onBeforeOpen = (el, prevent) => {
      if (elRef.value !== el) return;
      emit('accordion:beforeopen', prevent);
    };
    const onOpen = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:open');
    };
    const onOpened = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:opened');
    };
    const onBeforeClose = (el, prevent) => {
      if (elRef.value !== el) return;
      emit('accordion:beforeclose', prevent);
    };
    const onClose = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:close');
    };
    const onClosed = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:closed');
    };

    const attachEvents = () => {
      f7ready(() => {
        f7.on('accordionBeforeOpen', onBeforeOpen);
        f7.on('accordionOpen', onOpen);
        f7.on('accordionOpened', onOpened);
        f7.on('accordionBeforeClose', onBeforeClose);
        f7.on('accordionClose', onClose);
        f7.on('accordionClosed', onClosed);
      });
    };

    const detachEvents = () => {
      f7.off('accordionBeforeOpen', onBeforeOpen);
      f7.off('accordionOpen', onOpen);
      f7.off('accordionOpened', onOpened);
      f7.off('accordionBeforeClose', onBeforeClose);
      f7.off('accordionClose', onClose);
      f7.off('accordionClosed', onClosed);
    };

    onMounted(() => attachEvents());
    onBeforeUnmount(() => detachEvents());

    const classes = computed(() =>
      classNames(
        'accordion-item',
        {
          'accordion-item-opened': props.opened,
        },
        colorClasses(props),
      ),
    );
    return { elRef, classes };
  },
};
</script>
