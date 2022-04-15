<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
  import { colorClasses } from '../shared/mixins.js';
  import { classNames, noUndefinedProps } from '../shared/utils.js';
  import { restProps } from '../shared/rest-props.js';
  import { app, f7ready } from '../shared/f7.js';

  let className = undefined;
  export { className as class };

  export let autoLayout = false;
  export let messages = [];
  export let newMessagesFirst = false;
  export let scrollMessages = true;
  export let scrollMessagesOnEdge = true;
  export let firstMessageRule = undefined;
  export let lastMessageRule = undefined;
  export let tailMessageRule = undefined;
  export let sameNameMessageRule = undefined;
  export let sameHeaderMessageRule = undefined;
  export let sameFooterMessageRule = undefined;
  export let sameAvatarMessageRule = undefined;
  export let customClassMessageRule = undefined;
  export let renderMessage = undefined;
  export let typing = false;

  export let init = true;

  let el;
  let f7Messages;
  let childrenBeforeUpdated = null;

  export function instance() {
    return f7Messages;
  }

  $: classes = classNames(className, 'messages', colorClasses($$props));

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

  beforeUpdate(() => {
    if (!init || !el) return;
    const children = el.children;
    if (!children) return;
    childrenBeforeUpdated = children.length;

    for (let i = 0; i < children.length; i += 1) {
      children[i].classList.add('message-appeared');
    }
  });

  afterUpdate(() => {
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

  $: watchTyping(typing);
</script>

<div bind:this={el} class={classes} {...restProps($$restProps)}>
  <slot messages={f7Messages} />
</div>
