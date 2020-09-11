<template>
  <component :is="tag" ref="elRef" :class="classesComputed" v-bind="attrs">
    <f7-icon v-if="icon" v-bind="icon.props">
      <f7-badge v-if="icon.badge" v-bind="icon.badge.props">{{ icon.badge.content }}</f7-badge>
    </f7-icon>
    <span v-if="text">{{ text }}</span>
    <slot />
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

import f7Icon from './icon';
import f7Badge from './badge';

export default {
  name: 'f7-button',
  components: {
    f7Icon,
    f7Badge,
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
