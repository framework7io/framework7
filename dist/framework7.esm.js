/**
 * Framework7 2.0.2
 * Full featured mobile HTML framework for building iOS & Android apps
 * http://framework7.io/
 *
 * Copyright 2014-2017 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: December 5, 2017
 */

import Template7 from 'template7';
import $ from 'dom7';

// F7 Class
import Framework7 from './components/core/core-class';

// Core Modules
import Device from './modules/device/device';
import Support from './modules/support/support';
import Utils from './modules/utils/utils';
import Resize from './modules/resize/resize';
import Request from './modules/request/request';
import Touch from './modules/touch/touch';
import Clicks from './modules/clicks/clicks';
import Router from './modules/router/router';
import History from './modules/history/history';
import Storage from './modules/storage/storage';

// Core Components
import Statusbar from './components/statusbar/statusbar';
import View from './components/view/view';
import Navbar from './components/navbar/navbar';
import Toolbar from './components/toolbar/toolbar';
import Subnavbar from './components/subnavbar/subnavbar';
import TouchRipple from './components/touch-ripple/touch-ripple';
import Modal from './components/modal/modal';


if ("es" !== 'es') {
  // Template7
  if (!window.Template7) window.Template7 = Template7;

  // Dom7
  if (!window.Dom7) window.Dom7 = $;
}

// Install Core Modules & Components
Framework7.use([
  Device,
  Support,
  Utils,
  Resize,
  Request,
  Touch,
  Clicks,
  Router,
  History,
  Storage,
  Statusbar,
  View,
  Navbar,
  Toolbar,
  Subnavbar,
  TouchRipple,
  Modal,
  ]);

export default Framework7;
