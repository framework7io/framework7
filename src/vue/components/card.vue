<template>
  <div
    ref="elRef"
    :class="classes"
    :data-animate="typeof animate === 'undefined' ? animate : animate.toString()"
    :data-hide-navbar-on-open="
      typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString()
    "
    :data-hide-toolbar-on-open="
      typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString()
    "
    :data-hide-statusbar-on-open="
      typeof hideStatusbarOnOpen === 'undefined'
        ? hideStatusbarOnOpen
        : hideStatusbarOnOpen.toString()
    "
    :data-scrollable-el="scrollableEl"
    :data-swipe-to-close="
      typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString()
    "
    :data-close-by-backdrop-click="
      typeof closeByBackdropClick === 'undefined'
        ? closeByBackdropClick
        : closeByBackdropClick.toString()
    "
    :data-backdrop="typeof backdrop === 'undefined' ? backdrop : backdrop.toString()"
    :data-backdrop-el="backdropEl"
  >
    <f7-card-header v-if="hasHeader">
      {{ title }}
      <slot name="header" />
    </f7-card-header>
    <f7-card-content v-if="hasContent" :padding="padding">
      {{ content }}
      <slot name="content" />
    </f7-card-content>
    <f7-card-footer v-if="hasFooter">
      {{ footer }}
      <slot name="footer" />
    </f7-card-footer>
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7, f7ready } from '../shared/f7.js';

import f7CardHeader from './card-header.js';
import f7CardContent from './card-content.js';
import f7CardFooter from './card-footer.js';

export default {
  name: 'f7-card',
  components: {
    f7CardHeader,
    f7CardContent,
    f7CardFooter,
  },
  props: {
    title: [String, Number],
    content: [String, Number],
    footer: [String, Number],
    raised: Boolean,
    outline: Boolean,
    outlineIos: Boolean,
    outlineMd: Boolean,
    headerDivider: Boolean,
    footerDivider: Boolean,
    expandable: Boolean,
    expandableAnimateWidth: Boolean,
    expandableOpened: Boolean,
    animate: {
      type: Boolean,
      default: undefined,
    },
    hideNavbarOnOpen: {
      type: Boolean,
      default: undefined,
    },
    hideToolbarOnOpen: {
      type: Boolean,
      default: undefined,
    },
    hideStatusbarOnOpen: {
      type: Boolean,
      default: undefined,
    },
    scrollableEl: {
      type: String,
      default: undefined,
    },
    swipeToClose: {
      type: Boolean,
      default: undefined,
    },
    closeByBackdropClick: {
      type: Boolean,
      default: undefined,
    },
    backdrop: {
      type: Boolean,
      default: undefined,
    },
    backdropEl: {
      type: String,
      default: undefined,
    },
    padding: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  emits: [
    'card:beforeopen',
    'card:open',
    'card:opened',
    'card:close',
    'card:closed',
    'update:expandableOpened',
  ],
  setup(props, { emit, slots }) {
    const elRef = ref(null);

    const open = () => {
      if (!elRef.value) return;
      f7.card.open(elRef.value);
    };
    const close = () => {
      if (!elRef.value) return;
      f7.card.close(elRef.value);
    };
    const onBeforeOpen = (el, prevent) => {
      if (elRef.value !== el) return;
      emit('card:beforeopen', el, prevent);
    };
    const onOpen = (el) => {
      if (elRef.value !== el) return;
      emit('card:open', el);
      emit('update:expandableOpened', true);
    };
    const onOpened = (el, pageEl) => {
      if (elRef.value !== el) return;
      emit('card:opened', el, pageEl);
    };
    const onClose = (el) => {
      if (elRef.value !== el) return;
      emit('card:close', el);
    };
    const onClosed = (el, pageEl) => {
      if (elRef.value !== el) return;
      emit('card:closed', el, pageEl);
      emit('update:expandableOpened', false);
    };

    onMounted(() => {
      if (!props.expandable || !elRef.value) return;
      f7ready(() => {
        if (props.expandable && props.expandableOpened) {
          f7.card.open(elRef.value, false);
        }
        f7.on('cardBeforeOpen', onBeforeOpen);
        f7.on('cardOpen', onOpen);
        f7.on('cardOpened', onOpened);
        f7.on('cardClose', onClose);
        f7.on('cardClosed', onClosed);
      });
    });

    onBeforeUnmount(() => {
      f7.off('cardBeforeOpen', onBeforeOpen);
      f7.off('cardOpen', onOpen);
      f7.off('cardOpened', onOpened);
      f7.off('cardClose', onClose);
      f7.off('cardClosed', onClosed);
    });

    watch(
      () => props.expandableOpened,
      (value) => {
        if (value) {
          open();
        } else {
          close();
        }
      },
    );

    const hasHeader = computed(() => props.title || slots.header);
    const hasContent = computed(() => props.content || slots.content);
    const hasFooter = computed(() => props.footer || slots.footer);

    const classes = computed(() =>
      classNames(
        'card',
        {
          'card-raised': props.raised,
          'card-outline': props.outline,
          'card-outline-ios': props.outlineIos,
          'card-outline-md': props.outlineMd,
          'card-expandable': props.expandable,
          'card-expandable-animate-width': props.expandableAnimateWidth,
          'card-header-divider': props.headerDivider,
          'card-footer-divider': props.footerDivider,
        },
        colorClasses(props),
      ),
    );
    return {
      elRef,
      classes,
      hasHeader,
      hasContent,
      hasFooter,
    };
  },
};
</script>
