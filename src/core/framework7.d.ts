import Dom7 from 'dom7';
// IMPORT_BASE

import request from './types/shared/request';
import { getSupport } from './types/shared/get-support';
import { getDevice } from './types/shared/get-device';
import { Utils } from './types/shared/utils';

// IMPORT_MODULES
import { ComponentFunction as Component } from './types/modules/component/component';

// IMPORT_COMPONENTS

declare module './types/components/app/app-class' {
  // INSTALL
}

declare const utils: Utils;

export { request, getSupport, getDevice, utils, Dom7, Component };
export default Framework7;
