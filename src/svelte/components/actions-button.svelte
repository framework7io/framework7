<script>

  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app } from '../shared/f7.js';


  let {
    class: className,
    strong = false,
    close = true,
    children,
    media,
    ...restProps
  } = $props();

  let el;


  const classes = $derived(classNames(
    className,
    {
      'actions-button': true,
      'actions-button-strong': strong,
    },
    colorClasses(restProps),
  ));

  function onClick() {
    if (close && app.f7) {
      const dom7 = app.f7.$;
      app.f7.actions.close(dom7(el).parents('.actions-modal'));
    }
    restProps.onclick?.();
  }
</script>

<div class={classes} onclick={onClick} bind:this={el} {...restProps}>
  {#if typeof media !== 'undefined'}
    <div class="actions-button-media">
      {#if typeof media === 'function'}
        {@render media?.()}
      {:else}
        {media}
      {/if}
    </div>
  {/if}
  <div class="actions-button-text">
    {@render children?.()}
  </div>
</div>
