import React from 'react';
import { App, Panel, View, Statusbar } from 'framework7-react';
import routes from './routes';

export default function (props) {
  let theme = 'auto';
  if (document.location.search.indexOf('theme=') >= 0) {
    theme = document.location.search.split('theme=')[1].split('&')[0];
  }
  return (
    <App params={{ theme, routes }}>
      <Statusbar />
      <Panel left cover>
        <View url="/panel-left/" linksView=".view-main" />
      </Panel>
      <Panel right reveal>
        <View url="/panel-right/"/>
      </Panel>
      <View url="/" main className="safe-areas" masterDetailBreakpoint={800} />
    </App>
  );
};
