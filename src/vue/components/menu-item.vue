<template>
  <component :is="tag" ref="elRef" :class="classes" v-bind="attrs" @click="onClick">
    <div v-if="text || $slots.text || icon" class="menu-item-content">
      {{ text }}
      <f7-use-icon v-if="icon" :icon="icon" />
      <slot name="text" />
    </div>
    <slot />
  </component>
</template>
<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils';
import {
  colorClasses,
  colorProps,
  routerProps,
  routerAttrs,
  routerClasses,
  actionsProps,
  actionsClasses,
  actionsAttrs,
  iconProps,
} from '../shared/mixins';
import { useRouteProps } from '../shared/use-route-props';
import { useIcon } from '../shared/use-icon';
import { f7ready, f7 } from '../shared/f7';
import { useTooltip } from '../shared/use-tooltip';

import f7UseIcon from './use-icon';

export default {
  name: 'f7-menu-item',
  components: {
    f7UseIcon,
  },
  props: {
    text: String,
    iconOnly: Boolean,
    href: String,
    link: Boolean,
    target: String,
    dropdown: Boolean,
    tooltip: String,
    tooltipTrigger: String,
    ...colorProps,
    ...routerProps,
    ...actionsProps,
    ...iconProps,
  },
  emits: ['click', 'menu:opened', 'menu:closed'],
  setup(props, { slots, emit }) {
    const elRef = ref(null);

    useTooltip(elRef, props);

    const onClick = (e) => {
      emit('click', e);
    };
    const onOpened = (el) => {
      if (elRef.value !== el) return;
      emit('menu:opened', el);
    };
    const onClosed = (el) => {
      if (elRef.value !== el) return;
      emit('menu:closed', el);
    };

    useRouteProps(elRef, props);

    const attachEvents = () => {
      f7ready(() => {
        f7.on('menuOpened', onOpened);
        f7.on('menuClosed', onClosed);
      });
    };

    const detachEvents = () => {
      f7.off('menuOpened', onOpened);
      f7.off('menuClosed', onOpened);
    };

    onMounted(() => attachEvents());
    onBeforeUnmount(() => detachEvents());

    const icon = computed(() => useIcon(props));

    const tag = computed(() => {
      const isLink = props.link || props.href || props.href === '';
      return isLink ? 'a' : 'div';
    });

    const classes = computed(() => {
      let iconOnlyComputed;

      if (props.iconOnly || (!props.text && !slots.text)) {
        iconOnlyComputed = true;
      } else {
        iconOnlyComputed = false;
      }

      const isDropdown = props.dropdown || props.dropdown === '';

      return classNames(
        {
          'menu-item': true,
          'menu-item-dropdown': isDropdown,
          'icon-only': iconOnlyComputed,
        },
        colorClasses(props),
        routerClasses(props),
        actionsClasses(props),
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
      tag,
      classes,
      attrs,
      icon,
      onClick,
      elRef,
    };
  },
};
</script>
