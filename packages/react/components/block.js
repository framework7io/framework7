import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Block extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onTabShow', 'onTabHide']);
    })();
  }

  onTabShow(event) {
    this.dispatchEvent('tabShow tab:show', event);
  }

  onTabHide(event) {
    this.dispatchEvent('tabHide tab:hide', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      inset,
      strong,
      accordionList,
      tabletInset,
      tabs,
      tab,
      tabActive,
      noHairlines,
      noHairlinesIos,
      noHairlinesMd,
      noHairlinesAurora,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'block', {
      inset,
      'block-strong': strong,
      'accordion-list': accordionList,
      'tablet-inset': tabletInset,
      tabs,
      tab,
      'tab-active': tabActive,
      'no-hairlines': noHairlines,
      'no-hairlines-md': noHairlinesMd,
      'no-hairlines-ios': noHairlinesIos,
      'no-hairlines-aurora': noHairlinesAurora
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      }
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const el = this.refs.el;
    if (!el) return;
    el.removeEventListener('tab:show', this.onTabShow);
    el.removeEventListener('tab:hide', this.onTabHide);
  }

  componentDidMount() {
    const el = this.refs.el;
    if (!el) return;
    el.addEventListener('tab:show', this.onTabShow);
    el.addEventListener('tab:hide', this.onTabHide);
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

__reactComponentSetProps(F7Block, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  inset: Boolean,
  tabletInset: Boolean,
  strong: Boolean,
  tabs: Boolean,
  tab: Boolean,
  tabActive: Boolean,
  accordionList: Boolean,
  noHairlines: Boolean,
  noHairlinesMd: Boolean,
  noHairlinesIos: Boolean,
  noHairlinesAurora: Boolean
}, Mixins.colorProps));

F7Block.displayName = 'f7-block';
export default F7Block;