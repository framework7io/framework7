<script>
  import { onMount, onDestroy, afterUpdate, tick } from 'svelte'; // eslint-disable-line
  import f7 from '../utils/f7';

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
    f7.routers.modals = routerData;
  });
  afterUpdate(() => {
    if (!routerData) return;
    f7.events.emit('modalsRouterDidUpdate', routerData);
  });
  onDestroy(() => {
    if (!routerData) return;
    f7.routers.modals = null;
    routerData = null;
  });
</script>

<div class="framework7-modals" bind:this={el}>
  {#each modals as modal (modal.id)}
    <svelte:component this={modal.component} {...modal.props}></svelte:component>
  {/each}
</div>
