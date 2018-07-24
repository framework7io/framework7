import { hasAttributeNS } from './util';

function syncBooleanAttrProp(fromEl, toEl, name) {
  if (fromEl[name] !== toEl[name]) {
    fromEl[name] = toEl[name];
    if (fromEl[name]) {
      fromEl.setAttribute(name, '');
    } else {
      fromEl.removeAttribute(name);
    }
  }
}

export default {
  /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
  OPTION(fromEl, toEl) {
    syncBooleanAttrProp(fromEl, toEl, 'selected');
  },
  /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
  INPUT(fromEl, toEl) {
    syncBooleanAttrProp(fromEl, toEl, 'checked');
    syncBooleanAttrProp(fromEl, toEl, 'disabled');

    if (fromEl.value !== toEl.value) {
      fromEl.value = toEl.value;
    }

    if (!hasAttributeNS(toEl, null, 'value')) {
      fromEl.removeAttribute('value');
    }
  },

  TEXTAREA(fromEl, toEl) {
    const newValue = toEl.value;
    if (fromEl.value !== newValue) {
      fromEl.value = newValue;
    }

    const firstChild = fromEl.firstChild;
    if (firstChild) {
      // Needed for IE. Apparently IE sets the placeholder as the
      // node value and vise versa. This ignores an empty update.
      const oldValue = firstChild.nodeValue;

      if (oldValue === newValue || (!newValue && oldValue === fromEl.placeholder)) {
        return;
      }

      firstChild.nodeValue = newValue;
    }
  },
  SELECT(fromEl, toEl) {
    if (!hasAttributeNS(toEl, null, 'multiple')) {
      let i = 0;
      let curChild = toEl.firstChild;
      while (curChild) {
        const nodeName = curChild.nodeName;
        if (nodeName && nodeName.toUpperCase() === 'OPTION') {
          if (hasAttributeNS(curChild, null, 'selected')) {
            break;
          }
          i += 1;
        }
        curChild = curChild.nextSibling;
      }

      fromEl.selectedIndex = i;
    }
  },
};
