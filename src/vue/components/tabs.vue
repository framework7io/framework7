<template>
  <div v-if="animated" ref="elRef" :class="classNames('tabs-animated-wrap', classes)">
    <div :class="tabsClasses">
      <slot />
    </div>
  </div>
  <swiper-container v-else-if="swipeable" ref="elRef" :class="classNames(tabsClasses, classes)"
    :init="swiperParams ? 'false' : 'true'">
    <slot />
  </swiper-container>
  <div v-else ref="elRef" :class="classNames(tabsClasses, classes)">
    <slot />
  </div>
</template>
<script>
import { computed, ref, onMounted, provide } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';

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
      if (props.swipeable) {
        f7ready(() => {
          // It only initializes in pageInit callback
          // We may need to manually call init() to update the instance
          f7.swiper.init(elRef.value)
        });
      }
      if (!props.swipeable || !props.swiperParams) return;
      if (!elRef.value) return;
      Object.assign(elRef.value, props.swiperParams);
      elRef.value.initialize();
    });

    const classes = computed(() => classNames(colorClasses(props)));

    const tabsClasses = computed(() =>
      classNames({
        tabs: true,
        'tabs-routable': props.routable,
      }),
    );

    const TabsSwipeableContext = computed(() => props.swipeable);

    provide('TabsSwipeableContext', TabsSwipeableContext);

    return {
      elRef,
      classes,
      tabsClasses,
      classNames,
    };
  },
};
</script>
