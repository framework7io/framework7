import { Module } from './modules/module';
import { VNode } from './vnode';
import { DOMAPI } from './htmldomapi';
export { h } from './h';
export { thunk } from './thunk';
export declare function init(modules: Array<Partial<Module>>, domApi?: DOMAPI): (oldVnode: Element | VNode, vnode: VNode) => VNode;
