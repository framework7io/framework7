<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';

  const dispatch = createEventDispatcher();

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
    dispatch('accordionBeforeOpen', [prevent]);
    if (typeof $$props.onAccordionBeforeOpen === 'function') $$props.onAccordionBeforeOpen(prevent);
  }
  function onOpen(accEl) {
    if (accEl !== el) return;
    dispatch('accordionOpen');
    if (typeof $$props.onAccordionOpen === 'function') $$props.onAccordionOpen();
  }
  function onOpened(accEl) {
    if (accEl !== el) return;
    dispatch('accordionOpened');
    if (typeof $$props.onAccordionOpened === 'function') $$props.onAccordionOpened();
  }
  function onBeforeClose(accEl, prevent) {
    if (accEl !== el) return;
    dispatch('accordionBeforeClose', [prevent]);
    if (typeof $$props.onAccordionBeforeClose === 'function')
      $$props.onAccordionBeforeClose(prevent);
  }
  function onClose(accEl) {
    if (accEl !== el) return;
    dispatch('accordionClose');
    if (typeof $$props.onAccordionClose === 'function') $$props.onAccordionClose();
  }
  function onClosed(accEl) {
    if (accEl !== el) return;
    dispatch('accordionClosed');
    if (typeof $$props.onAccordionClosed === 'function') $$props.onAccordionClosed();
  }

  onMount(() => {
    f7ready(() => {
      f7.on('accordionBeforeOpen', onBeforeOpen);
      f7.on('accordionOpen', onOpen);
      f7.on('accordionOpened', onOpened);
      f7.on('accordionBeforeClose', onBeforeClose);
      f7.on('accordionClose', onClose);
      f7.on('accordionClosed', onClosed);
    });
  });

  onDestroy(() => {
    if (!f7 || !el) return;
    f7.off('accordionBeforeOpen', onBeforeOpen);
    f7.off('accordionOpen', onOpen);
    f7.off('accordionOpened', onOpened);
    f7.off('accordionBeforeClose', onBeforeClose);
    f7.off('accordionClose', onClose);
    f7.off('accordionClosed', onClosed);
  });
</script>

<div bind:this={el} class={classes} {...restProps($$restProps)}>
  <slot />
</div>
