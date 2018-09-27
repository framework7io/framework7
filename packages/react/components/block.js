import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentEl from '../runtime-helpers/react-component-el.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Block extends React.Component {
  constructor(props, context) {
    super(props, context);
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
      'no-hairlines-ios': noHairlinesIos
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const el = this.el;
    if (!el) return;
    el.removeEventListener('tab:show', this.onTabShowBound);
    el.removeEventListener('tab:hide', this.onTabHideBound);
  }

  componentDidMount() {
    const el = this.el;
    if (!el) return;
    this.onTabShowBound = this.onTabShow.bind(this);
    this.onTabHideBound = this.onTabHide.bind(this);
    el.addEventListener('tab:show', this.onTabShowBound);
    el.addEventListener('tab:hide', this.onTabHideBound);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  get el() {
    return __reactComponentEl(this);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

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
  noHairlinesIos: Boolean
}, Mixins.colorProps));

F7Block.displayName = 'f7-block';
export default F7Block;