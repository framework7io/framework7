import Dom7 from 'dom7';
// IMPORT_BASE

import { getSupport, Support } from './shared/get-support.js';
import { getDevice, Device } from './shared/get-device.js';
import { Utils } from './shared/utils.js';
import { Framework7Parameters, Framework7Plugin } from './components/app/app-class.js';

// IMPORT_MODULES
import { ComponentFunction as Component } from './modules/component/component.js';
import { StoreObject as Store, StoreParameters, createStore } from './modules/store/store.js';

// IMPORT_COMPONENTS

declare module './components/app/app-class.js' {
  // INSTALL
}

export {
  getSupport,
  Support,
  getDevice,
  Device,
  Utils,
  Dom7,
  Component,
  Framework7Parameters,
  Framework7Plugin,
  RouterModule as Router,
  Store,
  StoreParameters,
  createStore,
};
// EXPORT_COMPONENTS
export default Framework7;
