<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import f7 from '../utils/f7';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;
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
    if (typeof $$props.onTabShow === 'function') $$props.onTabShow();
  }
  function onTabHide(tabEl) {
    if (el !== tabEl) return;
    dispatch('tabHide');
    if (typeof $$props.onTabHide === 'function') $$props.onTabHide();
  }

  $: classes = Utils.classNames(
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
    Mixins.colorClasses($$props),
  );

  onMount(() => {
    f7.ready(() => {
      f7.instance.on('tabShow', onTabShow);
      f7.instance.on('tabHide', onTabHide);
    });
  });

  onDestroy(() => {
    if (f7.instance) {
      f7.instance.off('tabShow', onTabShow);
      f7.instance.off('tabHide', onTabHide);
    }
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
