import { Module } from './module.js';
export declare type VNodeStyle = Record<string, string> & {
  delayed?: Record<string, string>;
  remove?: Record<string, string>;
};
export declare const styleModule: Module;
export default styleModule;
