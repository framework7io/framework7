<script>
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let progress = 0;
  export let infinite = false;

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
  ref="el"
  id={id}
  style={style}
  class={classes}
  data-progress={progress}
>
  <span style={transformStyle} />
</span>
