<script>
  import Popup from '../components/popup.svelte';
  import View from '../components/view.svelte';
  import LoginScreen from '../components/login-screen.svelte';
  import Sheet from '../components/sheet.svelte';
  import Popover from '../components/popover.svelte';
  import Panel from '../components/panel.svelte';

  export let openIn;
  export let url;
  export let viewSelector;
  export let targetEl;
  export let side;
  export let effect;
</script>

{#if openIn === 'popup'}
  <Popup className="popup-router-open-in" data-url={url}>
    <View linksView={viewSelector} {url} ignoreOpenIn />
  </Popup>
{/if}
{#if openIn === 'loginScreen'}
  <LoginScreen className="login-screen-router-open-in" data-url={url}>
    <View linksView={viewSelector} {url} ignoreOpenIn />
  </LoginScreen>
{/if}
{#if openIn === 'sheet'}
  <Sheet className="sheet-modal-router-open-in" data-url={url}>
    <View linksView={viewSelector} {url} ignoreOpenIn />
  </Sheet>
{/if}
{#if openIn === 'popover'}
  <Popover className="popover-router-open-in" {targetEl} data-url={url}>
    <View linksView={viewSelector} {url} ignoreOpenIn />
  </Popover>
{/if}
{#if openIn.indexOf('panel') === 0}
  <Panel {side} {effect} className="panel-router-open-in" data-url={url}>
    <View linksView={viewSelector} {url} ignoreOpenIn />
  </Panel>
{/if}
