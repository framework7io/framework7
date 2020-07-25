import Template7 from 'template7';
import Dom7 from 'dom7';
// IMPORT_BASE

import request from './types/utils/request';
import { getSupport } from './types/utils/get-support';
import { getDevice } from './types/utils/get-device';
import { Utils } from './types/utils/utils';

// IMPORT_MODULES
import { ComponentClass as Component, ComponentOptions } from './types/modules/component/component';

// IMPORT_COMPONENTS

declare module './types/components/app/app-class' {
  // INSTALL
}

declare const utils: Utils;

export { request, getSupport, getDevice, utils, Template7, Dom7, Component };
export default Framework7;
