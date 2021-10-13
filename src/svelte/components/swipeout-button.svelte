<script>
  import { createEventDispatcher } from 'svelte';

  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let text = undefined;
  export let confirmTitle = undefined;
  export let confirmText = undefined;
  export let overswipe = undefined;
  export let close = undefined;
  let deleteProp = undefined;
  export { deleteProp as delete };
  export let href = undefined;

  $: classes = classNames(
    className,
    {
      'swipeout-overswipe': overswipe,
      'swipeout-delete': deleteProp,
      'swipeout-close': close,
    },
    colorClasses($$props),
  );

  function onClick() {
    emit('click');
  }
</script>

<a
  href={href || '#'}
  data-confirm={confirmText || undefined}
  data-confirm-title={confirmTitle || undefined}
  class={classes}
  on:click={onClick}
  {...restProps($$restProps)}
>
  {plainText(text)}
  <slot />
</a>
