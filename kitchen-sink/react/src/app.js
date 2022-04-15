import React from 'react';
// eslint-disable-next-line
import { createRoot } from 'react-dom/client';

import Framework7 from 'framework7/lite/bundle';
import Framework7React from 'framework7-react';
import App from './app.jsx';

import 'framework7/css/bundle';
import './css/app.css';

// Demo
if (window.parent && window.parent !== window) {
  const html = document.documentElement;
  if (html) {
    html.style.setProperty('--f7-safe-area-top', '44px');
    html.style.setProperty('--f7-safe-area-bottom', '34px');
  }
}

Framework7.use(Framework7React);

const root = createRoot(document.getElementById('app'));
root.render(React.createElement(App));
