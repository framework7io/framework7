import t7 from 'template7';
import $ from 'dom7';

// F7 Class
import Framework7 from './classes/framework7-class';

// Import Core Modules
import Resize from './modules/resize';
import Device from './modules/device';
import Support from './modules/support';
import Events from './modules/events';
import Touch from './modules/touch';
import Router from './modules/router';
import View from './modules/view';

// Additional Modules
import Sortable from './modules/sortable';
import Swipeout from './modules/swipeout';
import SmartSelect from './modules/smartselect';
import Calendar from './modules/calendar';
import Picker from './modules/picker';
import Panels from './modules/panels';

// Template7
Framework7.prototype.t7 = t7;

// Dom7
Framework7.prototype.$ = $;

// Install Modules
Framework7
  // Core Modules
  .use(Events)
  .use(Support)
  .use(Device)
  .use(Resize)
  .use(Touch)
  .use(Router)
  .use(View)
  // Additional Modules
  .use(Sortable)
  .use(Swipeout)
  .use(SmartSelect)
  .use(Calendar)
  .use(Picker)
  .use(Panels);

export default Framework7;
