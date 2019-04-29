import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7NavLeft from './nav-left';
import F7NavTitle from './nav-title';
import F7NavRight from './nav-right';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse']);
    })();
  }

  onHide(navbarEl) {
    const self = this;
    const {
      el,
      innerEl
    } = self.refs;

    if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
      self.dispatchEvent('navbar:hide navbarHide');
    }
  }

  onShow(navbarEl) {
    const self = this;
    const {
      el,
      innerEl
    } = self.refs;

    if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
      self.dispatchEvent('navbar:show navbarShow');
    }
  }

  onExpand(navbarEl) {
    const self = this;
    const {
      el,
      innerEl
    } = self.refs;

    if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
      self.dispatchEvent('navbar:expand navbarExpand');
    }
  }

  onCollapse(navbarEl) {
    const self = this;
    const {
      el,
      innerEl
    } = self.refs;

    if (navbarEl === el || innerEl && innerEl.parentNode === navbarEl) {
      self.dispatchEvent('navbar:collapse navbarCollapse');
    }
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
      backLinkShowText,
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
      noHairline,
      large,
      titleLarge
    } = props;
    let innerEl;
    let leftEl;
    let titleEl;
    let rightEl;
    let titleLargeEl;
    const addLeftTitleClass = self.$theme && self.$theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
    const addCenterTitleClass = self.$theme && self.$theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || self.$theme && self.$theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
    const slots = self.slots;
    const classes = Utils.classNames(className, 'navbar', {
      'navbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
      'navbar-large': large
    }, Mixins.colorClasses(props));

    if (!inner) {
      return React.createElement('div', {
        ref: __reactNode => {
          this.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: classes
      }, this.slots['default']);
    }

    if (backLink || slots['nav-left']) {
      leftEl = React.createElement(F7NavLeft, {
        backLink: backLink,
        backLinkUrl: backLinkUrl,
        backLinkForce: backLinkForce,
        backLinkShowText: backLinkShowText,
        onBackClick: self.onBackClick
      }, slots['nav-left']);
    }

    if (title || subtitle || slots.title) {
      titleEl = React.createElement(F7NavTitle, {
        title: title,
        subtitle: subtitle
      }, slots.title);
    }

    if (slots['nav-right']) {
      rightEl = React.createElement(F7NavRight, null, slots['nav-right']);
    }

    let largeTitle = titleLarge;
    if (!largeTitle && large && title) largeTitle = title;

    if (largeTitle) {
      titleLargeEl = React.createElement('div', {
        className: 'title-large'
      }, React.createElement('div', {
        className: 'title-large-text'
      }, largeTitle));
    }

    innerEl = React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['innerEl'] = __reactNode;
      },
      className: Utils.classNames('navbar-inner', innerClass, innerClassName, {
        sliding,
        'navbar-inner-left-title': addLeftTitleClass,
        'navbar-inner-centered-title': addCenterTitleClass,
        'navbar-inner-large': large
      })
    }, leftEl, titleEl, rightEl, titleLargeEl, this.slots['default']);
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['before-inner'], innerEl, this.slots['after-inner']);
  }

  componentWillUnmount() {
    const self = this;
    if (!self.props.inner) return;
    const {
      innerEl
    } = self.refs;
    if (!innerEl) return;
    const f7 = self.$f7;
    if (!f7) return;
    f7.off('navbarShow', self.onShow);
    f7.off('navbarHide', self.onHide);
    f7.off('navbarCollapse', self.onCollapse);
    f7.off('navbarExpand', self.onExpand);
  }

  componentDidUpdate() {
    const self = this;
    if (!self.$f7) return;
    const el = self.refs.el;

    if (el && el.children && el.children.length) {
      self.$f7.navbar.size(el);
    } else if (self.refs.innerEl) {
      self.$f7.navbar.size(self.refs.innerEl);
    }
  }

  componentDidMount() {
    const self = this;
    const {
      innerEl
    } = self.refs;
    if (!innerEl) return;
    self.$f7ready(f7 => {
      f7.on('navbarShow', self.onShow);
      f7.on('navbarHide', self.onHide);
      f7.on('navbarCollapse', self.onCollapse);
      f7.on('navbarExpand', self.onExpand);
    });
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
  backLinkShowText: {
    type: Boolean,
    default: undefined
  },
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
  innerClassName: String,
  large: Boolean,
  titleLarge: String
}, Mixins.colorProps));

F7Navbar.displayName = 'f7-navbar';
export default F7Navbar;