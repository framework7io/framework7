import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentEl from '../runtime-helpers/react-component-el.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const BlockProps = Utils.extend({
  inset: Boolean,
  tabletInset: Boolean,
  strong: Boolean,
  tabs: Boolean,
  tab: Boolean,
  tabActive: Boolean,
  accordionList: Boolean,
  noHairlines: Boolean,
  noHairlinesMd: Boolean,
  noHairlinesIos: Boolean
}, Mixins.colorProps);
class F7Block extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    const el = this.el;
    if (!el)
      return;
    this.onTabShowBound = this.onTabShow.bind(this);
    this.onTabHideBound = this.onTabHide.bind(this);
    el.addEventListener('tab:show', this.onTabShowBound);
    el.addEventListener('tab:hide', this.onTabHideBound);
  }
  componentWillUnmount() {
    const el = this.el;
    if (!el)
      return;
    el.removeEventListener('tab:show', this.onTabShowBound);
    el.removeEventListener('tab:hide', this.onTabHideBound);
  }
  render() {
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, this.slots['default']);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      block: true,
      inset: self.props.inset,
      'block-strong': self.props.strong,
      'accordion-list': self.props.accordionList,
      'tablet-inset': self.props.tabletInset,
      tabs: self.props.tabs,
      tab: self.props.tab,
      'tab-active': self.props.tabActive,
      'no-hairlines': self.props.noHairlines,
      'no-hairlines-md': self.props.noHairlinesMd,
      'no-hairlines-ios': self.props.noHairlinesIos
    }, Mixins.colorClasses(self));
  }
  onTabShow(e) {
    this.dispatchEvent('tabShow tab:show', e);
  }
  onTabHide(e) {
    this.dispatchEvent('tabShow tab:hide', e);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  get el() {
    return __reactComponentEl(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7Block, BlockProps);
export default F7Block;