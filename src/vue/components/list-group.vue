<template>
  <div
    :class="classes"
    :data-sortable-move-elements="
      typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
    "
  >
    <ul>
      <slot />
    </ul>
  </div>
</template>
<script>
import { computed, provide, inject } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-list-group',
  props: {
    mediaList: Boolean,
    sortable: Boolean,
    sortableOpposite: Boolean,
    sortableTapHold: Boolean,
    sortableMoveElements: {
      type: Boolean,
      default: undefined,
    },
    ...colorProps,
  },
  setup(props) {
    const ListContext = inject('ListContext', {
      listIsMedia: props.mediaList,
      listIsSimple: props.simpleList,
      listIsSortable: props.sortable,
      listIsSortableOpposite: props.sortableOpposite,
    });

    provide('ListContext', {
      listIsMedia: props.mediaList || ListContext.listIsMedia,
      listIsSimple: props.simpleList || ListContext.listIsSimple,
      listIsSortable: props.sortable || ListContext.listIsSortable,
      listIsSortableOpposite: props.sortableOpposite || ListContext.listIsSortableOpposite,
    });

    const classes = computed(() =>
      classNames(
        'list-group',
        {
          'media-list': props.mediaList,
          sortable: props.sortable,
          'sortable-tap-hold': props.sortableTapHold,
          'sortable-opposite': props.sortableOpposite,
        },
        colorClasses(props),
      ),
    );

    return { classes };
  },
};
</script>
