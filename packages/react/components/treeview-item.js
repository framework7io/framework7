import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7TreeviewItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick', 'onOpen', 'onClose', 'onLoadChildren']);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  onOpen(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('treeview:open treeviewOpen', el);
  }

  onClose(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('treeview:close treeviewClose', el);
  }

  onLoadChildren(el, done) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('treeview:loadchildren treeviewLoadChildren', el, done);
  }

  get itemRootAttrs() {
    const self = this;
    const props = self.props;
    const {
      link
    } = props;
    let href = link;
    if (link === true) href = '#';
    if (link === false) href = undefined;
    return Utils.extend({
      href
    }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
  }

  get itemRootClasses() {
    const self = this;
    const props = self.props;
    const {
      selectable,
      selected,
      itemToggle
    } = props;
    return Utils.classNames('treeview-item-root', {
      'treeview-item-selectable': selectable,
      'treeview-item-selected': selected,
      'treeview-item-toggle': itemToggle
    }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      className,
      opened,
      loadChildren
    } = props;
    return Utils.classNames(className, 'treeview-item', {
      'treeview-item-opened': opened,
      'treeview-load-children': loadChildren
    }, Mixins.colorClasses(props));
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      toggle,
      label,
      icon,
      iconMaterial,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      iconSize,
      iconColor,
      link
    } = props;
    const slots = self.slots;
    const hasChildren = slots.default && slots.default.length || slots.children && slots.children.length || slots['children-start'] && slots['children-start'].length;
    const needToggle = typeof toggle === 'undefined' ? hasChildren : toggle;
    let iconEl;

    if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = React.createElement(F7Icon, {
        material: iconMaterial,
        f7: iconF7,
        icon: icon,
        md: iconMd,
        ios: iconIos,
        aurora: iconAurora,
        color: iconColor,
        size: iconSize
      });
    }

    const TreeviewRootTag = link || link === '' ? 'a' : 'div';
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: self.classes
    }, React.createElement(TreeviewRootTag, Object.assign({
      ref: __reactNode => {
        this.__reactRefs['rootEl'] = __reactNode;
      },
      className: self.itemRootClasses
    }, self.itemRootAttrs), this.slots['root-start'], needToggle && React.createElement('div', {
      className: 'treeview-toggle'
    }), React.createElement('div', {
      className: 'treeview-item-content'
    }, this.slots['content-start'], iconEl, this.slots['media'], React.createElement('div', {
      className: 'treeview-item-label'
    }, this.slots['label-start'], label, this.slots['label']), this.slots['content'], this.slots['content-end']), this.slots['root'], this.slots['root-end']), hasChildren && React.createElement('div', {
      className: 'treeview-item-children'
    }, this.slots['children-start'], this.slots['default'], this.slots['children']));
  }

  componentWillUnmount() {
    const self = this;
    const {
      el,
      rootEl
    } = self.refs;
    rootEl.removeEventListener('click', self.onClick);
    if (!el || self.$f7) return;
    self.$f7.off('treeviewOpen', self.onOpen);
    self.$f7.off('treeviewClose', self.onClose);
    self.$f7.off('treeviewLoadChildren', self.onLoadChildren);
    self.eventTargetEl = null;
    delete self.eventTargetEl;
  }

  componentDidMount() {
    const self = this;
    const {
      el,
      rootEl
    } = self.refs;
    rootEl.addEventListener('click', self.onClick);
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready(f7 => {
      f7.on('treeviewOpen', self.onOpen);
      f7.on('treeviewClose', self.onClose);
      f7.on('treeviewLoadChildren', self.onLoadChildren);
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

__reactComponentSetProps(F7TreeviewItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  toggle: {
    type: Boolean,
    default: undefined
  },
  itemToggle: Boolean,
  selectable: Boolean,
  selected: Boolean,
  opened: Boolean,
  label: String,
  loadChildren: Boolean,
  link: {
    type: [Boolean, String],
    default: undefined
  }
}, Mixins.colorProps, {}, Mixins.linkActionsProps, {}, Mixins.linkRouterProps, {}, Mixins.linkIconProps));

F7TreeviewItem.displayName = 'f7-treeview-item';
export default F7TreeviewItem;