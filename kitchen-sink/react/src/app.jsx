import React from 'react';
import { App, Panel, View } from 'framework7-react';
import routes from './routes.js';
import store from './store.js';

export default () => {
  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }
  const needsBrowserHistory = document.location.href.includes('example-preview');

  return (
    <App
      theme={theme}
      routes={routes}
      store={store}
      popup={{ closeOnEscape: true }}
      sheet={{ closeOnEscape: true }}
      popover={{ closeOnEscape: true }}
      actions={{ closeOnEscape: true }}
    >
      <Panel left floating resizable>
        <View url="/panel-left/" linksView=".view-main" />
      </Panel>
      <Panel right floating resizable>
        <View url="/panel-right/" />
      </Panel>
      <View
        url="/"
        main
        className="safe-areas"
        masterDetailBreakpoint={768}
        browserHistory={needsBrowserHistory}
        browserHistoryRoot={needsBrowserHistory ? '/kitchen-sink/react/dist/' : ''}
        preloadPreviousPage={!needsBrowserHistory}
        iosSwipeBack={!needsBrowserHistory}
      />
    </App>
  );
};
