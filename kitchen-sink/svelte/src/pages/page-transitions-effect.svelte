<script>
  import { Page, Navbar, Block } from 'framework7-svelte';

  export let effect = '';
</script>

<Page>
  <Navbar title={effect} backLink="Back" />

  <Block class="text-align-center">
    <p>This page was loaded with <b>{effect}</b> transition.</p>
  </Block>
</Page>
