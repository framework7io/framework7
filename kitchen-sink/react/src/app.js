import React from 'react';
// eslint-disable-next-line
import { createRoot } from 'react-dom/client';

import Framework7 from 'framework7/lite/bundle';
import Framework7React from 'framework7-react';
import App from './app.jsx';

import 'framework7/css/bundle';
import '../../core/css/app.css';

// Demo
if (document.location.href.includes('safe-areas')) {
  const html = document.documentElement;
  if (html) {
    html.style.setProperty('--f7-safe-area-top', '44px');
    html.style.setProperty('--f7-safe-area-bottom', '34px');
  }
}
if (document.location.search.indexOf('mode=') >= 0) {
  const mode = document.location.search.split('mode=')[1].split('&')[0];
  if (mode === 'dark') document.documentElement.classList.add('dark');
}
if (document.location.href.includes('example-preview')) {
  document.documentElement.classList.add('example-preview');
}

Framework7.use(Framework7React);

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(App));
