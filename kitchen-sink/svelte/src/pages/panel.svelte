<script>
  import { Navbar, Page, Block, Button, Panel, Link } from 'framework7-svelte';
</script>

<Page id="panel-page">
  <Navbar title="Panel / Side panels" backLink />
  <Panel left cover containerEl="#panel-page" id="panel-nested">
    <Page>
      <Block strong inset>
        <p>This is page-nested Panel.</p>
        <p>
          <Link panelClose>Close me</Link>
        </p>
      </Block>
    </Page>
  </Panel>
  <Block strong inset>
    <p>
      Framework7 comes with 2 panels (on left and on right), both are optional. You can put
      absolutely anything inside: data lists, forms, custom content, and even other isolated app
      view (like in right panel now) with its own dynamic navbar.
    </p>
  </Block>
  <Block strong inset>
    <p class="grid grid-cols-2 grid-gap">
      <Button fill round panelOpen="left">Open left panel</Button>
      <Button fill round panelOpen="right">Open right panel</Button>
    </p>
    <p>
      <Button fill round panelOpen="#panel-nested">Open nested panel</Button>
    </p>
  </Block>
</Page>
