<script>
  import { setContext } from 'svelte';

  export let route = undefined;
  export let router = undefined;

  setContext('RouterContext', {
    route,
    router,
  });
</script>

<slot />
