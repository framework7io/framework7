import t7 from 'template7';
import $ from 'dom7';

// F7 Class
import Framework7 from './components/app/app-class';

// Import Core Modules
import Utils from './modules/utils/utils';
import Storage from './modules/storage/storage';
import Resize from './modules/resize/resize';
import Device from './modules/device/device';
import Support from './modules/support/support';
import Touch from './modules/touch/touch';
import Router from './modules/router/router';
import History from './modules/history/history';
import Clicks from './modules/clicks/clicks';

// Core Components
import Statusbar from './components/statusbar/statusbar';
import View from './components/view/view';
import Navbar from './components/navbar/navbar';
import Toolbar from './components/toolbar/toolbar';
import Subnavbar from './components/subnavbar/subnavbar';
import TouchRipple from './components/touch-ripple/touch-ripple';

//IMPORT_COMPONENTS

// Template7
if (typeof t7 !== 'undefined') {
  Framework7.prototype.t7 = t7;
  if (!window.Template7) window.Template7 = t7;
}

// Dom7
if (typeof $ !== 'undefined') {
  Framework7.prototype.$ = $;
  if (!window.Dom7) window.Dom7 = $;
}

// Install Modules & Components
Framework7
  // Core Modules
  .use(Utils)
  .use(Storage)
  .use(Support)
  .use(Device)
  .use(Resize)
  .use(Touch)
  .use(Router)
  .use(History)
  .use(Clicks)
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
