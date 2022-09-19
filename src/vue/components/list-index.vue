<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-list-index',
  props: {
    init: {
      type: Boolean,
      default: true,
    },
    listEl: [String, Object],
    indexes: {
      type: [String, Array],
      default: 'auto',
    },
    scrollList: {
      type: Boolean,
      default: true,
    },
    label: {
      type: Boolean,
      default: false,
    },
    iosItemHeight: {
      type: Number,
      default: 14,
    },
    mdItemHeight: {
      type: Number,
      default: 14,
    },
    ...colorProps,
  },
  emits: ['listindex:select'],
  setup(props, { emit }) {
    let f7ListIndex = null;
    const elRef = ref(null);

    const update = () => {
      if (!f7ListIndex) return;
      f7ListIndex.update();
    };
    const scrollListToIndex = (indexContent) => {
      if (!f7ListIndex) return;
      f7ListIndex.scrollListToIndex(indexContent);
    };

    watch(
      () => props.indexes,
      (newValue) => {
        if (!f7ListIndex) return;
        f7ListIndex.params.indexes = newValue;
        update();
      },
    );

    onMounted(() => {
      if (!props.init) return;
      f7ready(() => {
        f7ListIndex = f7.listIndex.create({
          el: elRef.value,
          listEl: props.listEl,
          indexes: props.indexes,
          iosItemHeight: props.iosItemHeight,
          mdItemHeight: props.mdItemHeight,
          scrollList: props.scrollList,
          label: props.label,
          on: {
            select(index, itemContent, itemIndex) {
              emit('listindex:select', itemContent, itemIndex);
            },
          },
        });
      });
    });

    onBeforeUnmount(() => {
      if (f7ListIndex && f7ListIndex.destroy) {
        f7ListIndex.destroy();
      }
      f7ListIndex = null;
    });

    const classes = computed(() => classNames('list-index', colorClasses(props)));
    return { elRef, classes, update, scrollListToIndex };
  },
};
</script>
