<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

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
  id={id}
  style={style}
  class={classes}
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
