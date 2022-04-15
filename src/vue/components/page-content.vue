<template>
  <div
    ref="elRef"
    :class="classes"
    :data-ptr-distance="ptrDistance || undefined"
    :data-ptr-mousewheel="ptrMousewheel || undefined"
    :data-infinite-distance="infiniteDistance || undefined"
  >
    <div v-if="ptr && ptrPreloader && !ptrBottom" class="ptr-preloader">
      <f7-preloader />
      <div class="ptr-arrow" />
    </div>
    <f7-preloader
      v-if="infinite && infinitePreloader && infiniteTop"
      class="infinite-scroll-preloader"
    />
    <slot />
    <f7-preloader
      v-if="infinite && infinitePreloader && !infiniteTop"
      class="infinite-scroll-preloader"
    />
    <div v-if="ptr && ptrPreloader && ptrBottom" class="ptr-preloader">
      <f7-preloader />
      <div class="ptr-arrow" />
    </div>
  </div>
</template>
<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { classNames } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

import f7Preloader from './preloader.js';
import { useTab } from '../shared/use-tab.js';
import { f7ready, f7 } from '../shared/f7.js';

export default {
  name: 'f7-page-content',
  components: {
    f7Preloader,
  },
  props: {
    tab: Boolean,
    tabActive: Boolean,
    ptr: Boolean,
    ptrDistance: Number,
    ptrPreloader: {
      type: Boolean,
      default: true,
    },
    ptrBottom: Boolean,
    ptrMousewheel: Boolean,
    infinite: Boolean,
    infiniteTop: Boolean,
    infiniteDistance: Number,
    infinitePreloader: {
      type: Boolean,
      default: true,
    },
    hideBarsOnScroll: Boolean,
    hideNavbarOnScroll: Boolean,
    hideToolbarOnScroll: Boolean,
    messagesContent: Boolean,
    loginScreen: Boolean,
    ...colorProps,
  },
  emits: [
    'ptr:pullstart',
    'ptr:pullmove',
    'ptr:pullend',
    'ptr:refresh',
    'ptr:done',
    'infinite',
    'ptrPullStart',
    'ptrPullMove',
    'ptrPullEnd',
    'ptrRefresh',
    'ptrDone',
    'tab:hide',
    'tab:show',
  ],
  setup(props, { emit }) {
    const elRef = ref(null);

    const onPtrPullStart = (el) => {
      if (elRef.value !== el) return;
      emit('ptr:pullstart');
      emit('ptrPullStart');
    };
    const onPtrPullMove = (el) => {
      if (elRef.value !== el) return;
      emit('ptr:pullmove');
      emit('ptrPullMove');
    };
    const onPtrPullEnd = (el) => {
      if (elRef.value !== el) return;
      emit('ptr:pullend');
      emit('ptrPullEnd');
    };
    const onPtrRefresh = (el, done) => {
      if (elRef.value !== el) return;
      emit('ptr:refresh', done);
      emit('ptrRefresh', done);
    };
    const onPtrDone = (el) => {
      if (elRef.value !== el) return;
      emit('ptr:done');
      emit('ptrDone');
    };
    const onInfinite = (el) => {
      if (elRef.value !== el) return;
      emit('infinite');
    };

    useTab(elRef, emit);

    onMounted(() => {
      f7ready(() => {
        if (props.ptr) {
          f7.on('ptrPullStart', onPtrPullStart);
          f7.on('ptrPullMove', onPtrPullMove);
          f7.on('ptrPullEnd', onPtrPullEnd);
          f7.on('ptrRefresh', onPtrRefresh);
          f7.on('ptrDone', onPtrDone);
        }
        if (props.infinite) {
          f7.on('infinite', onInfinite);
        }
      });
    });

    onBeforeUnmount(() => {
      if (!f7) return;
      f7.off('ptrPullStart', onPtrPullStart);
      f7.off('ptrPullMove', onPtrPullMove);
      f7.off('ptrPullEnd', onPtrPullEnd);
      f7.off('ptrRefresh', onPtrRefresh);
      f7.off('ptrDone', onPtrDone);
      f7.off('infinite', onInfinite);
    });

    const classes = computed(() =>
      classNames(
        'page-content',
        {
          tab: props.tab,
          'tab-active': props.tabActive,
          'ptr-content': props.ptr,
          'ptr-bottom': props.ptrBottom,
          'infinite-scroll-content': props.infinite,
          'infinite-scroll-top': props.infiniteTop,
          'hide-bars-on-scroll': props.hideBarsOnScroll,
          'hide-navbar-on-scroll': props.hideNavbarOnScroll,
          'hide-toolbar-on-scroll': props.hideToolbarOnScroll,
          'messages-content': props.messagesContent,
          'login-screen-content': props.loginScreen,
        },
        colorClasses(props),
      ),
    );

    return {
      elRef,
      classes,
    };
  },
};
</script>
