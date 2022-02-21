import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/lite/bundle';
import Framework7React from 'framework7-react';
import App from './app.jsx';

import 'framework7/css/bundle';
import './css/app.css';

// Demo
if (window.parent) {
  const html = document.documentElement;
  if (html) {
    html.style.setProperty('--f7-safe-area-top', '44px');
    html.style.setProperty('--f7-safe-area-bottom', '34px');
  }
}

Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(React.createElement(App), document.getElementById('app'));
