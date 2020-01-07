<Page>
  <Navbar title={effect} backLink="Back"></Navbar>

  <Block strong className="text-align-center">
  <p>This page was loaded with <b>{effect}</b> transition.</p>
  </Block>
</Page>
<script>
  import { Page, Navbar, Block } from 'framework7-svelte';

  export let effect = '';
</script>
