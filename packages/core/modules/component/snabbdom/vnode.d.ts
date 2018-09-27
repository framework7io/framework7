import { Hooks } from './hooks';
import { AttachData } from './helpers/attachto';
import { VNodeStyle } from './modules/style';
import { On } from './modules/eventlisteners';
import { Attrs } from './modules/attributes';
import { Classes } from './modules/class';
import { Props } from './modules/props';
import { Dataset } from './modules/dataset';
import { Hero } from './modules/hero';
export declare type Key = string | number;
export interface VNode {
    sel: string | undefined;
    data: VNodeData | undefined;
    children: Array<VNode | string> | undefined;
    elm: Node | undefined;
    text: string | undefined;
    key: Key | undefined;
}
export interface VNodeData {
    props?: Props;
    attrs?: Attrs;
    class?: Classes;
    style?: VNodeStyle;
    dataset?: Dataset;
    on?: On;
    hero?: Hero;
    attachData?: AttachData;
    hook?: Hooks;
    key?: Key;
    ns?: string;
    fn?: () => VNode;
    args?: Array<any>;
    [key: string]: any;
}
export declare function vnode(sel: string | undefined, data: any | undefined, children: Array<VNode | string> | undefined, text: string | undefined, elm: Element | Text | undefined): VNode;
export default vnode;
