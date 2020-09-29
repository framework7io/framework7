<script>
  import { createEventDispatcher } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';
  import { theme } from '../shared/plugin';

  import Link from './link';

  const dispatch = createEventDispatcher();

  let className = undefined;
  export { className as class };

  export let backLink = undefined;
  export let backLinkUrl = undefined;
  export let backLinkForce = undefined;
  export let backLinkShowText = undefined;
  export let sliding = undefined;

  // eslint-disable-next-line
  let _theme = f7.instance ? theme : null;
  if (!f7.instance) {
    f7.ready(() => {
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
    dispatch('clickBack');
    if (typeof $$props.onClickBack === 'function') $$props.onClickBack();
    dispatch('backClick');
    if (typeof $$props.onBackClick === 'function') $$props.onBackClick();
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
