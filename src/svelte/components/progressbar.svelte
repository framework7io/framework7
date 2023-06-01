<script>
  import { colorClasses } from '../shared/mixins.js';
  import { classNames } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app } from '../shared/f7.js';

  let className = undefined;
  export { className as class };

  export let progress = 0;
  export let infinite = false;

  let el;

  export function set(progress, speed) {
    if (!app.f7) return;
    app.f7.progressbar.set(el, progress, speed);
  }

  $: classes = classNames(
    className,
    'progressbar',
    {
      'progressbar-infinite': infinite,
    },
    colorClasses($$props),
  );
</script>

<span bind:this={el} class={classes} data-progress={progress} {...restProps($$restProps)}>
  <span style={`transform: ${progress ? `translate3d(${-100 + progress}%, 0, 0)` : ''}`} />
</span>
