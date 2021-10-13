<template>
  <div :class="classes">
    <f7-link
      v-if="backLink"
      :href="backLinkUrl || '#'"
      back
      icon="icon-back"
      :force="backLinkForce || undefined"
      :class="!text ? 'icon-only' : undefined"
      :text="text"
      @click="onBackClick"
    />
    <slot />
  </div>
</template>
<script>
import { computed } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { useTheme } from '../shared/use-theme.js';

import f7Link from './link.js';

export default {
  name: 'f7-nav-left',
  components: {
    f7Link,
  },
  props: {
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined,
    },
    sliding: Boolean,
    ...colorProps,
  },
  emits: ['back:click', 'click:back'],
  setup(props, { emit }) {
    const onBackClick = (event) => {
      emit('back:click', event);
      emit('click:back', event);
    };
    const theme = useTheme();

    const text = computed(() => {
      let needBackLinkText = props.backLinkShowText;
      if (typeof needBackLinkText === 'undefined') needBackLinkText = !theme.value.md;
      if (props.backLink) {
        return props.backLink !== true && needBackLinkText ? props.backLink : undefined;
      }
      return undefined;
    });

    const classes = computed(() =>
      classNames(
        'left',
        {
          sliding: props.sliding,
        },
        colorClasses(props),
      ),
    );
    return { classes, onBackClick, text };
  },
};
</script>
