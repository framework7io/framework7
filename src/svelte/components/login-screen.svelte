<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let opened = undefined;

  let el;
  let f7LoginScreen;

  export function instance() {
    return f7LoginScreen;
  }

  export function open(anim) {
    if (!f7LoginScreen) return undefined;
    return f7LoginScreen.open(anim);
  }
  export function close(anim) {
    if (!f7LoginScreen) return undefined;
    return f7LoginScreen.close(anim);
  }

  $: classes = Utils.classNames(
    className,
    'login-screen',
    Mixins.colorClasses($$props),
  );

  function onOpen(instance) {
    dispatch('loginscreenOpen', [instance]);
    if (typeof $$props.onLoginscreenOpen === 'function') $$props.onLoginscreenOpen(instance);
  }
  function onOpened(instance) {
    dispatch('loginscreenOpened', [instance]);
    if (typeof $$props.onLoginscreenOpened === 'function') $$props.onLoginscreenOpened(instance);
  }
  function onClose(instance) {
    dispatch('loginscreenClose', [instance]);
    if (typeof $$props.onLoginscreenClose === 'function') $$props.onLoginscreenClose(instance);
  }
  function onClosed(instance) {
    dispatch('loginscreenClosed', [instance]);
    if (typeof $$props.onLoginscreenClosed === 'function') $$props.onLoginscreenClosed(instance);
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

    f7.ready(() => {
      f7LoginScreen = f7.instance.loginScreen.create(params);
      if (opened) {
        f7LoginScreen.open(false);
      }
    });
  });
  onDestroy(() => {
    if (f7LoginScreen) f7LoginScreen.destroy();
    f7LoginScreen = undefined;
  });
</script>
<div
  id={id}
  style={style}
  class={classes}
  bind:this={el}
>
  <slot />
</div>
