<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let init = true;
  export let checked = undefined;
  export let disabled = undefined;
  export let readonly = undefined;
  export let name = undefined;
  export let value = undefined;

  let el;
  let inputEl;
  let f7Toggle;

  $: classes = Utils.classNames(
    'toggle',
    className,
    {
      disabled,
    },
    Mixins.colorClasses($$props),
  );

  function watchChecked(isChecked) {
    if (!f7Toggle) return;
    f7Toggle.checked = isChecked;
  }

  $: watchChecked(checked);

  function onChange(event) {
    dispatch('change', event.target.checked);
  }

  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      f7Toggle = f7.instance.toggle.create({
        el,
        on: {
          change(toggle) {
            dispatch('toggle:change', toggle.checked);
          },
        },
      });
    });
  });

  onDestroy(() => {
    if (f7Toggle && f7Toggle.destroy && f7Toggle.$el) f7Toggle.destroy();
  });
</script>

<label bind:this={el} id={id} style={style} class={classes}>
  <input
    bind:this={inputEl}
    type="checkbox"
    name={name}
    disabled={disabled}
    readonly={readonly}
    checked={checked}
    value={value}
    on:change={onChange}
  />
  <span class="toggle-icon" />
</label>
