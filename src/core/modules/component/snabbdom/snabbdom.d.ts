import { Module } from './modules/module.js';
import { VNode } from './vnode.js';
import { DOMAPI } from './htmldomapi.js';
export { h } from './h.js';
export { thunk } from './thunk.js';
export declare function init (modules: Array<Partial<Module>>, domApi?: DOMAPI): (oldVnode: Element | VNode, vnode: VNode) => VNode;
