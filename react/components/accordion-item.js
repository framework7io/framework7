import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentEl from '../runtime-helpers/react-component-el.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const AccordionItemProps = Utils.extend({ opened: Boolean }, Mixins.colorProps);
class F7AccordionItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  componentDidMount() {
    const self = this;
    const el = self.el;
    if (!el)
      return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('accordion:open', self.onOpenBound);
    el.addEventListener('accordion:opened', self.onOpenedBound);
    el.addEventListener('accordion:close', self.onCloseBound);
    el.addEventListener('accordion:closed', self.onClosedBound);
  }
  componentWillUnmount() {
    const self = this;
    const el = self.el;
    if (!el)
      return;
    el.removeEventListener('accordion:open', self.onOpenBound);
    el.removeEventListener('accordion:opened', self.onOpenedBound);
    el.removeEventListener('accordion:close', self.onCloseBound);
    el.removeEventListener('accordion:closed', self.onClosedBound);
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
      'accordion-item': true,
      'accordion-item-opened': self.props.opened
    }, Mixins.colorClasses(self));
  }
  onOpen(event) {
    this.dispatchEvent('accordionOpen accordion:open', event);
  }
  onOpened(event) {
    this.dispatchEvent('accordionOpened accordion:opened', event);
  }
  onClose(event) {
    this.dispatchEvent('accordionClose accordion:close', event);
  }
  onClosed(event) {
    this.dispatchEvent('accordionClosed accordion:closed', event);
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
__reactComponentSetProps(F7AccordionItem, AccordionItemProps);
export default F7AccordionItem;