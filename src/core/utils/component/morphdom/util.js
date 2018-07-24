let range; // Create a range object for efficently rendering strings to elements.
const NS_XHTML = 'http://www.w3.org/1999/xhtml';

const doc = typeof document === 'undefined' ? undefined : document;

const testEl = doc
  ? doc.body || doc.createElement('div')
  : {};

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
let actualHasAttributeNS;

if (testEl.hasAttributeNS) {
  actualHasAttributeNS = (el, namespaceURI, name) => el.hasAttributeNS(namespaceURI, name);
} else if (testEl.hasAttribute) {
  actualHasAttributeNS = (el, namespaceURI, name) => el.hasAttribute(name);
} else {
  actualHasAttributeNS = (el, namespaceURI, name) => el.getAttributeNode(namespaceURI, name) != null;
}

const hasAttributeNS = actualHasAttributeNS;


function toElement(str) {
  if (!range && doc.createRange) {
    range = doc.createRange();
    range.selectNode(doc.body);
  }

  let fragment;
  if (range && range.createContextualFragment) {
    fragment = range.createContextualFragment(str);
  } else {
    fragment = doc.createElement('body');
    fragment.innerHTML = str;
  }
  return fragment.childNodes[0];
}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
  const fromNodeName = fromEl.nodeName;
  const toNodeName = toEl.nodeName;

  if (fromNodeName === toNodeName) {
    return true;
  }

  if (toEl.actualize
        && fromNodeName.charCodeAt(0) < 91 /* from tag name is upper case */
        && toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
    // If the target element is a virtual DOM node then we may need to normalize the tag name
    // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
    // are converted to upper case
    return fromNodeName === toNodeName.toUpperCase();
  }
  return false;
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
  return !namespaceURI || namespaceURI === NS_XHTML
    ? doc.createElement(name)
    : doc.createElementNS(namespaceURI, name);
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
  let curChild = fromEl.firstChild;
  while (curChild) {
    const nextChild = curChild.nextSibling;
    toEl.appendChild(curChild);
    curChild = nextChild;
  }
  return toEl;
}

export { doc, hasAttributeNS, toElement, compareNodeNames, createElementNS, moveChildren };
