import { Module } from './module.js';
export declare type On = {
  [N in keyof HTMLElementEventMap]?: (ev: HTMLElementEventMap[N]) => void;
} & {
  [event: string]: EventListener;
};
export declare const eventListenersModule: Module;
export default eventListenersModule;
