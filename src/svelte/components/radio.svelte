<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';

  let {
    class: className,
    checked = undefined,
    name = undefined,
    value = undefined,
    disabled = undefined,
    readonly = undefined,
    children,
    ...restProps
  } = $props();


  const classes = $derived(classNames(
    className,
    'radio',
    {
      disabled,
    },
    colorClasses(restProps),
  ));

  function onChange(event) {
    checked = event.target.checked;
    restProps.onchange?.(event);
  }
</script>

<label class={classes} {...restProps}>
  <input
    type="radio"
    {name}
    value={typeof value === 'undefined' ? '' : value}
    {disabled}
    {readonly}
    {checked}
    onchange={onChange}
  />
  <i class="icon-radio"></i>
  {@render children?.()}
</label>
