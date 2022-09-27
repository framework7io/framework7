<template>
  <component :is="tag" ref="elRef" :class="classesComputed" v-bind="attrs">
    <template v-if="preloader">
      <f7-preloader :size="preloaderSize" :color="preloaderColor" />
      <span>
        <f7-use-icon v-if="icon" :icon="icon" />
        <span v-if="text">{{ text }}</span>
        <slot />
      </span>
    </template>
    <template v-else>
      <f7-use-icon v-if="icon" :icon="icon" />
      <span v-if="text">{{ text }}</span>
      <slot />
    </template>
  </component>
</template>
<script>
import { ref, computed } from 'vue';
import { classNames, extend, isStringProp } from '../shared/utils.js';
import {
  colorClasses,
  actionsAttrs,
  actionsClasses,
  routerAttrs,
  routerClasses,
  iconProps,
  colorProps,
  actionsProps,
  routerProps,
} from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { useIcon } from '../shared/use-icon.js';
import { useRouteProps } from '../shared/use-route-props.js';

import f7Preloader from './preloader.js';
import f7UseIcon from './use-icon.js';

export default {
  name: 'f7-button',
  components: {
    f7Preloader,
    f7UseIcon,
  },
  props: {
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    type: String,
    href: {
      type: [String, Boolean],
      default: '#',
    },
    target: String,
    round: Boolean,
    roundMd: Boolean,
    roundIos: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    tonal: Boolean,
    tonalMd: Boolean,
    tonalIos: Boolean,
    large: Boolean,
    largeMd: Boolean,
    largeIos: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    raised: Boolean,
    raisedMd: Boolean,
    raisedIos: Boolean,
    outline: Boolean,
    outlineMd: Boolean,
    outlineIos: Boolean,
    active: Boolean,
    disabled: Boolean,
    tooltip: String,
    tooltipTrigger: String,
    preloader: Boolean,
    preloaderSize: [Number, String],
    preloaderColor: String,
    loading: Boolean,
    ...iconProps,
    ...colorProps,
    ...actionsProps,
    ...routerProps,
  },
  setup(props) {
    const elRef = ref(null);

    useTooltip(elRef, props);

    useRouteProps(elRef, props);

    const icon = computed(() => useIcon(props));

    const tag = computed(() =>
      props.type === 'submit' || props.type === 'reset' || props.type === 'button' ? 'button' : 'a',
    );

    const attrs = computed(() => {
      const { href, tabLink, target, type } = props;
      let hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false || tag.value === 'button') hrefComputed = undefined; // no href attribute
      return extend(
        {
          href: hrefComputed,
          target,
          type,
          'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
        },
        routerAttrs(props),
        actionsAttrs(props),
      );
    });

    const classesComputed = computed(() => {
      const {
        tabLink,
        tabLinkActive,
        round,
        roundMd,
        roundIos,
        fill,
        fillMd,
        fillIos,
        tonal,
        tonalMd,
        tonalIos,
        large,
        largeMd,
        largeIos,
        small,
        smallMd,
        smallIos,
        raised,
        raisedMd,
        raisedIos,
        outline,
        outlineMd,
        outlineIos,
        active,
        disabled,
        preloader,
        loading,
      } = props;

      return classNames(
        'button',
        {
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,

          'button-round': round,
          'button-round-ios': roundIos,
          'button-round-md': roundMd,
          'button-fill': fill,
          'button-fill-ios': fillIos,
          'button-fill-md': fillMd,
          'button-tonal': tonal,
          'button-tonal-ios': tonalIos,
          'button-tonal-md': tonalMd,
          'button-large': large,
          'button-large-ios': largeIos,
          'button-large-md': largeMd,
          'button-small': small,
          'button-small-ios': smallIos,
          'button-small-md': smallMd,
          'button-raised': raised,
          'button-raised-ios': raisedIos,
          'button-raised-md': raisedMd,
          'button-active': active,
          'button-outline': outline,
          'button-outline-ios': outlineIos,
          'button-outline-md': outlineMd,
          'button-preloader': preloader,
          'button-loading': loading,

          disabled,
        },
        colorClasses(props),
        routerClasses(props),
        actionsClasses(props),
      );
    });

    return {
      tag,
      elRef,
      attrs,
      classesComputed,
      icon,
    };
  },
};
</script>
