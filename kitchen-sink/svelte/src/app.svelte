<script>
  import { App, Panel, View } from 'framework7-svelte';
  import routes from './routes';
  import store from './store';

  // Demo Theme
  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }

  const f7Params = {
    id: 'io.framework7.testapp',
    theme,
    routes,
    store,
    popup: {
      closeOnEscape: true,
    },
    sheet: {
      closeOnEscape: true,
    },
    popover: {
      closeOnEscape: true,
    },
    actions: {
      closeOnEscape: true,
    },
  };
</script>

<App {...f7Params}>
  <Panel left cover resizable>
    <View url="/panel-left/" links-view=".view-main" />
  </Panel>
  <Panel right reveal resizable>
    <View url="/panel-right/" />
  </Panel>
  <View url="/" main={true} class="safe-areas" masterDetailBreakpoint={768} />
</App>
