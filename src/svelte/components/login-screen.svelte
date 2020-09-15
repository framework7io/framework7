<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

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
    if (typeof $$props.onLoginScreenOpen === 'function') $$props.onLoginScreenOpen(instance);
  }
  function onOpened(instance) {
    dispatch('loginscreenOpened', [instance]);
    if (typeof $$props.onLoginScreenOpened === 'function') $$props.onLoginScreenOpened(instance);
  }
  function onClose(instance) {
    dispatch('loginscreenClose', [instance]);
    if (typeof $$props.onLoginScreenClose === 'function') $$props.onLoginScreenClose(instance);
  }
  function onClosed(instance) {
    dispatch('loginscreenClosed', [instance]);
    if (typeof $$props.onLoginScreenClosed === 'function') $$props.onLoginScreenClosed(instance);
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
  class={classes}
  bind:this={el}
  {...restProps($$restProps)}
>
  <slot />
</div>
