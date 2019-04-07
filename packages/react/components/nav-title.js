import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7NavTitle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      title,
      subtitle,
      id,
      style,
      sliding,
      className
    } = props;
    let subtitleEl;

    if (subtitle) {
      subtitleEl = React.createElement('span', {
        className: 'subtitle'
      }, subtitle);
    }

    const classes = Utils.classNames(className, 'title', {
      sliding
    }, Mixins.colorClasses(props));
    let children;
    const slots = self.slots;

    if (slots && Object.keys(slots).length) {
      children = [];
      Object.keys(slots).forEach(key => {
        children.push(...slots[key]);
      });
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, children, !children && title, !children && subtitleEl);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7NavTitle, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  title: String,
  subtitle: String,
  sliding: Boolean
}, Mixins.colorProps));

F7NavTitle.displayName = 'f7-nav-title';
export default F7NavTitle;