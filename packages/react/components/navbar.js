import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  hide(animate) {
    const self = this;
    if (!self.$f7) return;
    self.$f7.navbar.hide(self.refs.el, animate);
  }

  show(animate) {
    const self = this;
    if (!self.$f7) return;
    self.$f7.navbar.show(self.refs.el, animate);
  }

  size() {
    const self = this;
    if (!self.$f7) return;
    self.$f7.navbar.size(self.refs.el);
  }

  onBackClick(event) {
    this.dispatchEvent('back-click backClick click:back clickBack', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      sliding,
      title,
      subtitle,
      inner,
      innerClass,
      innerClassName,
      className,
      id,
      style,
      hidden,
      noShadow,
      noHairline
    } = props;
    let innerEl;
    let leftEl;
    let titleEl;

    if (inner) {
      if (backLink) {
        leftEl = React.createElement(F7NavLeft, {
          backLink: backLink,
          backLinkUrl: backLinkUrl,
          backLinkForce: backLinkForce,
          onBackClick: self.onBackClick.bind(self)
        });
      }

      if (title || subtitle) {
        titleEl = React.createElement(F7NavTitle, {
          title: title,
          subtitle: subtitle
        });
      }

      innerEl = React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['inner'] = __reactNode;
        },
        className: Utils.classNames('navbar-inner', innerClass, innerClassName, {
          sliding
        })
      }, leftEl, titleEl, this.slots['default']);
    }

    const classes = Utils.classNames(className, 'navbar', {
      'navbar-hidden': hidden,
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
    }, this.slots['before-inner'], innerEl, this.slots['after-inner']);
  }

  componentDidUpdate() {
    const self = this;
    if (!self.$f7) return;
    const el = self.refs.el;

    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.refs.inner) {
      self.$f7.navbar.size(self.refs.inner);
    }
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Navbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  backLink: [Boolean, String],
  backLinkUrl: String,
  backLinkForce: Boolean,
  sliding: {
    type: Boolean,
    default: true
  },
  title: String,
  subtitle: String,
  hidden: Boolean,
  noShadow: Boolean,
  noHairline: Boolean,
  inner: {
    type: Boolean,
    default: true
  },
  innerClass: String,
  innerClassName: String
}, Mixins.colorProps));

F7Navbar.displayName = 'f7-navbar';
export default F7Navbar;