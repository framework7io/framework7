<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let opened = undefined;

  let el;

  $: classes = classNames(
    className,
    'accordion-item',
    {
      'accordion-item-opened': opened,
    },
    colorClasses($$props),
  );

  function onBeforeOpen(accEl, prevent) {
    if (accEl !== el) return;
    emit('accordionBeforeOpen', [prevent]);
  }
  function onOpen(accEl) {
    if (accEl !== el) return;
    emit('accordionOpen');
  }
  function onOpened(accEl) {
    if (accEl !== el) return;
    emit('accordionOpened');
  }
  function onBeforeClose(accEl, prevent) {
    if (accEl !== el) return;
    emit('accordionBeforeClose', [prevent]);
  }
  function onClose(accEl) {
    if (accEl !== el) return;
    emit('accordionClose');
  }
  function onClosed(accEl) {
    if (accEl !== el) return;
    emit('accordionClosed');
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

<div bind:this={el} class={classes} {...restProps($$restProps)}>
  <slot />
</div>
