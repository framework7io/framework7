<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount, onBeforeUpdate, onUpdated } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

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
  setup(props) {
    let f7Messages = null;
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
      });
    });

    onBeforeUpdate(() => {
      if (!props.init || !elRef.value) return;
      const children = elRef.value.children;
      if (!children) return;

      for (let i = 0; i < children.length; i += 1) {
        children[i].classList.add('message-appeared');
      }
    });

    onUpdated(() => {
      if (!props.init) return;
      if (!elRef.value) return;

      const children = elRef.value.children;
      if (!children) return;

      for (let i = 0; i < children.length; i += 1) {
        if (!children[i].classList.contains('message-appeared')) {
          children[i].classList.add('message-appear-from-bottom');
        }
      }

      if (f7Messages && f7Messages.layout && props.autoLayout) {
        f7Messages.layout();
      }
      if (f7Messages && f7Messages.scroll && props.scrollMessages) {
        f7Messages.scroll();
      }
    });

    onBeforeUnmount(() => {
      if (f7Messages && f7Messages.destroy) f7Messages.destroy();
      f7Messages = null;
    });

    const classes = computed(() => classNames('messages', colorClasses(props)));

    return {
      elRef,
      classes,
      renderMessages(messagesToRender, method) {
        if (!f7Messages) return undefined;
        return f7Messages.renderMessages(messagesToRender, method);
      },
      layout() {
        if (!f7Messages) return undefined;
        return f7Messages.layout();
      },
      scroll(duration, scrollTop) {
        if (!f7Messages) return undefined;
        return f7Messages.scroll(duration, scrollTop);
      },
      clear() {
        if (!f7Messages) return undefined;
        return f7Messages.clear();
      },
      removeMessage(messageToRemove, layout) {
        if (!f7Messages) return undefined;
        return f7Messages.removeMessage(messageToRemove, layout);
      },
      removeMessages(messagesToRemove, layout) {
        if (!f7Messages) return undefined;
        return f7Messages.removeMessages(messagesToRemove, layout);
      },
      addMessage(...args) {
        if (!f7Messages) return undefined;
        return f7Messages.addMessage(...args);
      },
      addMessages(...args) {
        if (!f7Messages) return undefined;
        return f7Messages.addMessages(...args);
      },
      showTyping(message) {
        if (!f7Messages) return undefined;
        return f7Messages.showTyping(message);
      },
      hideTyping() {
        if (!f7Messages) return undefined;
        return f7Messages.hideTyping();
      },
      destroy() {
        if (!f7Messages) return undefined;
        return f7Messages.destroy();
      },
    };
  },
};
</script>
