import Dom7 from 'dom7';
// IMPORT_BASE

import request from './shared/request';
import { getSupport } from './shared/get-support';
import { getDevice } from './shared/get-device';
import { Utils } from './shared/utils';

// IMPORT_MODULES
import { ComponentFunction as Component } from './modules/component/component';
import { StoreObject as Store, StoreParameters, createStore } from './modules/store/store';

// IMPORT_COMPONENTS

declare module './components/app/app-class' {
  // INSTALL
}

declare const utils: Utils;

export {
  request,
  getSupport,
  getDevice,
  utils,
  Dom7,
  Component,
  Store,
  StoreParameters,
  createStore,
};
export default Framework7;
