<template>
  <div id="framework7-root" ref="elRef" :class="classes">
    <slot />
    <routable-modals />
  </div>
</template>
<script>
import { ref, onMounted, computed, toRaw } from 'vue';
import { classNames, noUndefinedProps } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';

import RoutableModals from './routable-modals.js';
import { f7init, f7 } from '../shared/f7.js';

export default {
  name: 'f7-app',
  components: {
    RoutableModals,
  },
  inheritAttrs: false,
  props: {
    name: { type: String, default: undefined },
    theme: { type: String, default: undefined },
    routes: { type: Array, default: () => [] },
    store: Object,
    darkMode: { type: [Boolean, String], default: false },
    colors: { type: Object, default: () => undefined },
    lazyModulesPath: { type: String, default: undefined },
    initOnDeviceReady: { type: Boolean, default: undefined },
    iosTranslucentBars: { type: Boolean, default: undefined },
    iosTranslucentModals: { type: Boolean, default: undefined },
    userAgent: { type: String, default: undefined },
    url: { type: String, default: undefined },
    // components
    accordion: { type: Object, default: () => undefined },
    actions: { type: Object, default: () => undefined },
    areaChart: { type: Object, default: () => undefined },
    autocomplete: { type: Object, default: () => undefined },
    calendar: { type: Object, default: () => undefined },
    card: { type: Object, default: () => undefined },
    colorPicker: { type: Object, default: () => undefined },
    dialog: { type: Object, default: () => undefined },
    form: { type: Object, default: () => undefined },
    gauge: { type: Object, default: () => undefined },
    infiniteScroll: { type: Object, default: () => undefined },
    input: { type: Object, default: () => undefined },
    listIndex: { type: Object, default: () => undefined },
    loginScreen: { type: Object, default: () => undefined },
    messagebar: { type: Object, default: () => undefined },
    messages: { type: Object, default: () => undefined },
    navbar: { type: Object, default: () => undefined },
    notification: { type: Object, default: () => undefined },
    panel: { type: Object, default: () => undefined },
    photoBrowser: { type: Object, default: () => undefined },
    picker: { type: Object, default: () => undefined },
    pieChart: { type: Object, default: () => undefined },
    popover: { type: Object, default: () => undefined },
    popup: { type: Object, default: () => undefined },
    range: { type: Object, default: () => undefined },
    searchbar: { type: Object, default: () => undefined },
    sheet: { type: Object, default: () => undefined },
    smartSelect: { type: Object, default: () => undefined },
    sortable: { type: Object, default: () => undefined },
    statusbar: { type: Object, default: () => undefined },
    stepper: { type: Object, default: () => undefined },
    swipeout: { type: Object, default: () => undefined },
    textEditor: { type: Object, default: () => undefined },
    toast: { type: Object, default: () => undefined },
    toolbar: { type: Object, default: () => undefined },
    tooltip: { type: Object, default: () => undefined },
    view: { type: Object, default: () => undefined },
    virtualList: { type: Object, default: () => undefined },
    // modules
    clicks: { type: Object, default: () => undefined },
    serviceWorker: { type: Object, default: () => undefined },
    touch: { type: Object, default: () => undefined },
    ...colorProps,
  },
  setup(props) {
    const elRef = ref(null);

    const routes = toRaw(props.routes);

    if (!f7 || typeof window === 'undefined') {
      f7init(elRef.value, noUndefinedProps({ ...props, routes }), false);
    }

    onMounted(() => {
      const parentEl = elRef.value && elRef.value.parentNode;
      /* eslint-disable no-restricted-globals */
      if (
        typeof document !== 'undefined' &&
        parentEl &&
        parentEl !== document.body &&
        parentEl.parentNode === document.body
      ) {
        parentEl.style.height = '100%';
      }
      /* eslint-enable no-restricted-globals */
      if (f7) {
        f7.init(elRef.value);
        return;
      }
      f7init(elRef.value, noUndefinedProps({ ...props, routes }), true);
    });

    const classes = computed(() => classNames('framework7-root', colorClasses(props)));

    return { classes, elRef };
  },
};
</script>
