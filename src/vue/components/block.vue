<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { ref, computed } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { useTab } from '../shared/use-tab';

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
    tabs: Boolean,
    tab: Boolean,
    tabActive: Boolean,
    accordionList: Boolean,
    accordionOpposite: Boolean,
    noHairlines: Boolean,
    noHairlinesMd: Boolean,
    noHairlinesIos: Boolean,
    noHairlinesAurora: Boolean,
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
        accordionList,
        accordionOpposite,
        tabs,
        tab,
        tabActive,
        noHairlines,
        noHairlinesMd,
        noHairlinesIos,
        noHairlinesAurora,
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
          'no-hairlines': noHairlines,
          'no-hairlines-md': noHairlinesMd,
          'no-hairlines-ios': noHairlinesIos,
          'no-hairlines-aurora': noHairlinesAurora,
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
