<template>
  <a ref="elRef" :class="classes" v-bind="attrs">
    <f7-use-icon v-if="icon" :icon="icon" />
    <span v-if="text" :class="isTabbarLabel ? 'tabbar-label' : ''">
      {{ text }}
      <f7-badge v-if="badge" :color="badgeColor">{{ badge }}</f7-badge>
    </span>
    <slot />
  </a>
</template>
<script>
import { computed, ref, inject } from 'vue';
import { classNames, isStringProp } from '../shared/utils';
import {
  colorClasses,
  routerAttrs,
  routerClasses,
  actionsAttrs,
  actionsClasses,
  colorProps,
  actionsProps,
  routerProps,
  iconProps,
} from '../shared/mixins';

import { useIcon } from '../shared/use-icon';
import { useRouteProps } from '../shared/use-route-props';
import { useTooltip } from '../shared/use-tooltip';
import { useSmartSelect } from '../shared/use-smart-select';
import f7Badge from './badge';
import f7UseIcon from './use-icon';

export default {
  name: 'f7-link',
  components: {
    f7Badge,
    f7UseIcon,
  },
  props: {
    noLinkClass: Boolean,
    text: String,
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    tabbarLabel: Boolean,
    iconOnly: Boolean,
    badge: [String, Number],
    badgeColor: [String],
    href: {
      type: [String, Boolean],
      default: '#',
    },
    target: String,
    tooltip: String,
    tooltipTrigger: String,
    smartSelect: Boolean,
    smartSelectParams: Object,
    ...iconProps,
    ...colorProps,
    ...actionsProps,
    ...routerProps,
  },
  setup(props, { slots }) {
    const elRef = ref(null);
    let f7SmartSelect = null;

    useTooltip(elRef, props);

    useRouteProps(elRef, props);

    useSmartSelect(
      props,
      (instance) => {
        f7SmartSelect = instance;
      },
      () => {
        return elRef.value;
      },
    );

    const TabbarContext = inject('TabbarContext', { value: {} });

    const isTabbarLabel = computed(() => props.tabbarLabel || TabbarContext.value.tabbarHasLabels);

    const attrs = computed(() => {
      const { href, tabLink, target } = props;
      let hrefComputed = href;
      if (href === true) hrefComputed = '#';
      if (href === false) hrefComputed = undefined; // no href attribute
      return {
        href: hrefComputed,
        target,
        'data-tab': (isStringProp(tabLink) && tabLink) || undefined,
        ...routerAttrs(props),
        ...actionsAttrs(props),
      };
    });

    const classes = computed(() => {
      const { iconOnly, text, noLinkClass, tabLink, tabLinkActive, smartSelect } = props;
      let iconOnlyComputed;
      const hasChildren = slots && slots.default;
      if (iconOnly || (!text && !hasChildren)) {
        iconOnlyComputed = true;
      } else {
        iconOnlyComputed = false;
      }
      return classNames(
        {
          link: !(noLinkClass || isTabbarLabel.value),
          'icon-only': iconOnlyComputed,
          'tab-link': tabLink || tabLink === '',
          'tab-link-active': tabLinkActive,
          'smart-select': smartSelect,
        },
        colorClasses(props),
        routerClasses(props),
        actionsClasses(props),
      );
    });

    const icon = computed(() => useIcon(props));

    return {
      elRef,
      icon,
      isTabbarLabel,
      attrs,
      classes,
      f7SmartSelect,
    };
  },
};
</script>
