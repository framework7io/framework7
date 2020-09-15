<template>
  <div ref="elRef" :class="classes" v-bind="attrs" @click="onClick">
    {{ text }}
    <slot />
  </div>
</template>
<script>
import { computed, ref } from 'vue';
import { classNames } from '../shared/utils';
import {
  colorClasses,
  colorProps,
  routerProps,
  routerAttrs,
  routerClasses,
  actionsProps,
  actionsAttrs,
  actionsClasses,
} from '../shared/mixins';
import { useRouteProps } from '../shared/use-route-props';

export default {
  name: 'f7-menu-dropdown-item',
  props: {
    text: String,
    link: Boolean,
    href: String,
    target: String,
    divider: Boolean,
    ...colorProps,
    ...routerProps,
    ...actionsProps,
  },
  emits: ['click'],
  setup(props, { emit }) {
    const elRef = ref(null);

    const onClick = (e) => {
      emit('click', e);
    };

    useRouteProps(elRef, props);

    const isLink = computed(() => props.link || props.href || props.href === '');

    const tag = computed(() => (isLink.value ? 'a' : 'div'));

    const classes = computed(() => {
      return classNames(
        {
          'menu-dropdown-link': isLink.value && !props.divider,
          'menu-dropdown-item': !isLink.value && !props.divider,
          'menu-dropdown-divider': props.divider,
        },
        colorClasses(props),
        routerClasses(props),
        actionsClasses(props),
        {
          'menu-close': typeof props.menuClose === 'undefined',
        },
      );
    });

    const attrs = computed(() => {
      let hrefComputed = props.href;
      if (typeof hrefComputed === 'undefined' && props.link) hrefComputed = '#';
      return {
        href: hrefComputed,
        target: props.target,
        ...routerAttrs(props),
        ...actionsAttrs(props),
      };
    });

    return {
      classes,
      attrs,
      tag,
      onClick,
      elRef,
    };
  },
};
</script>
