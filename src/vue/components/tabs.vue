<template>
  <div v-if="animated || swipeable" ref="elRef" :class="classNames(wrapClasses, classes)">
    <div :class="tabsClasses">
      <slot />
    </div>
  </div>
  <div v-else ref="elRef" :class="classNames(tabsClasses, classes)">
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted } from 'vue';
import { classNames } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';

export default {
  name: 'f7-tabs',
  props: {
    animated: Boolean,
    swipeable: Boolean,
    routable: Boolean,
    swiperParams: {
      type: Object,
      default: undefined,
    },
    ...colorProps,
  },
  setup(props) {
    const elRef = ref(null);

    onMounted(() => {
      if (!props.swipeable || !props.swiperParams) return;
      if (!elRef.value) return;
      elRef.value.f7SwiperParams = props.swiperParams;
    });

    const classes = computed(() => classNames(colorClasses(props)));
    const wrapClasses = computed(() =>
      classNames({
        'tabs-animated-wrap': props.animated,
        'tabs-swipeable-wrap': props.swipeable,
      }),
    );
    const tabsClasses = computed(() =>
      classNames({
        tabs: true,
        'tabs-routable': props.routable,
      }),
    );

    return {
      elRef,
      classes,
      wrapClasses,
      tabsClasses,
      classNames,
    };
  },
};
</script>
