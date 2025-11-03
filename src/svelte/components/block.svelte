<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { useTab } from '../shared/use-tab.js';

  let {
    class: className,
    inset = false,
    insetIos = false,
    insetMd = false,
    xsmallInset = false,
    xsmallInsetIos = false,
    xsmallInsetMd = false,
    smallInset = false,
    smallInsetIos = false,
    smallInsetMd = false,
    mediumInset = false,
    mediumInsetIos = false,
    mediumInsetMd = false,
    largeInset = false,
    largeInsetIos = false,
    largeInsetMd = false,
    xlargeInset = false,
    xlargeInsetIos = false,
    xlargeInsetMd = false,
    strong = false,
    strongIos = false,
    strongMd = false,
    tabs = false,
    tab = false,
    tabActive = false,
    accordionList = false,
    accordionOpposite = false,
    outline = false,
    outlineMd = false,
    outlineIos = false,
    children,
    ...restProps
  } = $props();

  let el = $state(null);

  const classes = $derived(
    classNames(
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
      colorClasses(restProps),
    ),
  );

  useTab(() => el, restProps);
</script>

<div class={classes} bind:this={el} {...restProps}>
  {@render children?.()}
</div>
