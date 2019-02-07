import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Fab extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick']);
    })();
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
      text,
      target
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
          const tag = child.type && (child.type.displayName || child.type.name);
          if (tag === 'F7FabButtons' || tag === 'f7-fab-buttons') isRoot = true;
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
        ref: __reactNode => {
          this.__reactRefs['linkEl'] = __reactNode;
        },
        target: target,
        href: href,
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

  componentWillUnmount() {
    const self = this;

    if (self.refs.linkEl) {
      self.refs.linkEl.removeEventListener('click', self.onClick);
    }

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

  componentDidMount() {
    const self = this;

    if (self.refs.linkEl) {
      self.refs.linkEl.addEventListener('click', self.onClick);
    }

    const {
      tooltip
    } = self.props;
    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: self.refs.el,
        text: tooltip
      });
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

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });
  }

}

__reactComponentSetProps(F7Fab, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  morphTo: String,
  href: [Boolean, String],
  target: String,
  text: String,
  position: {
    type: String,
    default: 'right-bottom'
  },
  tooltip: String
}, Mixins.colorProps));

F7Fab.displayName = 'f7-fab';
export default F7Fab;