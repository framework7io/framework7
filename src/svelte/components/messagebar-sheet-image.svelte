<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    style = undefined,
    class: className,
    image = undefined,
    checked = false,
    children,
    ...restProps
  } = $props();

  const classes = $derived(
    classNames(className, 'messagebar-sheet-image', 'checkbox', colorClasses(restProps)),
  );

  const styles = $derived(`${style || ''}`);

  function onChange(event) {
    if (event.target.checked) {
      restProps.onChecked?.(event);
      restProps.onchecked?.(event);
    } else {
      restProps.onUnchecked?.(event);
      restProps.onunchecked?.(event);
    }
    restProps.onChange?.(event);
    restProps.onchange?.(event);
    checked = event.target.checked;
  }
</script>

<label class={classes} style={styles} {...restProps}>
  <input type="checkbox" {checked} onchange={onChange} />
  <i class="icon icon-checkbox"></i>
  {#if image && typeof image === 'string'}
    <img src={image} alt="" />
  {/if}
  {#if typeof image === 'function'}
    {@render image?.()}
  {/if}
  {@render children?.()}
</label>
