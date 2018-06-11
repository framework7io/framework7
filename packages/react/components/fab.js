import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Fab extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  onClick(event) {
    const self = this;
    self.dispatchEvent('click', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      morphTo,
      href: initialHref,
      position,
      text
    } = props;
    let href = initialHref;
    if (href === true) href = '#';
    if (href === false) href = undefined;
    const linkChildren = [];
    const rootChildren = [];
    const {
      link: linkSlots,
      default: defaultSlots,
      root: rootSlots,
      text: textSlots
    } = self.slots;

    if (defaultSlots) {
      for (let i = 0; i < defaultSlots.length; i += 1) {
        const child = defaultSlots[i];
        let isRoot;
        {
          const tag = child.type && child.type.name;
          if (tag === 'F7FabButtons') isRoot = true;
        }
        if (isRoot) rootChildren.push(child);else linkChildren.push(child);
      }
    }

    let textEl;

    if (text || textSlots && textSlots.length) {
      textEl = React.createElement('div', {
        className: 'fab-text'
      }, text || textSlots);
    }

    let linkEl;

    if (linkChildren.length || linkSlots && linkSlots.length) {
      linkEl = React.createElement('a', {
        href: href,
        onClick: self.onClick.bind(self),
        key: 'f7-fab-link'
      }, linkChildren, textEl, linkSlots);
    }

    const classes = Utils.classNames(className, 'fab', `fab-${position}`, {
      'fab-morph': morphTo,
      'fab-extended': typeof textEl !== 'undefined'
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes,
      'data-morph-to': morphTo
    }, linkEl, rootChildren, rootSlots);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

}

__reactComponentSetProps(F7Fab, Object.assign({
  id: [String, Number],
  morphTo: String,
  href: [Boolean, String],
  text: String,
  position: {
    type: String,
    default: 'right-bottom'
  }
}, Mixins.colorProps));

export default F7Fab;