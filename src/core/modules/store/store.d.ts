import { Framework7Plugin } from '../app/app-class';

interface StoreGetterValue {
  value: any;
}
export interface StoreObject {
  state: any;
  get: (name: string, onUpdated: (value: any) => any) => StoreGetterValue;
  action: (name: string, data: any) => Promise<any>;
}
export interface StoreParameters {
  state: object;
  actions?: object;
  getters?: object;
}

export interface createStore {
  (storeParameters: StoreParameters): StoreObject;
}

export namespace Store {
  interface AppMethods {
    /** Create new store */
    createStore: (storeParameters: StoreParameters) => StoreObject;
  }
  interface AppParams {
    /** Object with store parameters */
    store?: StoreParameters | undefined;
  }
}
declare const StoreModule: Framework7Plugin;

export default StoreModule;
