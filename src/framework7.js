import t7 from 'template7';
import $ from 'dom7';

// F7 Class
import Framework7 from './components/app/app-class';

// Import Core Modules
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

//IMPORT_COMPONENTS

// Template7
Framework7.prototype.t7 = t7;
Framework7.Template7 = t7;
if (!window.Template7) window.Template7 = t7;

// Dom7
Framework7.prototype.$ = $;
Framework7.Dom7 = $;
if (!window.Dom7) window.Dom7 = $;

// Install Modules & Components
Framework7
  // Core Modules
  .use(Device)
  .use(Support)
  .use(Utils)
  .use(Resize)
  .use(Request)
  .use(Touch)
  .use(Clicks)
  .use(Router)
  .use(History)
  .use(Storage)
  // Core Components
  .use(Statusbar)
  .use(View)
  .use(Navbar)
  .use(Toolbar)
  .use(Subnavbar)
  .use(TouchRipple)
  // Additional Components
  //INSTALL_COMPONENTS

//EXPORT_COMPONENTS
