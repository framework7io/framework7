import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Appbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      inner,
      innerClass,
      innerClassName,
      className,
      id,
      style,
      noShadow,
      noHairline
    } = props;
    let innerEl;

    if (inner) {
      innerEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['inner'] = __reactNode;
        },
        className: Utils.classNames('appbar-inner', innerClass, innerClassName)
      }, this.slots['default']);
    }

    const classes = Utils.classNames(className, 'appbar', {
      'no-shadow': noShadow,
      'no-hairline': noHairline
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['before-inner'], innerEl || self.slots.default, this.slots['after-inner']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Appbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noShadow: Boolean,
  noHairline: Boolean,
  inner: {
    type: Boolean,
    default: true
  },
  innerClass: String,
  innerClassName: String
}, Mixins.colorProps));

F7Appbar.displayName = 'f7-appbar';
export default F7Appbar;