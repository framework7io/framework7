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

  $: classes = Utils.classNames(
    className,
    'accordion-item',
    {
      'accordion-item-opened': opened,
    },
    Mixins.colorClasses($$props),
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
    if (typeof $$props.onAccordionBeforeClose === 'function') $$props.onAccordionBeforeClose(prevent);
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
    f7.ready(() => {
      f7.instance.on('accordionBeforeOpen', onBeforeOpen);
      f7.instance.on('accordionOpen', onOpen);
      f7.instance.on('accordionOpened', onOpened);
      f7.instance.on('accordionBeforeClose', onBeforeClose);
      f7.instance.on('accordionClose', onClose);
      f7.instance.on('accordionClosed', onClosed);
    });
  });

  onDestroy(() => {
    if (!f7.instance || !el) return;
    f7.instance.off('accordionBeforeOpen', onBeforeOpen);
    f7.instance.off('accordionOpen', onOpen);
    f7.instance.off('accordionOpened', onOpened);
    f7.instance.off('accordionBeforeClose', onBeforeClose);
    f7.instance.off('accordionClose', onClose);
    f7.instance.off('accordionClosed', onClosed);
  });

</script>

<div bind:this={el} id={id} style={style} class={classes}>
  <slot />
</div>
