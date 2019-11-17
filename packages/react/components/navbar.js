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

    this.state = (() => {
      const self = this;
      const $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(() => {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null,
        routerPositionClass: '',
        largeCollapsed: false
      };
    })();

    (() => {
      Utils.bindMethods(this, ['onBackClick', 'onHide', 'onShow', 'onExpand', 'onCollapse', 'onNavbarPosition']);
    })();
  }

  onHide(navbarEl) {
    if (this.eventTargetEl !== navbarEl) return;
    this.dispatchEvent('navbar:hide navbarHide');
  }

  onShow(navbarEl) {
    if (this.eventTargetEl !== navbarEl) return;
    this.dispatchEvent('navbar:show navbarShow');
  }

  onExpand(navbarEl) {
    if (this.eventTargetEl !== navbarEl) return;
    this.setState({
      largeCollapsed: false
    });
    this.dispatchEvent('navbar:expand navbarExpand');
  }

  onCollapse(navbarEl) {
    if (this.eventTargetEl !== navbarEl) return;
    this.setState({
      largeCollapsed: true
    });
    this.dispatchEvent('navbar:collapse navbarCollapse');
  }

  onNavbarPosition(navbarEl, position) {
    if (this.eventTargetEl !== navbarEl) return;
    this.setState({
      routerPositionClass: `navbar-${position}`
    });
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
      innerClass,
      innerClassName,
      className,
      id,
      style,
      hidden,
      noShadow,
      noHairline,
      large,
      largeTransparent,
      titleLarge
    } = props;
    const {
      _theme: theme,
      routerPositionClass,
      largeCollapsed
    } = self.state;
    let leftEl;
    let titleEl;
    let rightEl;
    let titleLargeEl;
    const addLeftTitleClass = theme && theme.ios && self.$f7 && !self.$f7.params.navbar.iosCenterTitle;
    const addCenterTitleClass = theme && theme.md && self.$f7 && self.$f7.params.navbar.mdCenterTitle || theme && theme.aurora && self.$f7 && self.$f7.params.navbar.auroraCenterTitle;
    const slots = self.slots;
    const classes = Utils.classNames(className, 'navbar', routerPositionClass, {
      'navbar-hidden': hidden,
      'navbar-large': large,
      'navbar-large-transparent': largeTransparent,
      'navbar-large-collapsed': large && largeCollapsed
    }, Mixins.colorClasses(props));

    if (backLink || slots['nav-left'] || slots.left) {
      leftEl = React.createElement(F7NavLeft, {
        backLink: backLink,
        backLinkUrl: backLinkUrl,
        backLinkForce: backLinkForce,
        backLinkShowText: backLinkShowText,
        onBackClick: self.onBackClick
      }, slots['nav-left'], slots.left);
    }

    if (title || subtitle || slots.title) {
      titleEl = React.createElement(F7NavTitle, {
        title: title,
        subtitle: subtitle
      }, slots.title);
    }

    if (slots['nav-right'] || slots.right) {
      rightEl = React.createElement(F7NavRight, null, slots['nav-right'], slots.right);
    }

    let largeTitle = titleLarge;
    if (!largeTitle && large && title) largeTitle = title;

    if (largeTitle || slots['title-large']) {
      titleLargeEl = React.createElement('div', {
        className: 'title-large'
      }, React.createElement('div', {
        className: 'title-large-text'
      }, largeTitle || '', this.slots['title-large']));
    }

    const innerEl = React.createElement('div', {
      className: Utils.classNames('navbar-inner', innerClass, innerClassName, {
        sliding,
        'no-shadow': noShadow,
        'no-hairline': noHairline,
        'navbar-inner-left-title': addLeftTitleClass,
        'navbar-inner-centered-title': addCenterTitleClass
      })
    }, leftEl, titleEl, rightEl, titleLargeEl, this.slots['default']);
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, React.createElement('div', {
      className: 'navbar-bg'
    }), this.slots['before-inner'], innerEl, this.slots['after-inner']);
  }

  componentWillUnmount() {
    const self = this;
    const {
      el
    } = self.refs;
    if (!el || !self.$f7) return;
    const f7 = self.$f7;
    f7.off('navbarShow', self.onShow);
    f7.off('navbarHide', self.onHide);
    f7.off('navbarCollapse', self.onCollapse);
    f7.off('navbarExpand', self.onExpand);
    f7.off('navbarPosition', self.onNavbarPosition);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  }

  componentDidUpdate() {
    const self = this;
    if (!self.$f7) return;
    const el = self.refs.el;
    self.$f7.navbar.size(el);
  }

  componentDidMount() {
    const self = this;
    const {
      el
    } = self.refs;
    if (!el) return;
    self.$f7ready(f7 => {
      self.eventTargetEl = el;
      f7.on('navbarShow', self.onShow);
      f7.on('navbarHide', self.onHide);
      f7.on('navbarCollapse', self.onCollapse);
      f7.on('navbarExpand', self.onExpand);
      f7.on('navbarPosition', self.onNavbarPosition);
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
  innerClass: String,
  innerClassName: String,
  large: Boolean,
  largeTransparent: Boolean,
  titleLarge: String
}, Mixins.colorProps));

F7Navbar.displayName = 'f7-navbar';
export default F7Navbar;