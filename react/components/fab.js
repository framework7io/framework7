import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const FabProps = Utils.extend({
  morphTo: String,
  href: [
    Boolean,
    String
  ],
  position: {
    type: String,
    default: 'right-bottom'
  }
}, Mixins.colorProps);
class F7Fab extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const {morphTo} = self.props;
    let href = self.props.href;
    if (href === true)
      href = '#';
    if (href === false)
      href = undefined;
    const linkChildren = [];
    const rootChildren = [];
    const {
      link: linkSlots,
      default: defaultSlots,
      root: rootSlots
    } = self.slots;
    if (defaultSlots) {
      for (let i = 0; i < defaultSlots.length; i += 1) {
        const child = defaultSlots[i];
        let isRoot;
        {
          const tag = child.type && child.type.name;
          if (tag === 'F7FabButtons')
            isRoot = true;
        }
        if (isRoot)
          rootChildren.push(child);
        else
          linkChildren.push(child);
      }
    }
    let linkEl;
    if (linkChildren.length || linkSlots.length) {
      linkEl = React.createElement('a', {
        href: href,
        onClick: self.onClick.bind(self),
        key: 'f7-fab-link'
      }, linkChildren, linkSlots);
    }
    return React.createElement('div', {
      id: self.props.id,
      style: self.props.style,
      className: self.classes,
      'data-morph-to': morphTo
    }, linkEl, rootChildren, rootSlots);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      fab: true,
      'fab-morph': self.morphTo,
      [`fab-${ self.props.position }`]: true
    }, Mixins.colorClasses(self));
  }
  onClick(event) {
    const self = this;
    self.dispatchEvent('click', event);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7Fab, FabProps);
export default F7Fab;