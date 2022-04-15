<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  export let noShadow = undefined;
  export let noHairline = undefined;
  export let inner = true;
  export let innerClass = undefined;
  export let innerClassName = undefined;

  $: classes = classNames(
    className,
    'appbar',
    {
      'no-shadow': noShadow,
      'no-hairline': noHairline,
    },
    colorClasses($$props),
  );

  $: innerClasses = classNames('appbar-inner', innerClass, innerClassName);
</script>

<div class={classes} {...restProps($$restProps)}>
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
