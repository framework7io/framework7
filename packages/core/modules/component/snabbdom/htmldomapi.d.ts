export interface DOMAPI {
    createElement: (tagName: any) => HTMLElement;
    createElementNS: (namespaceURI: string, qualifiedName: string) => Element;
    createTextNode: (text: string) => Text;
    createComment: (text: string) => Comment;
    insertBefore: (parentNode: Node, newNode: Node, referenceNode: Node | null) => void;
    removeChild: (node: Node, child: Node) => void;
    appendChild: (node: Node, child: Node) => void;
    parentNode: (node: Node) => Node;
    nextSibling: (node: Node) => Node;
    tagName: (elm: Element) => string;
    setTextContent: (node: Node, text: string | null) => void;
    getTextContent: (node: Node) => string | null;
    isElement: (node: Node) => node is Element;
    isText: (node: Node) => node is Text;
    isComment: (node: Node) => node is Comment;
}
export declare const htmlDomApi: DOMAPI;
export default htmlDomApi;
