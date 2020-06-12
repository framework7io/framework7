<script>
  import { createEventDispatcher } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import restProps from '../utils/rest-props';
  import f7 from '../utils/f7';
  import { theme } from '../utils/plugin';

  import Link from './link.svelte';

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

  $: classes = Utils.classNames(
    className,
    'left',
    {
      sliding,
    },
    Mixins.colorClasses($$props),
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
<div
  class={classes}
  {...restProps($$restProps)}
>
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
