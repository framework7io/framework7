<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  import Link from './link.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let backLink = undefined;
  export let backLinkUrl = undefined;
  export let backLinkForce = undefined;
  export let backLinkShowText = undefined;

  $: classes = classNames(
    className,
    'left',
    {},
    colorClasses($$props),
  );

  $: backLinkText = backLink !== true && backLinkShowText ? backLink : undefined;


  function onBackClick() {
    emit('clickBack');
    emit('backClick');
  }
</script>

<div class={classes} {...restProps($$restProps)}>
  {#if backLink}
    <Link
      href={backLinkUrl || '#'}
      back
      icon="icon-back"
      force={backLinkForce || undefined}
      class={!backLinkText ? 'icon-only' : undefined}
      text={backLinkText}
      onClick={onBackClick}
    />
  {/if}
  <slot />
</div>
