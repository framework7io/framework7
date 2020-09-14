<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';
import { modalStateClasses } from '../shared/modal-state-classes';

export default {
  name: 'f7-login-screen',
  props: {
    opened: Boolean,
    animate: {
      type: Boolean,
      default: undefined,
    },
    ...colorProps,
  },
  emits: [
    'loginscreen:open',
    'loginscreen:opened',
    'loginscreen:close',
    'loginscreen:closed',
    'update:opened',
  ],
  setup(props, { emit }) {
    const f7LoginScreen = ref(null);
    const isOpened = ref(props.opened);
    const isClosing = ref(false);
    const elRef = ref(null);

    const onOpen = (instance) => {
      isOpened.value = true;
      isClosing.value = false;
      emit('loginscreen:open', instance);
      emit('update:opened', true);
    };
    const onOpened = (instance) => {
      emit('loginscreen:opened', instance);
    };
    const onClose = (instance) => {
      isOpened.value = false;
      isClosing.value = true;
      emit('loginscreen:close', instance);
    };
    const onClosed = (instance) => {
      isClosing.value = false;
      emit('loginscreen:closed', instance);
      emit('update:opened', false);
    };
    const open = (anim) => {
      if (!f7LoginScreen.value) return undefined;
      return f7LoginScreen.value.open(anim);
    };
    const close = (anim) => {
      if (!f7LoginScreen.value) return undefined;
      return f7LoginScreen.value.close(anim);
    };

    watch(
      () => props.opened,
      (value) => {
        if (!f7LoginScreen.value) return;
        if (value) {
          f7LoginScreen.value.open();
        } else {
          f7LoginScreen.value.close();
        }
      },
    );

    onMounted(() => {
      if (!elRef.value) return;
      f7ready(() => {
        const loginScreenParams = {
          el: elRef.value,
          on: {
            open: onOpen,
            opened: onOpened,
            close: onClose,
            closed: onClosed,
          },
        };
        if (typeof props.animate !== 'undefined') {
          loginScreenParams.animate = props.animate;
        }
        f7LoginScreen.value = f7.loginScreen.create(loginScreenParams);
        if (props.opened) {
          f7LoginScreen.value.open(false);
        }
      });
    });

    onBeforeUnmount(() => {
      if (f7LoginScreen.value) {
        f7LoginScreen.value.destroy();
      }
      f7LoginScreen.value = null;
    });

    const classes = computed(() =>
      classNames('login-screen', modalStateClasses({ isOpened, isClosing }), colorClasses(props)),
    );

    return {
      open,
      close,
      elRef,
      classes,
    };
  },
};
</script>
