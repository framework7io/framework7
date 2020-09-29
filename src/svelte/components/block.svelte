<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { f7, f7ready } from '../shared/f7';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';

  const dispatch = createEventDispatcher();

  export let inset = false;
  export let xsmallInset = false;
  export let smallInset = false;
  export let mediumInset = false;
  export let largeInset = false;
  export let xlargeInset = false;
  export let strong = false;
  export let tabs = false;
  export let tab = false;
  export let tabActive = false;
  export let accordionList = false;
  export let accordionOpposite = false;
  export let noHairlines = false;
  export let noHairlinesMd = false;
  export let noHairlinesIos = false;
  export let noHairlinesAurora = false;

  let className = undefined;
  export { className as class };

  let el;

  function onTabShow(tabEl) {
    if (el !== tabEl) return;
    dispatch('tabShow');
    if (typeof $$props.onTabShow === 'function') $$props.onTabShow(tabEl);
  }
  function onTabHide(tabEl) {
    if (el !== tabEl) return;
    dispatch('tabHide');
    if (typeof $$props.onTabHide === 'function') $$props.onTabHide(tabEl);
  }

  $: classes = classNames(
    className,
    'block',
    {
      inset,
      'xsmall-inset': xsmallInset,
      'small-inset': smallInset,
      'medium-inset': mediumInset,
      'large-inset': largeInset,
      'xlarge-inset': xlargeInset,
      'block-strong': strong,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
      tabs,
      tab,
      'tab-active': tabActive,
      'no-hairlines': noHairlines,
      'no-hairlines-md': noHairlinesMd,
      'no-hairlines-ios': noHairlinesIos,
      'no-hairlines-aurora': noHairlinesAurora,
    },
    colorClasses($$props),
  );

  onMount(() => {
    f7ready(() => {
      f7.on('tabShow', onTabShow);
      f7.on('tabHide', onTabHide);
    });
  });

  onDestroy(() => {
    if (f7) {
      f7.off('tabShow', onTabShow);
      f7.off('tabHide', onTabHide);
    }
  });
</script>

<div class={classes} bind:this={el} {...restProps($$restProps)}>
  <slot />
</div>
