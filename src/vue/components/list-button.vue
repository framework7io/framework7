<template>
  <li>
    <a ref="linkElRef" :class="linkClasses" v-bind="linkAttrs" @click="onClick">
      {{ title }}
      {{ text }}
      <slot />
    </a>
  </li>
</template>
<script>
import { computed, ref } from 'vue';
import { classNames, isStringProp } from '../shared/utils.js';
import {
  colorClasses,
  colorProps,
  actionsAttrs,
  actionsClasses,
  actionsProps,
  routerAttrs,
  routerClasses,
  routerProps,
} from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { useRouteProps } from '../shared/use-route-props.js';

export default {
  name: 'f7-list-button',
  props: {
    title: [String, Number],
    text: [String, Number],
    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    link: [Boolean, String],
    href: [Boolean, String],
    target: String,
    tooltip: String,
    tooltipTrigger: String,
    ...colorProps,
    ...actionsProps,
    ...routerProps,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const linkElRef = ref(null);

    const onClick = (e) => {
      emit('click', e);
    };
    useTooltip(linkElRef, props);

    useRouteProps(linkElRef, props);

    const linkAttrs = computed(() => {
      return {
        href:
          typeof props.link === 'boolean' && typeof props.href === 'boolean'
            ? '#'
            : props.link || props.href,
        target: props.target,
        'data-tab': isStringProp(props.tabLink) && props.tabLink,
        ...routerAttrs(props),
        ...actionsAttrs(props),
      };
    });

    const linkClasses = computed(() => {
      return classNames({
        'list-button': true,
        'tab-link': props.tabLink || props.tabLink === '',
        'tab-link-active': props.tabLinkActive,
        ...colorClasses(props),
        ...routerClasses(props),
        ...actionsClasses(props),
      });
    });

    return { linkAttrs, linkClasses, onClick, linkElRef };
  },
};
</script>
