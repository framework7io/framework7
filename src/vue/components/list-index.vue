<template>
  <div ref="elRef" :class="classes">
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

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
    auroraItemHeight: {
      type: Number,
      default: 14,
    },
    ...colorProps,
  },
  emits: ['listindex:select'],
  setup(props, { emit }) {
    const f7ListIndex = ref(null);
    const elRef = ref(null);

    const update = () => {
      if (!f7ListIndex.value) return;
      f7ListIndex.value.update();
    };
    const scrollListToIndex = (indexContent) => {
      if (!f7ListIndex.value) return;
      f7ListIndex.value.scrollListToIndex(indexContent);
    };

    watch(
      () => props.indexes,
      (newValue) => {
        if (!f7ListIndex.value) return;
        f7ListIndex.value.params.indexes = newValue;
        update();
      },
    );

    onMounted(() => {
      if (!props.init) return;
      f7ready(() => {
        f7ListIndex.value = f7.listIndex.create({
          el: elRef.value,
          listEl: props.listEl,
          indexes: props.indexes,
          iosItemHeight: props.iosItemHeight,
          mdItemHeight: props.mdItemHeight,
          auroraItemHeight: props.auroraItemHeight,
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
      if (f7ListIndex.value && f7ListIndex.value.destroy) {
        f7ListIndex.value.destroy();
      }
      f7ListIndex.value = null;
    });

    const classes = computed(() => classNames('list-index', colorClasses(props)));
    return { elRef, classes, update, scrollListToIndex };
  },
};
</script>
