<script>
  import { onMount } from 'svelte';

  let swiperEl = null;
  let containerClasses = '';
  let className = undefined;
  export { className as class };

  const getData = (restProps) => {
    const props = {};
    const attrs = {};
    const events = {};
    Object.keys(restProps).forEach((prop) => {
      if (prop === 'class' || prop === 'id' || prop.includes('data-')) {
        attrs[prop] = restProps[prop];
      } else if (prop.indexOf('on') === 0) {
        const eventName = prop.substring(2);
        eventName[0] = eventName[0].toLowerCase();
        events[eventName] = restProps[prop];
      } else {
        props[prop] = restProps[prop];
      }
    });
    props.on = {
      ...(props.on || {}),
      ...events,
      // eslint-disable-next-line
      _containerClasses(_swiper, classes) {
        containerClasses = classes;
      },
    };
    return { props, attrs };
  };

  $: data = getData($$restProps);

  onMount(() => {
    Object.assign(swiperEl, data.props);
    swiperEl.initialize();
  });
</script>

<swiper-container
  class={[containerClasses, className || ''].filter((c) => !!c).join(' ')}
  bind:this={swiperEl}
  {...data.attrs}
  init="false"
>
  <slot name="container-start" slot="container-start" />
  <slot />
  <slot name="container-end" slot="container-end" />
</swiper-container>
