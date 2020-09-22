<script>
import { ref, onMounted, onBeforeUnmount, onUpdated, h, toRaw } from 'vue';
import { f7events, f7routers, f7 } from '../shared/f7';
import { RouterContextProvider } from '../shared/router-context-provider';

export default {
  name: 'f7-routable-modals',
  setup() {
    const elRef = ref(null);
    const modals = ref([]);
    const routerData = ref(null);

    onMounted(() => {
      routerData.value = {
        modals,
        el: elRef.value,
        setModals(newModals) {
          modals.value = [...newModals];
        },
      };
      f7routers.modals = routerData.value;
    });

    onUpdated(() => {
      if (!routerData.value || !f7) return;
      f7events.emit('modalsRouterDidUpdate', routerData.value);
    });

    onBeforeUnmount(() => {
      if (!routerData.value) return;
      f7routers.modals = null;
      routerData.value = null;
    });

    return () => {
      return h(
        'div',
        { ref: elRef, class: 'framework7-modals' },
        modals.value.map((modal) => {
          const { f7router, f7route } = modal.props;
          const modalProps = { ...modal.props };
          delete modalProps.f7router;
          delete modalProps.f7route;
          return h(RouterContextProvider, { f7router, f7route, key: modal.id }, () =>
            h(toRaw(modal.component), {
              ...modalProps,
            }),
          );
        }),
      );
    };
  },
};
</script>
