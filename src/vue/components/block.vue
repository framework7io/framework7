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
    insetIos: Boolean,
    insetMd: Boolean,
    xsmallInset: Boolean,
    xsmallInsetIos: Boolean,
    xsmallInsetMd: Boolean,
    smallInset: Boolean,
    smallInsetIos: Boolean,
    smallInsetMd: Boolean,
    mediumInset: Boolean,
    mediumInsetIos: Boolean,
    mediumInsetMd: Boolean,
    largeInset: Boolean,
    largeInsetIos: Boolean,
    largeInsetMd: Boolean,
    xlargeInset: Boolean,
    xlargeInsetIos: Boolean,
    xlargeInsetMd: Boolean,
    strong: Boolean,
    strongIos: Boolean,
    strongMd: Boolean,
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
        insetIos,
        insetMd,
        xsmallInset,
        xsmallInsetIos,
        xsmallInsetMd,
        smallInset,
        smallInsetIos,
        smallInsetMd,
        mediumInset,
        mediumInsetIos,
        mediumInsetMd,
        largeInset,
        largeInsetIos,
        largeInsetMd,
        xlargeInset,
        xlargeInsetIos,
        xlargeInsetMd,
        strong,
        strongIos,
        strongMd,
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
          'inset-ios': insetIos,
          'inset-md': insetMd,
          'xsmall-inset': xsmallInset,
          'xsmall-inset-ios': xsmallInsetIos,
          'xsmall-inset-md': xsmallInsetMd,
          'small-inset': smallInset,
          'small-inset-ios': smallInsetIos,
          'small-inset-md': smallInsetMd,
          'medium-inset': mediumInset,
          'medium-inset-ios': mediumInsetIos,
          'medium-inset-md': mediumInsetMd,
          'large-inset': largeInset,
          'large-inset-ios': largeInsetIos,
          'large-inset-md': largeInsetMd,
          'xlarge-inset': xlargeInset,
          'xlarge-inset-ios': xlargeInsetIos,
          'xlarge-inset-md': xlargeInsetMd,
          'block-strong': strong,
          'block-strong-ios': strongIos,
          'block-strong-md': strongMd,
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
