<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins';
  import { classNames, plainText, createEmitter } from '../shared/utils';
  import { restProps } from '../shared/rest-props';
  import { f7, f7ready } from '../shared/f7';
  import { hasSlots } from '../shared/has-slots';

  import CardHeader from './card-header';
  import CardContent from './card-content';
  import CardFooter from './card-footer';

  const emit = createEmitter(createEventDispatcher, $$props);

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

  $: classes = classNames(
    className,
    'card',
    {
      'card-outline': outline,
      'card-expandable': expandable,
      'card-expandable-animate-width': expandableAnimateWidth,
      'no-shadow': noShadow,
      'no-border': noBorder,
    },
    colorClasses($$props),
  );

  /* eslint-disable no-undef */
  $: hasHeaderSlots = hasSlots(arguments, 'header');
  $: hasContentSlots = hasSlots(arguments, 'content');
  $: hasFooterSlots = hasSlots(arguments, 'footer');
  /* eslint-enable no-undef */

  function open() {
    f7.card.open(el);
  }

  function close() {
    f7.card.close(el);
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
    emit('cardBeforeOpen', [el, prevent]);
  }
  function onOpen(cardEl) {
    if (cardEl !== el) return;
    emit('cardOpen', [el]);
    expandableOpened = true;
  }
  function onOpened(cardEl, pageEl) {
    if (cardEl !== el) return;
    emit('cardOpened', [el, pageEl]);
  }
  function onClose(cardEl) {
    if (cardEl !== el) return;
    emit('cardClose', [el]);
  }
  function onClosed(cardEl, pageEl) {
    if (cardEl !== el) return;
    emit('cardClosed', [el, pageEl]);
    expandableOpened = false;
  }

  onMount(() => {
    if (!expandable) return;
    f7ready(() => {
      f7.on('cardBeforeOpen', onBeforeOpen);
      f7.on('cardOpen', onOpen);
      f7.on('cardOpened', onOpened);
      f7.on('cardClose', onClose);
      f7.on('cardClosed', onClosed);
      if (expandable && expandableOpened && el) {
        f7.card.open(el, false);
      }
    });
  });

  onDestroy(() => {
    if (!expandable) return;
    if (!f7 || !el) return;
    f7.off('cardBeforeOpen', onBeforeOpen);
    f7.off('cardOpen', onOpen);
    f7.off('cardOpened', onOpened);
    f7.off('cardClose', onClose);
    f7.off('cardClosed', onClosed);
  });
</script>

<div
  bind:this={el}
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
  {...restProps($$restProps)}>
  {#if typeof title !== 'undefined' || hasHeaderSlots}
    <CardHeader>
      {plainText(title)}
      <slot name="header" />
    </CardHeader>
  {/if}
  {#if typeof content !== 'undefined' || hasContentSlots}
    <CardContent {padding}>
      {plainText(content)}
      <slot name="content" />
    </CardContent>
  {/if}
  {#if typeof footer !== 'undefined' || hasFooterSlots}
    <CardFooter>
      {plainText(footer)}
      <slot name="footer" />
    </CardFooter>
  {/if}
  <slot />
</div>
