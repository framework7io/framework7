<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { useTooltip } from '../shared/use-tooltip.js';
  import { useTheme } from '../shared/use-theme.js';
  let {
    class: className,
    style = undefined,
    material = undefined,
    f7 = undefined,
    icon = undefined,
    ios = undefined,
    md = undefined,
    tooltip = undefined,
    tooltipTrigger = undefined,
    size = undefined,
    children,
    ...restProps
  } = $props();

  let el = $state(null);
  let theme = useTheme((t) => {
    theme = t;
  });

  let themeIcon = $derived.by(() => {
    if (theme) {
      if (theme.ios) return ios;
      if (theme.md) return md;
    }
  });

  const classes = $derived.by(() => {
    let res;
    if (themeIcon) {
      res = {
        icon: true,
      };
      const parts = themeIcon.split(':');
      const prop = parts[0];
      const value = parts[1];
      if (prop === 'material' || prop === 'f7') {
        res['material-icons'] = prop === 'material';
        res['f7-icons'] = prop === 'f7';
        if (prop === 'icon') {
          res[value] = true;
        }
      } else {
        if (themeIcon.includes(':')) {
          themeIcon = themeIcon
            .split(' ')
            .map((el) => el.replace('icon:', ''))
            .join(' ');
        }
        res[themeIcon] = true;
      }
      if (icon) res[icon] = true;
    } else {
      res = {
        icon: true,
        'material-icons': material,
        'f7-icons': f7,
      };
      if (icon) res[icon] = true;
    }
    return res;
  });

  const iconClasses = $derived(classNames(className, classes, colorClasses(restProps)));

  function iconTextComputed(t) {
    let textComputed = material || f7;
    if (md && t && t.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
      textComputed = md.split(':')[1];
    } else if (ios && t && t.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
      textComputed = ios.split(':')[1];
    }
    return textComputed;
  }
  const iconText = $derived(iconTextComputed(theme));

  const iconSize = $derived(
    typeof size === 'number' || parseFloat(size) === size * 1 ? `${size}px` : size,
  );

  const iconStyle = $derived(
    (style || '') +
      (iconSize
        ? `;font-size: ${iconSize}; width: ${iconSize}; height: ${iconSize}`.replace(';;', '')
        : ''),
  );
</script>

<i
  style={iconStyle}
  class={iconClasses}
  bind:this={el}
  {...restProps}
  use:useTooltip={{ tooltip, tooltipTrigger }}
>
  {iconText || ''}
  {@render children?.()}
</i>
