<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount, onBeforeUpdate, onUpdated, watch } from 'vue';
import { classNames, getChildren, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-messages',
  props: {
    autoLayout: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: Array,
      default() {
        return [];
      },
    },
    newMessagesFirst: {
      type: Boolean,
      default: false,
    },
    scrollMessages: {
      type: Boolean,
      default: true,
    },
    scrollMessagesOnEdge: {
      type: Boolean,
      default: true,
    },
    typing: {
      type: Boolean,
      default: false,
    },
    firstMessageRule: Function,
    lastMessageRule: Function,
    tailMessageRule: Function,
    sameNameMessageRule: Function,
    sameHeaderMessageRule: Function,
    sameFooterMessageRule: Function,
    sameAvatarMessageRule: Function,
    customClassMessageRule: Function,
    renderMessage: Function,

    init: {
      type: Boolean,
      default: true,
    },
    ...colorProps,
  },
  setup(props, { slots }) {
    let f7Messages = null;
    let childrenBeforeUpdated = null;
    const elRef = ref(null);

    onMounted(() => {
      if (!props.init) return;

      f7ready(() => {
        f7Messages = f7.messages.create(
          noUndefinedProps({
            el: elRef.value,
            autoLayout: props.autoLayout,
            messages: props.messages,
            newMessagesFirst: props.newMessagesFirst,
            scrollMessages: props.scrollMessages,
            scrollMessagesOnEdge: props.scrollMessagesOnEdge,
            firstMessageRule: props.firstMessageRule,
            lastMessageRule: props.lastMessageRule,
            tailMessageRule: props.tailMessageRule,
            sameNameMessageRule: props.sameNameMessageRule,
            sameHeaderMessageRule: props.sameHeaderMessageRule,
            sameFooterMessageRule: props.sameFooterMessageRule,
            sameAvatarMessageRule: props.sameAvatarMessageRule,
            customClassMessageRule: props.customClassMessageRule,
            renderMessage: props.renderMessage,
          }),
        );
        if (f7Messages && props.typing) {
          f7Messages.showTyping();
        }
      });
    });

    onBeforeUpdate(() => {
      if (!props.init || !elRef.value) return;
      const children = elRef.value.children;
      if (!children) return;
      childrenBeforeUpdated = children.length;

      for (let i = 0; i < children.length; i += 1) {
        children[i].classList.add('message-appeared');
      }
      const childrenAfterUpdate = getChildren(slots);
      if (f7Messages && props.scrollMessages && childrenBeforeUpdated !== childrenAfterUpdate) {
        f7Messages.setScrollData();
      }
    });

    onUpdated(() => {
      if (!props.init) return;
      if (!elRef.value) return;

      const children = elRef.value.children;
      if (!children) return;
      const childerAftterUpdated = children.length;

      for (let i = 0; i < children.length; i += 1) {
        if (!children[i].classList.contains('message-appeared')) {
          children[i].classList.add('message-appear-from-bottom');
        }
      }

      if (f7Messages && f7Messages.layout && props.autoLayout) {
        f7Messages.layout();
      }
      if (
        childerAftterUpdated !== childrenBeforeUpdated &&
        f7Messages &&
        f7Messages.scroll &&
        f7Messages.scrollData &&
        props.scrollMessages
      ) {
        f7Messages.scrollWithEdgeCheck(true);
      }
    });

    onBeforeUnmount(() => {
      if (f7Messages && f7Messages.destroy) f7Messages.destroy();
      f7Messages = null;
    });

    watch(
      () => props.typing,
      (newValue) => {
        if (!f7Messages) return;
        if (newValue) f7Messages.showTyping();
        else f7Messages.hideTyping();
      },
    );

    const classes = computed(() => classNames('messages', colorClasses(props)));

    return {
      elRef,
      classes,
    };
  },
};
</script>
