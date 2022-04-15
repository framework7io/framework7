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
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

export default {
  name: 'f7-list-group',
  props: {
    mediaList: Boolean,
    simpleList: Boolean,
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
    const ListContextParent = inject('ListContext', {
      value: {
        listIsMedia: props.mediaList,
        listIsSimple: props.simpleList,
        listIsSortable: props.sortable,
        listIsSortableOpposite: props.sortableOpposite,
      },
    });
    const ListContext = computed(() => ({
      listIsMedia: props.mediaList || ListContextParent.value.listIsMedia,
      listIsSimple: props.simpleList || ListContextParent.value.listIsSimple,
      listIsSortable: props.sortable || ListContextParent.value.listIsSortable,
      listIsSortableOpposite:
        props.sortableOpposite || ListContextParent.value.listIsSortableOpposite,
    }));

    provide('ListContext', ListContext);

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
