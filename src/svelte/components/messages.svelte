<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
  import Mixins from '../utils/mixins';
  import Utils from '../utils/utils';
  import f7 from '../utils/f7';

  export let id = undefined;
  export let style = undefined;

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

  export let init = true;

  let el;
  let f7Messages;

  export function instance() {
    return f7Messages;
  }
  export function scroll(duration, scrollTop) {
    if (!f7Messages) return undefined;
    return f7Messages.scroll(duration, scrollTop);
  }
  export function showTyping(message) {
    if (!f7Messages) return undefined;
    return f7Messages.showTyping(message);
  }
  export function hideTyping() {
    if (!f7Messages) return undefined;
    return f7Messages.hideTyping();
  }

  $: classes = Utils.classNames(
    className,
    'messages',
    Mixins.colorClasses($$props),
  );

  onMount(() => {
    if (!init) return;
    f7.ready(() => {
      f7Messages = f7.instance.messages.create(Utils.noUndefinedProps({
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
      }));
    });
  });

  beforeUpdate(() => {
    if (!init || !el) return;
    const children = el.children;
    if (!children) return;

    for (let i = 0; i < children.length; i += 1) {
      children[i].classList.add('message-appeared');
    }
  });

  afterUpdate(() => {
    if (!init) return;
    if (!el) return;

    const children = el.children;
    if (!children) return;

    for (let i = 0; i < children.length; i += 1) {
      if (!children[i].classList.contains('message-appeared')) {
        children[i].classList.add('message-appear-from-bottom');
      }
    }

    if (f7Messages && f7Messages.layout && autoLayout) {
      f7Messages.layout();
    }
    if (f7Messages && f7Messages.scroll && scrollMessages) {
      f7Messages.scroll();
    }
  });

  onDestroy(() => {
    if (f7Messages && f7Messages.destroy) f7Messages.destroy();
  });

</script>

<div bind:this={el} id={id} style={style} class={classes}>
  <slot />
</div>
