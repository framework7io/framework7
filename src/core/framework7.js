import Template7 from 'template7';
import $ from 'dom7';

// F7 Class
import Framework7 from './components/app/app-class';

// Import Helpers
//ES_IMPORT_HELPERS

// Core Modules
import DeviceModule from './modules/device/device';
import SupportModule from './modules/support/support';
import UtilsModule from './modules/utils/utils';
import ResizeModule from './modules/resize/resize';
import RequestModule from './modules/request/request';
import TouchModule from './modules/touch/touch';
import ClicksModule from './modules/clicks/clicks';
import RouterModule from './modules/router/router';
import RouterTemplateLoaderModule from './modules/router/template-loader'; //NO_LITE
import RouterComponentLoaderModule from './modules/router/component-loader'; //NO_LITE
import ComponentModule, { Component } from './modules/component/component'; //NO_LITE
import HistoryModule from './modules/history/history';
import ServiceWorkerModule from './modules/service-worker/service-worker';

// Core Components
import Statusbar from './components/statusbar/statusbar';
import View from './components/view/view';
import Navbar from './components/navbar/navbar';
import Toolbar from './components/toolbar/toolbar';
import Subnavbar from './components/subnavbar/subnavbar';
import TouchRipple from './components/touch-ripple/touch-ripple';
import Modal from './components/modal/modal';
import Router from './modules/router/router-class';//NO_LITE

//IMPORT_COMPONENTS

if (process.env.FORMAT !== 'es') {
  if (typeof window !== 'undefined') {
    // Template7
    if (!window.Template7) window.Template7 = Template7;

    // Dom7
    if (!window.Dom7) window.Dom7 = $;
  }
}

// Install Core Modules & Components
Router.use([ //NO_LITE
  RouterTemplateLoaderModule, //NO_LITE
  RouterComponentLoaderModule, //NO_LITE
]); //NO_LITE

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
  ComponentModule, //NO_LITE
  ServiceWorkerModule,
  Statusbar,
  View,
  Navbar,
  Toolbar,
  Subnavbar,
  TouchRipple,
  Modal,
  //INSTALL_COMPONENTS
]);

//NAMED_ES_EXPORT
export default Framework7;
