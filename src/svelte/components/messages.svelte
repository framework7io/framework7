<script>
  import { onMount, onDestroy } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';
  import { app, f7ready } from '../shared/f7.js';

  let {
    class: className,
    autoLayout = false,
    messages = [],
    newMessagesFirst = false,
    scrollMessages = true,
    scrollMessagesOnEdge = true,
    firstMessageRule = undefined,
    lastMessageRule = undefined,
    tailMessageRule = undefined,
    sameNameMessageRule = undefined,
    sameHeaderMessageRule = undefined,
    sameFooterMessageRule = undefined,
    sameAvatarMessageRule = undefined,
    customClassMessageRule = undefined,
    renderMessage = undefined,
    typing = false,
    init = true,
    children,
    ...restProps
  } = $props();

  let el = $state(undefined);
  let f7Messages = $state(undefined);
  let childrenBeforeUpdated = $state(null);

  export function instance() {
    return f7Messages;
  }

  const classes = $derived(classNames(className, 'messages', colorClasses(restProps)));

  onMount(() => {
    if (!init) return;
    f7ready(() => {
      f7Messages = app.f7.messages.create(
        noUndefinedProps({
          el,
          autoLayout,
          messages,
          newMessagesFirst,
          scrollMessages,
          scrollMessagesOnEdge,
          firstMessageRule,
          lastMessageRule,
          tailMessageRule,
          sameNameMessageRule,
          sameHeaderMessageRule,
          sameFooterMessageRule,
          sameAvatarMessageRule,
          customClassMessageRule,
          renderMessage,
        }),
      );
      if (typing) f7Messages.showTyping();
    });
  });

  $effect.pre(() => {
    if (!init || !el) return;
    const children = el.children;
    if (!children) return;
    childrenBeforeUpdated = children.length;

    for (let i = 0; i < children.length; i += 1) {
      children[i].classList.add('message-appeared');
    }
  });

  $effect(() => {
    if (!init) return;
    if (!el) return;

    const children = el.children;
    if (!children) return;
    const childrenAfterUpdated = children.length;

    for (let i = 0; i < children.length; i += 1) {
      if (!children[i].classList.contains('message-appeared')) {
        children[i].classList.add('message-appear-from-bottom');
      }
    }

    if (f7Messages && f7Messages.layout && autoLayout) {
      f7Messages.layout();
    }
    if (
      childrenBeforeUpdated !== childrenAfterUpdated &&
      f7Messages &&
      f7Messages.scroll &&
      scrollMessages
    ) {
      f7Messages.scroll();
    }
  });

  onDestroy(() => {
    if (f7Messages && f7Messages.destroy) {
      f7Messages.destroy();
      f7Messages = null;
    }
  });

  let initialWatched = false;
  function watchTyping(typingPassed) {
    if (!initialWatched) {
      initialWatched = true;
      return;
    }
    if (!f7Messages) return;
    if (typingPassed) f7Messages.showTyping();
    else f7Messages.hideTyping();
  }

  $effect(() => watchTyping(typing));
</script>

<div bind:this={el} class={classes} {...restProps}>
  {@render children?.(f7Messages)}
</div>
