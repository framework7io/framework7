<script>
  import { Navbar, Page, Block, Button, Panel, Link } from 'framework7-svelte';
</script>

<Page id="panel-page">
  <Navbar title="Panel / Side panels" backLink="Back" />
  <Panel left cover containerEl="#panel-page" id="panel-nested">
    <Page>
      <Block strong>
        <p>This is page-nested Panel.</p>
        <p>
          <Link panelClose>Close me</Link>
        </p>
      </Block>
    </Page>
  </Panel>
  <Block>
    <p>
      Framework7 comes with 2 panels (on left and on right), both are optional. They have two
      different layouts/effects -
      <b>cover</b>
      above the content (like left panel here) and
      <b> reveal</b>
      (like right panel). You can put absolutely anything inside: data lists, forms, custom content,
      and even other isolated app view (like in right panel now) with its own dynamic navbar. Checkout
      panels:
    </p>
  </Block>
  <Block>
    <p class="grid grid-cols-2 grid-gap">
      <Button raised fill panelOpen="left">Open left panel</Button>
      <Button raised fill panelOpen="right">Open right panel</Button>
    </p>
    <p>
      <Button raised fill panelOpen="#panel-nested">Open nested panel</Button>
    </p>
  </Block>
</Page>
