<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, plainText } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  import CardHeader from './card-header.svelte';
  import CardContent from './card-content.svelte';
  import CardFooter from './card-footer.svelte';

  let {
    class: className,
    title = undefined,
    raised = false,
    outline = false,
    outlineIos = false,
    outlineMd = false,
    headerDivider = false,
    footerDivider = false,
    expandable = false,
    expandableAnimateWidth = false,
    expandableOpened = false,
    animate = undefined,
    hideNavbarOnOpen = undefined,
    hideToolbarOnOpen = undefined,
    hideStatusbarOnOpen = undefined,
    scrollableEl = undefined,
    swipeToClose = undefined,
    closeByBackdropClick = undefined,
    backdrop = undefined,
    backdropEl = undefined,
    padding = true,
    children,
    header,
    content,
    footer,
    ...restProps
  } = $props();





  let el;

  const classes = $derived(classNames(
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
    colorClasses(restProps),
  ));

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

  $effect(() => watchOpened(expandableOpened));

  function onBeforeOpen(cardEl, prevent) {
    if (cardEl !== el) return;
    restProps.cardBeforeOpen?.(el, prevent);
  }
  function onOpen(cardEl) {
    if (cardEl !== el) return;
    restProps.cardOpen?.(el);
    expandableOpened = true;
  }
  function onOpened(cardEl, pageEl) {
    if (cardEl !== el) return;
    restProps.cardOpened?.(el, pageEl);
  }
  function onClose(cardEl) {
    if (cardEl !== el) return;
    restProps.cardClose?.(el);
  }
  function onClosed(cardEl, pageEl) {
    if (cardEl !== el) return;
    restProps.cardClosed?.(el, pageEl);
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
  {...restProps}
>
  {#if typeof title !== 'undefined' || typeof header !== 'undefined'}
    <CardHeader>
      {plainText(title)}
      {#if typeof header === 'function'}
        {@render header?.()}
      {:else if (typeof header !== 'undefined')}
        {header}
      {/if}
    </CardHeader>
  {/if}
  {#if typeof content !== 'undefined' || typeof content !== 'undefined'}
    <CardContent {padding}>
      {#if typeof content === 'function'}
        {@render content?.()}
      {:else if (typeof content !== 'undefined')}
        {content}
      {/if}
    </CardContent>
  {/if}
  {#if typeof footer !== 'undefined' || typeof footer !== 'undefined'}
    <CardFooter>
      {#if typeof footer === 'function'}
        {@render footer?.()}
      {:else if (typeof footer !== 'undefined')}
        {footer}
      {/if}
    </CardFooter>
  {/if}
  {@render children?.()}
</div>
