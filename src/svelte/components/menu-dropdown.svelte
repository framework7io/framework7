<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

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

  $: classes = Utils.classNames(
    'menu-dropdown',
    `menu-dropdown-${positionComputed}`,
    Mixins.colorClasses($$props),
    className
  );

</script>

<div id={id} style={style} class={classes}>
  <div class="menu-dropdown-content" style={contentHeight && `height: ${contentHeight}`}>
    <slot />
  </div>
</div>
