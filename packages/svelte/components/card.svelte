<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';
  import hasSlots from '../utils/has-slots';

  import CardHeader from './card-header.svelte';
  import CardContent from './card-content.svelte';
  import CardFooter from './card-footer.svelte';

  const dispatch = createEventDispatcher();

  export let id = undefined;
  export let style = undefined;

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let content = undefined;
  export let footer = undefined;
  export let outline = false;
  export let expandable = false;
  export let expandableAnimateWidth = false;
  export let expandableOpened = false;
  export let animate = undefined;
  export let hideNavbarOnOpen = undefined;
  export let hideToolbarOnOpen = undefined;
  export let hideStatusbarOnOpen = undefined;
  export let scrollableEl = undefined;
  export let swipeToClose = undefined;
  export let closeByBackdropClick = undefined;
  export let backdrop = undefined;
  export let backdropEl = undefined;
  export let noShadow = false;
  export let noBorder = false;
  export let padding = true;

  let el;

  $: classes = Utils.classNames(
    className,
    'card',
    {
      'card-outline': outline,
      'card-expandable': expandable,
      'card-expandable-animate-width': expandableAnimateWidth,
      'no-shadow': noShadow,
      'no-border': noBorder,
    },
    Mixins.colorClasses($$props),
  );

  /* eslint-disable no-undef */
  $: hasHeaderSlots = hasSlots(arguments, 'header');
  $: hasContentSlots = hasSlots(arguments, 'content');
  $: hasFooterSlots = hasSlots(arguments, 'footer');
  /* eslint-enable no-undef */

  function open() {
    f7.instance.card.open(el);
  }

  function close() {
    f7.instance.card.close(el);
  }

  let initialWatched = false;
  function watchOpened(openedPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (openedPassed) {
      open();
    } else {
      close();
    }
  }

  $: watchOpened(expandableOpened);

  function onBeforeOpen(cardEl, prevent) {
    if (cardEl !== el) return;
    dispatch('cardBeforeOpen', [el, prevent]);
    if (typeof $$props.onCardBeforeOpen === 'function') $$props.onCardBeforeOpen(el, prevent);
  }
  function onOpen(cardEl) {
    if (cardEl !== el) return;
    dispatch('cardOpen', [el]);
    if (typeof $$props.onCardOpen === 'function') $$props.onCardOpen(el);
  }
  function onOpened(cardEl, pageEl) {
    if (cardEl !== el) return;
    dispatch('cardOpened', [el, pageEl]);
    if (typeof $$props.onCardOpened === 'function') $$props.onCardOpened(el, pageEl);
  }
  function onClose(cardEl) {
    if (cardEl !== el) return;
    dispatch('cardClose', [el]);
    if (typeof $$props.onCardClose === 'function') $$props.onCardClose(el);
  }
  function onClosed(cardEl, pageEl) {
    if (cardEl !== el) return;
    dispatch('cardClosed', [el, pageEl]);
    if (typeof $$props.onCardClosed === 'function') $$props.onCardClosed(el, pageEl);
  }

  onMount(() => {
    if (!expandable) return;
    f7.ready(() => {
      f7.instance.on('cardBeforeOpen', onBeforeOpen);
      f7.instance.on('cardOpen', onOpen);
      f7.instance.on('cardOpened', onOpened);
      f7.instance.on('cardClose', onClose);
      f7.instance.on('cardClosed', onClosed);
      if (expandable && expandableOpened && el) {
        f7.instance.card.open(el, false);
      }
    });
  });

  onDestroy(() => {
    if (!expandable) return;
    if (!f7.instance || !el) return;
    f7.instance.off('cardBeforeOpen', onBeforeOpen);
    f7.instance.off('cardOpen', onOpen);
    f7.instance.off('cardOpened', onOpened);
    f7.instance.off('cardClose', onClose);
    f7.instance.off('cardClosed', onClosed);
  });

</script>

<div
  bind:this={el}
  id={id}
  style={style}
  class={classes}
  data-animate={typeof animate === 'undefined' ? animate : animate.toString()}
  data-hide-navbar-on-open={typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString()}
  data-hide-toolbar-on-open={typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString()}
  data-hide-statusbar-on-open={typeof hideStatusbarOnOpen === 'undefined' ? hideStatusbarOnOpen : hideStatusbarOnOpen.toString()}
  data-scrollable-el={scrollableEl}
  data-swipe-to-close={typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString()}
  data-close-by-backdrop-click={typeof closeByBackdropClick === 'undefined' ? closeByBackdropClick : closeByBackdropClick.toString()}
  data-backdrop={typeof backdrop === 'undefined' ? backdrop : backdrop.toString()}
  data-backdrop-el={backdropEl}
>
  {#if typeof title !== 'undefined' || hasHeaderSlots}
    <CardHeader>
      {Utils.text(title)}
      <slot name="header" />
    </CardHeader>
  {/if}
  {#if typeof content !== 'undefined' || hasContentSlots}
    <CardContent padding={padding}>
      {Utils.text(content)}
      <slot name="content" />
    </CardContent>
  {/if}
  {#if typeof footer !== 'undefined' || hasFooterSlots}
    <CardFooter>
      {Utils.text(footer)}
      <slot name="footer" />
    </CardFooter>
  {/if}
  <slot />
</div>
