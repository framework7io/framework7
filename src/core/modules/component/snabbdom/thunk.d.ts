import { VNode, VNodeData } from './vnode.js';
export interface ThunkData extends VNodeData {
  fn: () => VNode;
  args: Array<any>;
}
export interface Thunk extends VNode {
  data: ThunkData;
}
export interface ThunkFn {
  (sel: string, fn: Function, args: Array<any>): Thunk;
  (sel: string, key: any, fn: Function, args: Array<any>): Thunk;
}
export declare const thunk: ThunkFn;
export default thunk;
