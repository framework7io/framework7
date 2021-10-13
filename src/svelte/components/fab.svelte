<script>
  import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';
  import { useTooltip } from '../shared/use-tooltip.js';

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
  $: hasTextSlots = $$slots.text;

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
      const dom7 = app.f7.$;
      const rootEls = dom7(linkEl).children('.fab-buttons');
      if (rootEls.length) {
        dom7(el).append(rootEls);
      }
    });
  });
  afterUpdate(() => {
    if (!app.f7) return;
    const dom7 = app.f7.$;
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
  {...restProps($$restProps)}
>
  <a
    bind:this={linkEl}
    on:click={onClick}
    {target}
    href={hrefComputed}
    use:useTooltip={{ tooltip, tooltipTrigger }}
  >
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
