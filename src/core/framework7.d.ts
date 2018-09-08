import Template7 from 'template7';
import Dom7 from 'dom7';
import Framework7 from './components/app/app-class';

// Helpers
import Request from './utils/request';
import Utils from './utils/utils';
import Support from './utils/support';
import Device from './utils/device';

// Modules
// IMPORT_MODULES

// Components
// IMPORT_COMPONENTS

declare module './components/app/app-class' {
  // INSTALL
}

export { Request, Utils, Support, Device, Template7, Dom7 };
export default Framework7;