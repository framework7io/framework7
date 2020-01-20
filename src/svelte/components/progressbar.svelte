<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let progress = 0;
  export let infinite = false;

  let el;

  export function set(progress, speed) {
    if (!f7.instance) return;
    f7.instance.progressbar.set(el, progress, speed);
  }

  $: classes = Utils.classNames(
    className,
    'progressbar',
    {
      'progressbar-infinite': infinite,
    },
    Mixins.colorClasses($$props),
  );

  $: transformStyle = {
    transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
    WebkitTransform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
  };
</script>

<span
  bind:this={el}
  id={id}
  style={style}
  class={classes}
  data-progress={progress}
>
  <span style={transformStyle} />
</span>
