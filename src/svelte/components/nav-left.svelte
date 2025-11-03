<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  import Link from './link.svelte';

  let {
    class: className,
    children,
    backLink,
    backLinkUrl,
    backLinkForce,
    backLinkShowText,
    ...restProps
  } = $props();

  const classes = $derived(classNames(className, 'left', {}, colorClasses(restProps)));

  const backLinkText = $derived(backLink !== true && backLinkShowText ? backLink : undefined);

  function onBackClick(event) {
    restProps.onClickBack?.(event);
    restProps.onclickback?.(event);
    restProps.onBackClick?.(event);
    restProps.onbackclick?.(event);
  }
</script>

<div class={classes} {...restProps}>
  {#if backLink}
    <Link
      href={backLinkUrl || '#'}
      back
      icon="icon-back"
      force={backLinkForce || undefined}
      class={!backLinkText ? 'icon-only' : undefined}
      text={backLinkText}
      onclick={onBackClick}
    />
  {/if}
  {@render children?.()}
</div>
