<template>
  <div :class="classes" @click="onClick">
    <slot name="start" />
    <div
      v-if="hasAvatar"
      class="message-avatar"
      :style="{ backgroundImage: avatar && `url(${avatar})` }"
      @click="onAvatarClick"
    >
      <slot name="avatar" />
    </div>
    <div class="message-content">
      <slot name="content-start" />
      <div v-if="hasName" class="message-name" @click="onNameClick">
        {{ name }}
        <slot name="name" />
      </div>
      <div v-if="hasHeader" class="message-header" @click="onHeaderClick">
        {{ header }}
        <slot name="header" />
      </div>
      <div class="message-bubble" @click="onBubbleClick">
        <slot name="bubble-start" />
        <div v-if="hasImage" class="message-image">
          <slot name="image">
            <img :src="image" />
          </slot>
        </div>
        <div v-if="hasTextHeader" class="message-text-header">
          {{ textHeader }}
          <slot name="text-header" />
        </div>
        <div v-if="hasText" class="message-text" @click="onTextClick">
          {{ text }}
          <slot name="text" />
          <div v-if="typing" class="message-typing-indicator">
            <div />
            <div />
            <div />
          </div>
        </div>
        <div v-if="hasTextFooter" class="message-text-footer">
          {{ textFooter }}
          <slot name="text-footer" />
        </div>
        <slot name="bubble-end" />
        <slot />
      </div>
      <div v-if="hasFooter" class="message-footer" @click="onFooterClick">
        {{ footer }}
        <slot name="footer" />
      </div>
      <slot name="content-end" />
    </div>
    <slot name="end" />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-message',
  props: {
    text: String,
    name: String,
    avatar: String,
    type: {
      type: String,
      default: 'sent',
    },
    image: String,
    header: String,
    footer: String,
    textHeader: String,
    textFooter: String,
    first: Boolean,
    last: Boolean,
    tail: Boolean,
    sameName: Boolean,
    sameHeader: Boolean,
    sameFooter: Boolean,
    sameAvatar: Boolean,
    typing: Boolean,
    ...colorProps,
  },
  emits: [
    'click',
    'click:name',
    'click:text',
    'click:avatar',
    'click:header',
    'click:footer',
    'click:bubble',
  ],
  setup(props, { emit, slots }) {
    const onClick = (event) => {
      emit('click', event);
    };
    const onNameClick = (event) => {
      emit('click:name', event);
    };
    const onTextClick = (event) => {
      emit('click:text', event);
    };
    const onAvatarClick = (event) => {
      emit('click:avatar', event);
    };
    const onHeaderClick = (event) => {
      emit('click:header', event);
    };
    const onFooterClick = (event) => {
      emit('click:footer', event);
    };
    const onBubbleClick = (event) => {
      emit('click:bubble', event);
    };
    const classes = computed(() =>
      classNames(
        'message',
        {
          'message-sent': props.type === 'sent',
          'message-received': props.type === 'received',
          'message-typing': props.typing,
          'message-first': props.first,
          'message-last': props.last,
          'message-tail': props.tail,
          'message-same-name': props.sameName,
          'message-same-header': props.sameHeader,
          'message-same-footer': props.sameFooter,
          'message-same-avatar': props.sameAvatar,
        },
        colorClasses(props),
      ),
    );
    const hasAvatar = computed(() => slots.avatar || props.avatar);
    const hasName = computed(() => slots.name || props.name);
    const hasHeader = computed(() => slots.header || props.header);
    const hasImage = computed(() => slots.image || props.image);
    const hasTextHeader = computed(() => slots['text-header'] || props.textHeader);
    const hasText = computed(() => slots.text || props.text || props.typing);
    const hasTextFooter = computed(() => slots['text-footer'] || props.textFooter);
    const hasFooter = computed(() => slots.footer || props.footer);

    return {
      classes,
      onClick,
      onNameClick,
      onTextClick,
      onAvatarClick,
      onHeaderClick,
      onFooterClick,
      onBubbleClick,
      hasAvatar,
      hasName,
      hasHeader,
      hasImage,
      hasTextHeader,
      hasText,
      hasTextFooter,
      hasFooter,
    };
  },
};
</script>
