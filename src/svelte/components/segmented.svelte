<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let raised = false;
  export let raisedIos = false;
  export let raisedMd = false;
  export let raisedAurora = false;
  export let round = false;
  export let roundIos = false;
  export let roundMd = false;
  export let roundAurora = false;
  export let strong = false;
  export let strongIos = false;
  export let strongMd = false;
  export let strongAurora = false;
  export let tag = 'div';

  $: classes = Utils.classNames(
    className,
    {
      segmented: true,
      'segmented-raised': raised,
      'segmented-raised-ios': raisedIos,
      'segmented-raised-aurora': raisedAurora,
      'segmented-raised-md': raisedMd,
      'segmented-round': round,
      'segmented-round-ios': roundIos,
      'segmented-round-aurora': roundAurora,
      'segmented-round-md': roundMd,
      'segmented-strong': strong,
      'segmented-strong-ios': strongIos,
      'segmented-strong-md': strongMd,
      'segmented-strong-aurora': strongAurora,
    },
    Mixins.colorClasses($$props),
  );
</script>
{#if tag === 'div'}
  <div
    id={id}
    style={style}
    class={classes}
  >
    <slot />
  </div>
{:else if tag === 'p'}
  <p
    id={id}
    style={style}
    class={classes}
  >
    <slot />
  </p>
{/if}
