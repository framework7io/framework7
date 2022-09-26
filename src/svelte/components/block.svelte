<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { useTab } from '../shared/use-tab.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  export let inset = false;
  export let insetIos = false;
  export let insetMd = false;
  export let xsmallInset = false;
  export let xsmallInsetIos = false;
  export let xsmallInsetMd = false;
  export let smallInset = false;
  export let smallInsetIos = false;
  export let smallInsetMd = false;
  export let mediumInset = false;
  export let mediumInsetIos = false;
  export let mediumInsetMd = false;
  export let largeInset = false;
  export let largeInsetIos = false;
  export let largeInsetMd = false;
  export let xlargeInset = false;
  export let xlargeInsetIos = false;
  export let xlargeInsetMd = false;
  export let strong = false;
  export let strongIos = false;
  export let strongMd = false;
  export let tabs = false;
  export let tab = false;
  export let tabActive = false;
  export let accordionList = false;
  export let accordionOpposite = false;
  export let outline = false;
  export let outlineMd = false;
  export let outlineIos = false;

  let className = undefined;
  export { className as class };

  let el;

  $: classes = classNames(
    className,
    'block',
    {
      inset,
      'inset-ios': insetIos,
      'inset-md': insetMd,
      'xsmall-inset': xsmallInset,
      'xsmall-inset-ios': xsmallInsetIos,
      'xsmall-inset-md': xsmallInsetMd,
      'small-inset': smallInset,
      'small-inset-ios': smallInsetIos,
      'small-inset-md': smallInsetMd,
      'medium-inset': mediumInset,
      'medium-inset-ios': mediumInsetIos,
      'medium-inset-md': mediumInsetMd,
      'large-inset': largeInset,
      'large-inset-ios': largeInsetIos,
      'large-inset-md': largeInsetMd,
      'xlarge-inset': xlargeInset,
      'xlarge-inset-ios': xlargeInsetIos,
      'xlarge-inset-md': xlargeInsetMd,
      'block-strong': strong,
      'block-strong-ios': strongIos,
      'block-strong-md': strongMd,
      'accordion-list': accordionList,
      'accordion-opposite': accordionOpposite,
      tabs,
      tab,
      'tab-active': tabActive,
      'block-outline': outline,
      'block-outline-md': outlineMd,
      'block-outline-ios': outlineIos,
    },
    colorClasses($$props),
  );

  useTab(() => el, emit);
</script>

<div class={classes} bind:this={el} {...restProps($$restProps)}>
  <slot />
</div>
