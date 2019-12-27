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

  $: classes = Utils.classNames(
    className,
    'login-screen',
    Mixins.colorClasses($$props),
  );

  function onOpen(instance) {
    dispatch('loginscreen:open', [instance]);
  }
  function onOpened(instance) {
    dispatch('loginscreen:opened', [instance]);
  }
  function onClose(instance) {
    dispatch('loginscreen:close', [instance]);
  }
  function onClosed(instance) {
    dispatch('loginscreen:closed', [instance]);
  }

  function watchOpened(openedPassed) {
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
