import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7ListButton extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick']);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  get attrs() {
    const self = this;
    const props = self.props;
    const {
      link,
      href,
      target,
      tabLink
    } = props;
    return Utils.extend({
      href: typeof link === 'boolean' && typeof href === 'boolean' ? '#' : link || href,
      target,
      'data-tab': Utils.isStringProp(tabLink) && tabLink
    }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      noFastclick,
      noFastClick,
      tabLink,
      tabLinkActive
    } = props;
    return Utils.classNames({
      'list-button': true,
      'tab-link': tabLink || tabLink === '',
      'tab-link-active': tabLinkActive,
      'no-fastclick': noFastclick || noFastClick
    }, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
  }

  render() {
    const self = this;
    const props = this.props;
    const {
      className,
      id,
      style,
      title,
      text
    } = props;
    return React.createElement('li', {
      id: id,
      style: style,
      className: className
    }, React.createElement('a', Object.assign({
      className: self.classes
    }, self.attrs, {
      ref: __reactNode => {
        this.__reactRefs['linkEl'] = __reactNode;
      }
    }), this.slots['default'], !this.slots.default && (title || text)));
  }

  componentWillUnmount() {
    const self = this;
    const linkEl = self.refs.linkEl;
    linkEl.removeEventListener('click', this.onClick);
    delete linkEl.f7RouteProps;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });

    const self = this;
    const linkEl = self.refs.linkEl;
    const {
      routeProps
    } = self.props;

    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }
  }

  componentDidMount() {
    const self = this;
    const linkEl = self.refs.linkEl;
    const {
      routeProps,
      tooltip
    } = self.props;

    if (routeProps) {
      linkEl.f7RouteProps = routeProps;
    }

    linkEl.addEventListener('click', self.onClick);
    self.$f7ready(f7 => {
      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: linkEl,
          text: tooltip
        });
      }
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

__reactComponentSetProps(F7ListButton, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  noFastclick: Boolean,
  noFastClick: Boolean,
  title: [String, Number],
  text: [String, Number],
  tabLink: [Boolean, String],
  tabLinkActive: Boolean,
  link: [Boolean, String],
  href: [Boolean, String],
  target: String,
  tooltip: String
}, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7ListButton.displayName = 'f7-list-button';
export default F7ListButton;