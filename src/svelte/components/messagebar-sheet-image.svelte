<script>
  import { createEventDispatcher } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let image = undefined;
  export let checked = false;

  $: classes = Utils.classNames(
    className,
    'messagebar-sheet-image',
    'checkbox',
    Mixins.colorClasses($$props),
  );

  $: styles = Utils.extend({
    backgroundImage: image && `url(${image})`,
  }, style || {});

  $: styles = `${image ? `background-image: url(${image});` : ''}${style || ''}`;

  function onChange(event) {
    if (checked) dispatch('checked', [event]);
    else dispatch('unchecked', [event]);
    dispatch('change', [event]);
  }

</script>

<label id={id} class={classes} style={styles}>
  <input type="checkbox" checked={checked} on:change={onChange} />
  <i class="icon icon-checkbox" />
  <slot />
</label>
