<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useTab } from '../shared/use-tab.js';

  const emit = createEmitter(createEventDispatcher, $$props);

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

  useTab(() => el, emit);
</script>

<div class={classes} bind:this={el} {...restProps($$restProps)}>
  <slot />
</div>
