<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { useTab } from '../shared/use-tab.js';

export default {
  name: 'f7-block',
  props: {
    inset: Boolean,
    xsmallInset: Boolean,
    smallInset: Boolean,
    mediumInset: Boolean,
    largeInset: Boolean,
    xlargeInset: Boolean,
    strong: Boolean,
    outline: Boolean,
    outlineIos: Boolean,
    outlineMd: Boolean,
    tabs: Boolean,
    tab: Boolean,
    tabActive: Boolean,
    accordionList: Boolean,
    accordionOpposite: Boolean,
    ...colorProps,
  },
  emits: ['tab:hide', 'tab:show'],
  setup(props, { emit }) {
    const elRef = ref(null);

    useTab(elRef, emit);

    const classes = computed(() => {
      const {
        inset,
        xsmallInset,
        smallInset,
        mediumInset,
        largeInset,
        xlargeInset,
        strong,
        outline,
        outlineIos,
        outlineMd,
        accordionList,
        accordionOpposite,
        tabs,
        tab,
        tabActive,
      } = props;
      return classNames(
        'block',
        {
          inset,
          'xsmall-inset': xsmallInset,
          'small-inset': smallInset,
          'medium-inset': mediumInset,
          'large-inset': largeInset,
          'xlarge-inset': xlargeInset,
          'block-strong': strong,
          'accordion-list': accordionList,
          'accordion-opposite': accordionOpposite,
          tabs,
          tab,
          'tab-active': tabActive,
          'block-outline': outline,
          'block-outline-md': outlineMd,
          'block-outline-ios': outlineIos,
        },
        colorClasses(props),
      );
    });

    return {
      elRef,
      classes,
    };
  },
};
</script>
