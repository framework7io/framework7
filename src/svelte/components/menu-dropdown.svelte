<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';

  let className = undefined;
  export { className as class };

  export let contentHeight = undefined;
  export let position = undefined;
  export let left = undefined;
  export let center = undefined;
  export let right = undefined;

  $: positionComputed = (() => {
    let pos = position || 'left';
    if (left) pos = 'left';
    if (center) pos = 'center';
    if (right) pos = 'right';
    return pos;
  })();

  $: classes = classNames(
    'menu-dropdown',
    `menu-dropdown-${positionComputed}`,
    colorClasses($$props),
    className,
  );
</script>

<div class={classes} {...restProps($$restProps)}>
  <div class="menu-dropdown-content" style={contentHeight && `height: ${contentHeight}`}>
    <slot />
  </div>
</div>
