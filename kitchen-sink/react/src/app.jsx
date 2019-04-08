import React from 'react';
import { App, Panel, View, Statusbar } from 'framework7-react';
import routes from './routes';

export default function (props) {
  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }
  const f7Params = {
    id: 'io.framework7.testapp',
    theme,
    routes,
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
  }
  return (
    <App params={ f7Params }>
      <Statusbar />
      <Panel left cover resizable>
        <View url="/panel-left/" linksView=".view-main" />
      </Panel>
      <Panel right reveal resizable>
        <View url="/panel-right/"/>
      </Panel>
      <View url="/" main className="safe-areas" masterDetailBreakpoint={800} />
    </App>
  );
};
