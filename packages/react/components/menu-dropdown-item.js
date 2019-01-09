import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7MenuDropdownItem extends React.Component {
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
      target
    } = props;
    let hrefComputed = href;
    if (typeof hrefComputed === 'undefined' && link) hrefComputed = '#';
    return Utils.extend({
      href: hrefComputed,
      target
    }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      link,
      href,
      text,
      divider,
      menuClose
    } = props;
    const isLink = link || href || href === '';
    const Tag = isLink ? 'a' : 'div';
    const classes = Utils.classNames({
      'menu-dropdown-link': isLink && !divider,
      'menu-dropdown-item': !isLink && !divider,
      'menu-dropdown-divider': divider
    }, className, Mixins.colorClasses(props), Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props), {
      'menu-close': typeof menuClose === 'undefined'
    });
    return React.createElement(Tag, Object.assign({
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      className: classes,
      id: id,
      style: style
    }, self.attrs), text, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('click', self.onClick);
    delete el.f7RouteProps;
  }

  componentDidUpdate() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const {
      routeProps
    } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('click', self.onClick);
    const {
      routeProps
    } = self.props;
    if (routeProps) el.f7RouteProps = routeProps;
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

__reactComponentSetProps(F7MenuDropdownItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  text: String,
  link: Boolean,
  href: String,
  target: String,
  divider: Boolean
}, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7MenuDropdownItem.displayName = 'f7-menu-dropdown-item';
export default F7MenuDropdownItem;