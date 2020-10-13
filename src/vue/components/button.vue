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
import { classNames, extend, isStringProp } from '../shared/utils';
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
} from '../shared/mixins';
import { useTooltip } from '../shared/use-tooltip';
import { useIcon } from '../shared/use-icon';
import { useRouteProps } from '../shared/use-route-props';

import f7Preloader from './preloader';
import f7UseIcon from './use-icon';

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
    roundAurora: Boolean,
    fill: Boolean,
    fillMd: Boolean,
    fillIos: Boolean,
    fillAurora: Boolean,
    large: Boolean,
    largeMd: Boolean,
    largeIos: Boolean,
    largeAurora: Boolean,
    small: Boolean,
    smallMd: Boolean,
    smallIos: Boolean,
    smallAurora: Boolean,
    raised: Boolean,
    raisedMd: Boolean,
    raisedIos: Boolean,
    raisedAurora: Boolean,
    outline: Boolean,
    outlineMd: Boolean,
    outlineIos: Boolean,
    outlineAurora: Boolean,
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
        roundAurora,
        fill,
        fillMd,
        fillIos,
        fillAurora,
        large,
        largeMd,
        largeIos,
        largeAurora,
        small,
        smallMd,
        smallIos,
        smallAurora,
        raised,
        raisedMd,
        raisedIos,
        raisedAurora,
        outline,
        outlineMd,
        outlineIos,
        outlineAurora,
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
          'button-round-aurora': roundAurora,
          'button-round-md': roundMd,
          'button-fill': fill,
          'button-fill-ios': fillIos,
          'button-fill-aurora': fillAurora,
          'button-fill-md': fillMd,
          'button-large': large,
          'button-large-ios': largeIos,
          'button-large-aurora': largeAurora,
          'button-large-md': largeMd,
          'button-small': small,
          'button-small-ios': smallIos,
          'button-small-aurora': smallAurora,
          'button-small-md': smallMd,
          'button-raised': raised,
          'button-raised-ios': raisedIos,
          'button-raised-aurora': raisedAurora,
          'button-raised-md': raisedMd,
          'button-active': active,
          'button-outline': outline,
          'button-outline-ios': outlineIos,
          'button-outline-aurora': outlineAurora,
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
