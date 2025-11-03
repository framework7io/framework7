<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { app } from '../shared/f7.js';
  let { class: className, progress = 0, infinite = false, ...restProps } = $props();

  let el = $state(null);

  export function set(progress, speed) {
    if (!app.f7) return;
    app.f7.progressbar.set(el, progress, speed);
  }

  const classes = $derived(
    classNames(
      className,
      'progressbar',
      {
        'progressbar-infinite': infinite,
      },
      colorClasses(restProps),
    ),
  );
</script>

<span bind:this={el} class={classes} data-progress={progress} {...restProps}>
  <span style={`transform: ${progress ? `translate3d(${-100 + progress}%, 0, 0)` : ''}`}></span>
</span>
