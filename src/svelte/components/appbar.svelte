<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';

  let className = undefined;
  export { className as class };

  export let noShadow = undefined;
  export let noHairline = undefined;
  export let inner = true;
  export let innerClass = undefined;
  export let innerClassName = undefined;

  $: classes = Utils.classNames(
    className,
    'appbar',
    {
      'no-shadow': noShadow,
      'no-hairline': noHairline,
    },
    Mixins.colorClasses($$props),
  );

  $: innerClasses = Utils.classNames(
    'appbar-inner',
    innerClass,
    innerClassName,
  );
</script>

<div
  class={classes}
  {...restProps($$restProps)}
>
  <slot name="before-inner" />
  {#if inner}
    <div class={innerClasses}>
      <slot />
    </div>
  {:else}
    <slot />
  {/if}
  <slot name="after-inner" />
</div>
