<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { modalStateClasses } from '../shared/modal-state-classes';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let opened = undefined;
  export let animate = undefined;
  export let containerEl = undefined;

  let el;
  let f7LoginScreen;

  const state = {
    isOpened: opened,
    isClosing: false,
  };

  export function instance() {
    return f7LoginScreen;
  }

  $: classes = classNames(
    className,
    'login-screen',
    modalStateClasses(state),
    colorClasses($$props),
  );

  function onOpen(instance) {
    Object.assign(state, {
      isOpened: true,
      isClosing: false,
    });
    emit('loginscreenOpen', [instance]);
    opened = true;
  }
  function onOpened(instance) {
    emit('loginscreenOpened', [instance]);
  }
  function onClose(instance) {
    Object.assign(state, {
      isOpened: false,
      isClosing: true,
    });
    emit('loginscreenClose', [instance]);
  }
  function onClosed(instance) {
    Object.assign(state, {
      isClosing: false,
    });
    emit('loginscreenClosed', [instance]);
    opened = false;
  }

  let initialWatched = false;
  function watchOpened(openedPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7LoginScreen) return;
    if (openedPassed) f7LoginScreen.open();
    else f7LoginScreen.close();
  }

  $: watchOpened(opened);

  onMount(() => {
    const params = {
      el,
      on: {
        open: onOpen,
        opened: onOpened,
        close: onClose,
        closed: onClosed,
      },
    };
    if (typeof animate !== 'undefined') params.animate = animate;
    if (typeof containerEl !== 'undefined') params.containerEl = animate;

    f7ready(() => {
      f7LoginScreen = f7.loginScreen.create(params);
      if (opened) {
        f7LoginScreen.open(false);
      }
    });
  });
  onDestroy(() => {
    if (f7LoginScreen) f7LoginScreen.destroy();
    f7LoginScreen = null;
  });
</script>

<div class={classes} bind:this={el} {...restProps($$restProps)}>
  <slot />
</div>
