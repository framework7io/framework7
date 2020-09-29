<script>
  import { onMount, onDestroy, afterUpdate, tick } from 'svelte'; // eslint-disable-line
  import { f7events, f7routers } from '../shared/f7';

  let modals = [];
  let el;
  let routerData;

  onMount(() => {
    routerData = {
      el,
      modals,
      setModals(m) {
        tick().then(() => {
          modals = m;
        });
      },
    };
    f7routers.modals = routerData;
  });
  afterUpdate(() => {
    if (!routerData) return;
    f7events.emit('modalsRouterDidUpdate', routerData);
  });
  onDestroy(() => {
    if (!routerData) return;
    f7routers.modals = null;
    routerData = null;
  });
</script>

<div class="framework7-modals" bind:this={el}>
  {#each modals as modal (modal.id)}
    <svelte:component this={modal.component} {...modal.props} />
  {/each}
</div>
