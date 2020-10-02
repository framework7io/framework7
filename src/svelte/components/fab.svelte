<script>
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';
  import { useTooltip } from '../shared/use-tooltip';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let morphTo = undefined;
  export let href = undefined;
  export let target = undefined;
  export let text = undefined;
  export let position = 'right-bottom';
  export let tooltip = undefined;
  export let tooltipTrigger = undefined;
  export let f7Slot = 'fixed';

  let el;
  let linkEl;
  let textEl;

  $: hrefComputed = href === true ? '#' : href || undefined;

  // eslint-disable-next-line
  $: hasTextSlots = hasSlots(arguments, 'text');

  $: classes = classNames(
    className,
    'fab',
    `fab-${position}`,
    {
      'fab-morph': morphTo,
      'fab-extended': text || hasTextSlots || typeof textEl !== 'undefined',
    },
    colorClasses($$props),
  );

  function onClick() {
    emit('click');
  }

  onMount(() => {
    f7ready(() => {
      const dom7 = f7.$;
      const rootEls = dom7(linkEl).children('.fab-buttons');
      if (rootEls.length) {
        dom7(el).append(rootEls);
      }
    });
  });
  afterUpdate(() => {
    if (!f7) return;
    const dom7 = f7.$;
    const rootEls = dom7(linkEl).children('.fab-buttons');
    if (rootEls.length) {
      dom7(el).append(rootEls);
    }
  });
</script>

<div
  class={classes}
  data-morph-to={morphTo}
  bind:this={el}
  data-f7-slot={f7Slot}
  {...restProps($$restProps)}>
  <a
    bind:this={linkEl}
    on:click={onClick}
    {target}
    href={hrefComputed}
    use:useTooltip={{ tooltip, tooltipTrigger }}>
    <slot />
    {#if typeof text !== 'undefined' || hasTextSlots}
      <div class="fab-text" bind:this={textEl}>
        {plainText(text)}
        <slot name="text" />
      </div>
    {/if}
    <slot name="link" />
  </a>
  <slot name="root" />
</div>
