<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready, theme } from '../shared/f7';

  import Link from './link';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let backLink = undefined;
  export let backLinkUrl = undefined;
  export let backLinkForce = undefined;
  export let backLinkShowText = undefined;
  export let sliding = undefined;

  // eslint-disable-next-line
  let _theme = f7 ? theme : null;
  if (!f7) {
    f7ready(() => {
      _theme = theme;
    });
  }

  $: classes = classNames(
    className,
    'left',
    {
      sliding,
    },
    colorClasses($$props),
  );

  $: needBackLinkText = backLinkShowText;
  $: if (typeof needBackLinkText === 'undefined') needBackLinkText = _theme && !_theme.md;

  $: backLinkText = backLink !== true && needBackLinkText ? backLink : undefined;

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
      onClick={onBackClick} />
  {/if}
  <slot />
</div>
