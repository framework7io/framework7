<script>
  import { createEventDispatcher, onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText, createEmitter } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';

  import CardHeader from './card-header.svelte';
  import CardContent from './card-content.svelte';
  import CardFooter from './card-footer.svelte';

  const emit = createEmitter(createEventDispatcher, $$props);

  let className = undefined;
  export { className as class };

  export let title = undefined;
  export let content = undefined;
  export let footer = undefined;
  export let raised = false;
  export let outline = false;
  export let outlineIos = false;
  export let outlineMd = false;
  export let headerDivider = false;
  export let footerDivider = false;
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
  export let padding = true;

  let el;

  $: classes = classNames(
    className,
    'card',
    {
      'card-outline': outline,
      'card-outline-ios': outlineIos,
      'card-outline-md': outlineMd,
      'card-raised': raised,
      'card-header-divider': headerDivider,
      'card-footer-divider': footerDivider,
      'card-expandable': expandable,
      'card-expandable-animate-width': expandableAnimateWidth,
    },
    colorClasses($$props),
  );

  /* eslint-disable no-undef */
  $: hasHeaderSlots = $$slots.header;
  $: hasContentSlots = $$slots.content;
  $: hasFooterSlots = $$slots.footer;
  /* eslint-enable no-undef */

  function open() {
    app.f7.card.open(el);
  }

  function close() {
    app.f7.card.close(el);
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
      app.f7.on('cardBeforeOpen', onBeforeOpen);
      app.f7.on('cardOpen', onOpen);
      app.f7.on('cardOpened', onOpened);
      app.f7.on('cardClose', onClose);
      app.f7.on('cardClosed', onClosed);
      if (expandable && expandableOpened && el) {
        app.f7.card.open(el, false);
      }
    });
  });

  onDestroy(() => {
    if (!expandable) return;
    if (!app.f7 || !el) return;
    app.f7.off('cardBeforeOpen', onBeforeOpen);
    app.f7.off('cardOpen', onOpen);
    app.f7.off('cardOpened', onOpened);
    app.f7.off('cardClose', onClose);
    app.f7.off('cardClosed', onClosed);
  });
</script>

<div
  bind:this={el}
  class={classes}
  data-animate={typeof animate === 'undefined' ? animate : animate.toString()}
  data-hide-navbar-on-open={typeof hideNavbarOnOpen === 'undefined'
    ? hideNavbarOnOpen
    : hideNavbarOnOpen.toString()}
  data-hide-toolbar-on-open={typeof hideToolbarOnOpen === 'undefined'
    ? hideToolbarOnOpen
    : hideToolbarOnOpen.toString()}
  data-hide-statusbar-on-open={typeof hideStatusbarOnOpen === 'undefined'
    ? hideStatusbarOnOpen
    : hideStatusbarOnOpen.toString()}
  data-scrollable-el={scrollableEl}
  data-swipe-to-close={typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString()}
  data-close-by-backdrop-click={typeof closeByBackdropClick === 'undefined'
    ? closeByBackdropClick
    : closeByBackdropClick.toString()}
  data-backdrop={typeof backdrop === 'undefined' ? backdrop : backdrop.toString()}
  data-backdrop-el={backdropEl}
  {...restProps($$restProps)}
>
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
