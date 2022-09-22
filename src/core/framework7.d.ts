import Dom7 from 'dom7';
// IMPORT_BASE

import { getSupport } from './shared/get-support.js';
import { getDevice } from './shared/get-device.js';
import { Utils } from './shared/utils.js';

// IMPORT_MODULES
import { ComponentFunction as Component } from './modules/component/component.js';
import { StoreObject as Store, StoreParameters, createStore } from './modules/store/store.js';

// IMPORT_COMPONENTS

declare module './components/app/app-class.js' {
  // INSTALL
}

declare const utils: Utils;

export { getSupport, getDevice, utils, Dom7, Component, Store, StoreParameters, createStore };
export default Framework7;
