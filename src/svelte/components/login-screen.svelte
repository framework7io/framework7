<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';
  import { modalStateClasses } from '../shared/modal-state-classes.js';

  let {
    class: className,
    style = '',
    opened = undefined,
    animate = undefined,
    containerEl = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let f7LoginScreen = $state(null);
  let isOpened = $state(opened);
  let isClosing = $state(false);

  export function instance() {
    return f7LoginScreen;
  }

  const classes = $derived(
    classNames(
      className,
      'login-screen',
      modalStateClasses({ isOpened, isClosing }),
      colorClasses(restProps),
    ),
  );

  function onOpen(instance) {
    isOpened = true;
    isClosing = false;
    restProps.onLoginScreenOpen?.(instance);
    restProps.onloginscreenopen?.();
    opened = true;
  }
  function onOpened(instance) {
    restProps.onLoginScreenOpened?.(instance);
    restProps.onloginscreenopened?.();
  }
  function onClose(instance) {
    isOpened = false;
    isClosing = true;
    restProps.onLoginScreenClose?.(instance);
    restProps.onloginscreenclose?.();
    opened = false;
  }
  function onClosed(instance) {
    isClosing = false;
    restProps.onLoginScreenClosed?.(instance);
    restProps.onloginscreenclosed?.();
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

  $effect(() => watchOpened(opened));

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
      f7LoginScreen = app.f7.loginScreen.create(params);
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

<div class={classes} bind:this={el} {style} {...restProps}>
  {@render children?.(f7LoginScreen)}
</div>
