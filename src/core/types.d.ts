import Template7 from 'template7';
import Dom7 from 'dom7';
// IMPORT_BASE

import request, {
  RequestError,
  RequestResponse,
  RequestParameters,
  RequestXHR,
} from './types/shared/request';
import { getSupport, Support } from './types/shared/get-support';
import { getDevice, Device } from './types/shared/get-device';
import { Utils } from './types/shared/utils';
import { Framework7Parameters, Framework7Plugin } from './types/components/app/app-class';

// IMPORT_MODULES
import { ComponentClass as Component, ComponentOptions } from './types/modules/component/component';

// IMPORT_COMPONENTS

declare module './types/components/app/app-class' {
  // INSTALL
}

export {
  request,
  RequestError,
  RequestResponse,
  RequestParameters,
  RequestXHR,
  getSupport,
  Support,
  getDevice,
  Device,
  Utils,
  Template7,
  Dom7,
  Component,
  ComponentOptions,
  Framework7Parameters,
  Framework7Plugin,
  RouterModule as Router,
};
// EXPORT_COMPONENTS
export default Framework7;
