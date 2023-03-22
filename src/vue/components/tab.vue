<template>
  <swiper-slide v-if="isSwiper" ref="elRef" :class="classes">
    <component
      :is="getComponent(tabContent)"
      v-if="tabContent"
      :key="tabContent.id"
      v-bind="getProps(tabContent)"
    />
    <slot v-else />
  </swiper-slide>
  <div v-else ref="elRef" :class="classes">
    <component
      :is="getComponent(tabContent)"
      v-if="tabContent"
      :key="tabContent.id"
      v-bind="getProps(tabContent)"
    />
    <slot v-else />
  </div>
</template>
<script>
import { computed, ref, inject, onMounted, onBeforeUnmount, onUpdated, toRaw } from 'vue';
import { classNames, getComponentId } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7ready, f7routers, f7, f7events } from '../shared/f7.js';
import { useTab } from '../shared/use-tab.js';

export default {
  name: 'f7-tab',
  props: {
    tabActive: Boolean,
    ...colorProps,
  },
  emits: ['tab:show', 'tab:hide'],
  setup(props, { emit }) {
    const elRef = ref(null);
    const routerData = ref(null);
    const route = inject('f7route', null);
    const router = inject('f7route', null);
    const isSwiper = inject('TabsSwipeableContext', false);

    let initialTabContent = null;

    if (
      !routerData.value &&
      route &&
      route.route &&
      route.route.tab &&
      route.route.tab.id === props.id
    ) {
      const { component, asyncComponent, options: tabRouteOptions } = route.route.tab;
      if (component || asyncComponent) {
        const parentProps = route.route.options && route.route.options.props;
        initialTabContent = {
          id: getComponentId(),
          component: component || asyncComponent,
          isAsync: !!asyncComponent,
          props: {
            ...(parentProps || {}),
            ...((tabRouteOptions && tabRouteOptions.props) || {}),
            f7router: router,
            f7route: route,
            ...route.params,
          },
        };
      }
    }

    const tabContent = ref(initialTabContent || null);

    const setTabContent = (newContent) => {
      tabContent.value = newContent;
    };

    if (f7 && !routerData.value) {
      routerData.value = {
        setTabContent,
      };
      f7routers.tabs.push(routerData.value);
    }

    onMounted(() => {
      if (elRef.value && initialTabContent) {
        elRef.value.f7RouterTabLoaded = true;
      }
      f7ready(() => {
        if (!routerData.value) {
          routerData.value = {
            el: elRef.value,
            setTabContent,
          };
          f7routers.tabs.push(routerData.value);
        } else {
          routerData.value.el = elRef.value;
        }
      });
    });

    onBeforeUnmount(() => {
      if (!routerData.value) return;
      f7routers.tabs.splice(f7routers.tabs.indexOf(routerData.value), 1);
      routerData.value = null;
    });

    onUpdated(() => {
      if (!routerData.value || !f7) return;
      f7events.emit('tabRouterDidUpdate', routerData.value);
    });

    useTab(elRef, emit);

    const classes = computed(() =>
      classNames(
        'tab',
        {
          'tab-active': props.tabActive,
        },
        colorClasses(props),
      ),
    );

    const getComponent = (content) => toRaw(content.component);
    const getProps = (content) => {
      const { component: tabComponent, props: tabProps } = content;
      let keys = [];
      const passProps = {};
      if (tabComponent && tabComponent.props) keys = Object.keys(tabComponent.props);
      keys.forEach((key) => {
        if (key in tabProps) passProps[key] = tabProps[key];
      });
      return passProps;
    };

    return {
      elRef,
      classes,
      tabContent,
      getComponent,
      getProps,
      isSwiper,
    };
  },
};
</script>
