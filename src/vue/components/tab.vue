<template>
  <div ref="elRef" :class="classes">
    <component
      :is="tabContent.component"
      v-if="tabContent"
      :key="tabContent.id"
      v-bind="tabContent.props"
    />
    <slot v-else />
  </div>
</template>
<script>
import { computed, ref, inject, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import { classNames, getComponentId } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7routers, f7, f7events } from '../shared/f7';
import { useTab } from '../shared/use-tab';

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
    const RouterContext = inject('f7Router', {});

    let initialTabContent = null;

    if (
      !routerData.value &&
      RouterContext &&
      RouterContext.route &&
      RouterContext.route.route &&
      RouterContext.route.route.tab &&
      RouterContext.route.route.tab.id === props.id
    ) {
      const { component, asyncComponent } = RouterContext.route.route.tab;
      if (component || asyncComponent) {
        initialTabContent = {
          id: getComponentId(),
          component: component || asyncComponent,
          isAsync: !!asyncComponent,
          props: {
            f7router: RouterContext.router,
            f7route: RouterContext.route,
            ...RouterContext.route.params,
          },
        };
      }
    }

    const tabContent = ref(initialTabContent || null);

    const setTabContent = (newContent) => {
      tabContent.value = newContent;
    };

    const show = (animate) => {
      if (!f7) return;
      f7.tab.show(elRef.value, animate);
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

    return { classes, show, elRef, tabContent };
  },
};
</script>
