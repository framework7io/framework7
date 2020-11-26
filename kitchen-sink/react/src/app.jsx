import React from 'react';
import { App, Panel, View } from 'framework7-react';
import routes from './routes';
import store from './store';

export default () => {
  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }

  return (
    <App
      id="io.framework7.testapp"
      theme={theme}
      routes={routes}
      store={store}
      popup={{ closeOnEscape: true }}
      sheet={{ closeOnEscape: true }}
      popover={{ closeOnEscape: true }}
      actions={{ closeOnEscape: true }}
    >
      <Panel left cover resizable>
        <View url="/panel-left/" linksView=".view-main" />
      </Panel>
      <Panel right reveal resizable>
        <View url="/panel-right/" />
      </Panel>
      <View url="/" main className="safe-areas" masterDetailBreakpoint={768} />
    </App>
  );
};
