import Template7 from 'template7';
import Dom7 from 'dom7';
// IMPORT_BASE

import request from './types/utils/request';
import { getSupport, Support } from './types/utils/get-support';
import { getDevice, Device } from './types/utils/get-device';
import { Utils } from './types/utils/utils';

// IMPORT_MODULES
import { ComponentClass as Component, ComponentOptions } from './types/modules/component/component';

// IMPORT_COMPONENTS

declare module './types/components/app/app-class' {
  // INSTALL
}

export {
  request,
  getSupport,
  Support,
  getDevice,
  Device,
  Utils,
  Template7,
  Dom7,
  Component,
  ComponentOptions,
};
// EXPORT_COMPONENTS
export default Framework7;
