<template>
  <div class="framework7-modals" ref="elRef">
    <component v-for="modal in modals" :key="modal.id" :is="modal.component" v-bind="modalProps" />
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, onUpdated } from 'vue';
import { f7events, f7routers, f7 } from '../shared/f7';

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

    return { elRef, modals };
  },
};
</script>
