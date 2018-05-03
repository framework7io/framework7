import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const NavbarProps = Utils.extend({
  backLink: [
    Boolean,
    String
  ],
  backLinkUrl: String,
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
  }
}, Mixins.colorProps);
class F7Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const self = this;
    const {backLink, backLinkUrl, sliding, title, subtitle, inner} = self.props;
    let innerEl;
    let leftEl;
    let titleEl;
    if (inner) {
      if (backLink) {
        leftEl = React.createElement(F7NavLeft, {
          backLink: backLink,
          backLinkUrl: backLinkUrl,
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
        ref: 'inner',
        className: Utils.classNames('navbar-inner', { sliding })
      }, leftEl, titleEl, this.slots['default']);
    }
    return React.createElement('div', {
      ref: 'el',
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, this.slots['before-inner'], innerEl, this.slots['after-inner']);
  }
  componentDidUpdate() {
    const self = this;
    if (!self.$f7)
      return;
    const el = self.refs.el;
    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.refs.inner) {
      self.$f7.navbar.size(self.refs.inner);
    }
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      navbar: true,
      'navbar-hidden': self.props.hidden,
      'no-shadow': self.props.noShadow,
      'no-hairline': self.props.noHairline
    }, Mixins.colorClasses(self));
  }
  hide(animate) {
    const self = this;
    if (!self.$f7)
      return;
    self.$f7.navbar.hide(self.refs.el, animate);
  }
  show(animate) {
    const self = this;
    if (!self.$f7)
      return;
    self.$f7.navbar.show(self.refs.el, animate);
  }
  size() {
    const self = this;
    if (!self.$f7)
      return;
    self.$f7.navbar.size(self.refs.el);
  }
  onBackClick(e) {
    this.dispatchEvent('back-click backClick click:back clickBack', e);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7Navbar, NavbarProps);
export default F7Navbar;