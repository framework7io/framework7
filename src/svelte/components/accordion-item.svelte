<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';


  let {
    class: className,
    opened = false,
    children,
    ...restProps
  } = $props();

  let el;

  const classes = $derived(classNames(
    className,
    'accordion-item',
    {
      'accordion-item-opened': opened,
    },
    colorClasses(restProps),
  ));

  function onBeforeOpen(accEl, prevent) {
    if (accEl !== el) return;
    restProps.accordionBeforeOpen?.(prevent);
  }
  function onOpen(accEl) {
    if (accEl !== el) return;
    restProps.accordionOpen?.();
  }
  function onOpened(accEl) {
    if (accEl !== el) return;
    restProps.accordionOpened?.();
  }
  function onBeforeClose(accEl, prevent) {
    if (accEl !== el) return;
    restProps.accordionBeforeClose?.(prevent);
  }
  function onClose(accEl) {
    if (accEl !== el) return;
    restProps.accordionClose?.();
  }
  function onClosed(accEl) {
    if (accEl !== el) return;
    restProps.accordionClosed?.();
  }

  onMount(() => {
    f7ready(() => {
      app.f7.on('accordionBeforeOpen', onBeforeOpen);
      app.f7.on('accordionOpen', onOpen);
      app.f7.on('accordionOpened', onOpened);
      app.f7.on('accordionBeforeClose', onBeforeClose);
      app.f7.on('accordionClose', onClose);
      app.f7.on('accordionClosed', onClosed);
    });
  });

  onDestroy(() => {
    if (!app.f7 || !el) return;
    app.f7.off('accordionBeforeOpen', onBeforeOpen);
    app.f7.off('accordionOpen', onOpen);
    app.f7.off('accordionOpened', onOpened);
    app.f7.off('accordionBeforeClose', onBeforeClose);
    app.f7.off('accordionClose', onClose);
    app.f7.off('accordionClosed', onClosed);
  });
</script>

<div bind:this={el} class={classes} {...restProps}>
  {@render children?.()}
</div>
