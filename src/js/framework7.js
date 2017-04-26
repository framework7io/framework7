import t7 from 'template7';
import $ from 'dom7';

// F7 Class
import Framework7 from './classes/framework7';

// Import Modules
import Resize from './modules/resize';
import Device from './modules/device';
import Support from './modules/support';
import Events from './modules/events';
import Touch from './modules/touch';
import Router from './modules/router';
import View from './modules/view';

// import Demo from './demo-module';

// Template7
Framework7.prototype.t7 = t7;

// Dom7
Framework7.prototype.$ = $;

// Install Modules
Framework7
  .use(Support)
  .use(Device)
  .use(Resize)
  .use(Events)
  .use(Touch)
  .use(Router)
  .use(View);

export default Framework7;
