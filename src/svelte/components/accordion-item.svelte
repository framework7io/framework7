<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  let { class: className, opened = false, children, ...restProps } = $props();

  let el = $state(null);

  const classes = $derived(
    classNames(
      className,
      'accordion-item',
      {
        'accordion-item-opened': opened,
      },
      colorClasses(restProps),
    ),
  );

  function onBeforeOpen(accEl, prevent) {
    if (accEl !== el) return;
    restProps.onAccordionBeforeOpen?.(prevent);
  }
  function onOpen(accEl) {
    if (accEl !== el) return;
    restProps.onAccordionOpen?.();
  }
  function onOpened(accEl) {
    if (accEl !== el) return;
    restProps.onAccordionOpened?.();
  }
  function onBeforeClose(accEl, prevent) {
    if (accEl !== el) return;
    restProps.onAccordionBeforeClose?.(prevent);
  }
  function onClose(accEl) {
    if (accEl !== el) return;
    restProps.onAccordionClose?.();
  }
  function onClosed(accEl) {
    if (accEl !== el) return;
    restProps.onAccordionClosed?.();
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
