<script>
  import { onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import { theme } from '../utils/plugin';
  import F7 from '../utils/f7';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let material = undefined;
  export let f7 = undefined;
  export let icon = undefined;
  export let ios = undefined;
  export let aurora = undefined;
  export let md = undefined;
  export let tooltip = undefined;
  export let size = undefined;

  // eslint-disable-next-line
  let _theme = F7.instance ? theme : null;
  let el;
  let f7Tooltip;

  let classes = {
    icon: true,
  };

  if (!F7.instance) {
    F7.ready(() => {
      _theme = theme;
    });
  }

  let themeIcon;

  $: if (_theme) {
    if (_theme.ios) themeIcon = ios;
    if (_theme.md) themeIcon = md;
    if (_theme.aurora) themeIcon = aurora;
  }

  $: if (themeIcon) {
    const parts = themeIcon.split(':');
    const prop = parts[0];
    const value = parts[1];
    if (prop === 'material' || prop === 'f7') {
      classes['material-icons'] = prop === 'material';
      classes['f7-icons'] = prop === 'f7';
    }

    if (prop === 'icon') {
      classes[value] = true;
    }
  } else {
    classes = {
      icon: true,
      'material-icons': material,
      'f7-icons': f7,
    };
    if (icon) classes[icon] = true;
  }

  $: iconClasses = Utils.classNames(
    className,
    classes,
    Mixins.colorClasses($$props),
  );

  function iconTextComputed(t) {
    let textComputed = material || f7;
    if (md && t && t.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
      textComputed = md.split(':')[1];
    } else if (ios && t && t.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
      textComputed = ios.split(':')[1];
    } else if (aurora && t && t.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
      textComputed = aurora.split(':')[1];
    }
    return textComputed;
  }
  $: iconText = iconTextComputed(_theme);

  $: iconSize = typeof size === 'number' || parseFloat(size) === size * 1
    ? `${size}px`
    : size;

  $: iconStyle = (style || '') + (iconSize ? `;font-size: ${iconSize}; width: ${iconSize}; height: ${iconSize}`.replace(';;', '') : '');


  let tooltipText = tooltip;
  function watchTooltip(newText) {
    const oldText = tooltipText;
    if (oldText === newText) return;
    tooltipText = newText;
    if (!newText && f7Tooltip) {
      f7Tooltip.destroy();
      f7Tooltip = null;
      return;
    }
    if (newText && !f7Tooltip && F7.instance) {
      f7Tooltip = F7.instance.tooltip.create({
        targetEl: el,
        text: newText,
      });
      return;
    }
    if (!newText || !f7Tooltip) return;
    f7Tooltip.setText(newText);
  }
  $: watchTooltip(tooltip);

  onMount(() => {
    if (!tooltip) return;
    F7.ready(() => {
      f7Tooltip = F7.instance.tooltip.create({
        targetEl: el,
        text: tooltip,
      });
    });
  });

  onDestroy(() => {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });
</script>

<i id={id} style={iconStyle} class={iconClasses} bind:this={el}>
  {iconText || ''}
  <slot />
</i>
