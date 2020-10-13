import $ from './shared/dom7';

import Framework7 from './components/app/app-class';

//IMPORT_HELPERS

import DeviceModule from './modules/device/device';
import SupportModule from './modules/support/support';
import UtilsModule from './modules/utils/utils';
import ResizeModule from './modules/resize/resize';
import RequestModule from './modules/request/request';
import TouchModule from './modules/touch/touch';
import ClicksModule from './modules/clicks/clicks';
import RouterModule from './modules/router/router';
import RouterComponentLoaderModule from './modules/router/component-loader';
import ComponentModule, { Component, $jsx } from './modules/component/component';
import HistoryModule from './modules/history/history';
import ServiceWorkerModule from './modules/service-worker/service-worker';
import StoreModule, { createStore } from './modules/store/store';

import Statusbar from './components/statusbar/statusbar';
import View from './components/view/view';
import Navbar from './components/navbar/navbar';
import Toolbar from './components/toolbar/toolbar';
import Subnavbar from './components/subnavbar/subnavbar';
import TouchRipple from './components/touch-ripple/touch-ripple';
import Modal from './components/modal/modal';
import Router from './modules/router/router-class';

//IMPORT_COMPONENTS

// UMD_ONLY_START
if (typeof window !== 'undefined') {
  // Dom7
  if (!window.Dom7) window.Dom7 = $;
}
// UMD_ONLY_END

Router.use([RouterComponentLoaderModule]);

Framework7.use([
  DeviceModule,
  SupportModule,
  UtilsModule,
  ResizeModule,
  RequestModule,
  TouchModule,
  ClicksModule,
  RouterModule,
  HistoryModule,
  ComponentModule,
  ServiceWorkerModule,
  StoreModule,
  Statusbar,
  View,
  Navbar,
  Toolbar,
  Subnavbar,
  TouchRipple,
  Modal,
  //INSTALL_COMPONENTS
]);

//NAMED_EXPORT
export default Framework7;
