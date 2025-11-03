<script>
  import { onMount, onDestroy, tick } from 'svelte'; // eslint-disable-line
  import { app } from '../shared/f7.js';

  let modals = $state([]);
  let el = $state(null);
  let routerData = $state(null);

  onMount(() => {
    routerData = {
      el,
      modals,
      setModals(m) {
        tick().then(() => {
          modals = [...m];
        });
      },
    };
    app.f7routers.modals = routerData;
  });
  $effect(() => {
    if (!routerData) return;
    app.f7events.emit('modalsRouterDidUpdate', routerData);
    return modals;
  });
  onDestroy(() => {
    if (!routerData) return;
    app.f7routers.modals = null;
    routerData = null;
  });
</script>

<div class="framework7-modals" bind:this={el}>
  {#each modals as Modal (Modal.id)}
    <Modal.component {...Modal.props} />
  {/each}
</div>
