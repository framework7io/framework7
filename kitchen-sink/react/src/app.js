import React from 'react';
import ReactDOM from 'react-dom';
import Framework7 from 'framework7/lite/bundle';
import Framework7React from 'framework7-react';
import App from './app.jsx';

import 'framework7/css/bundle';
import './css/app.css';

Framework7.use(Framework7React);

// Mount React App
ReactDOM.render(React.createElement(App), document.getElementById('app'));
