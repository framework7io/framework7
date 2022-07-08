import { VNode } from '../vnode.js';
export interface AttachData {
  [key: string]: any;
  [i: number]: any;
  placeholder?: any;
  real?: Node;
}
export declare function attachTo (target: Element, vnode: VNode): VNode;
export default attachTo;
