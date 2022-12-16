import Framework7, { Framework7Plugin } from 'framework7/types';
import { Store } from 'framework7/types';

// IMPORT_COMPONENTS

export interface Framework7Theme {
  ios: boolean;
  md: boolean;
}

/** Object with boolean properties with information about currently used theme (`ios` and `md`) */
declare const theme: Framework7Theme;

/** Main Framework7's initialized instance. It allows you to use any of Framework7 APIs */
declare const f7: Framework7;

/** Callback function that will be executed when Framework7 fully intialized. Useful to use in components when you need to access Framework7 API and to be sure it is ready. So it is safe to put all Framework7 related logic into this callback. As an argument it receives initialized Framework7 instance */
declare const f7ready: (callback: (f7: Framework7) => void) => void;

declare const Framework7Vue: Framework7Plugin;

interface useStore {
  (store: Store, getter: string): any;
  (getter: string): any;
}

declare const useStore: useStore;

// EXPORT_COMPONENTS
export { f7, f7ready, theme, useStore };
export default Framework7Vue;
