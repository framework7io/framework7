<script>
  import { colorClasses } from '../shared/mixins';
  import { classNames } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7 } from '../shared/f7';

  let className = undefined;
  export { className as class };

  export let progress = 0;
  export let infinite = false;

  let el;

  export function set(progress, speed) {
    if (!f7) return;
    f7.progressbar.set(el, progress, speed);
  }

  $: classes = classNames(
    className,
    'progressbar',
    {
      'progressbar-infinite': infinite,
    },
    colorClasses($$props),
  );

  $: transformStyle = {
    transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
    WebkitTransform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
  };
</script>

<span bind:this={el} class={classes} data-progress={progress} {...restProps($$restProps)}>
  <span style={transformStyle} />
</span>
