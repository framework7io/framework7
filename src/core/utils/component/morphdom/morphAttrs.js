import { hasAttributeNS } from './util';

export default function morphAttrs(fromNode, toNode) {
  let attrs = toNode.attributes;
  let attr;
  let attrName;
  let attrNamespaceURI;
  let attrValue;
  let fromValue;

  for (let i = attrs.length - 1; i >= 0; i -= 1) {
    attr = attrs[i];
    attrName = attr.name;
    attrNamespaceURI = attr.namespaceURI;
    attrValue = attr.value;

    if (attrNamespaceURI) {
      attrName = attr.localName || attrName;
      fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

      if (fromValue !== attrValue) {
        fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
      }
    } else {
      fromValue = fromNode.getAttribute(attrName);

      if (fromValue !== attrValue) {
        fromNode.setAttribute(attrName, attrValue);
      }
    }
  }

  // Remove any extra attributes found on the original DOM element that
  // weren't found on the target element.
  attrs = fromNode.attributes;

  for (let i = attrs.length - 1; i >= 0; i -= 1) {
    attr = attrs[i];
    if (attr.specified !== false) {
      attrName = attr.name;
      attrNamespaceURI = attr.namespaceURI;

      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;

        if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
          fromNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else if (!hasAttributeNS(toNode, null, attrName)) {
        fromNode.removeAttribute(attrName);
      }
    }
  }
}
