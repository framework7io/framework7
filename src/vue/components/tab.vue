<script>
import { computed, ref, inject, onMounted, onBeforeUnmount, onUpdated, toRaw, h } from 'vue';
import { classNames, getComponentId } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7ready, f7routers, f7, f7events } from '../shared/f7';
import { useTab } from '../shared/use-tab';
import { RouterContextProvider } from '../shared/router-context-provider';

export default {
  name: 'f7-tab',
  props: {
    tabActive: Boolean,
    ...colorProps,
  },
  emits: ['tab:show', 'tab:hide'],
  setup(props, { emit, slots }) {
    const elRef = ref(null);
    const routerData = ref(null);
    const route = inject('f7route', null);
    const router = inject('f7route', null);

    let initialTabContent = null;

    if (
      !routerData.value &&
      route &&
      route.route &&
      route.route.tab &&
      route.route.tab.id === props.id
    ) {
      const { component, asyncComponent } = route.route.tab;
      if (component || asyncComponent) {
        initialTabContent = {
          id: getComponentId(),
          component: component || asyncComponent,
          isAsync: !!asyncComponent,
          props: {
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

    return () => {
      let tab;
      if (tabContent.value) {
        const { f7router, f7route } = tabContent.value.props;
        const tabProps = { ...tabContent.value.props };
        delete tabProps.f7router;
        delete tabProps.f7route;
        tab = h(RouterContextProvider, { f7router, f7route, key: tabContent.value.id }, () =>
          h(toRaw(tabContent.value.component), {
            ...tabProps,
          }),
        );
      }
      return h('div', { ref: elRef, class: classes.value }, [
        tab || (slots.default && slots.default()),
      ]);
    };
  },
};
</script>
