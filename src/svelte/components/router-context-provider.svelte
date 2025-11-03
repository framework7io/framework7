<script>
  import { setContext } from 'svelte';
  let { route, router, children } = $props();

  setContext('RouterContext', {
    route,
    router,
  });
</script>

{@render children?.()}
