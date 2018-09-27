import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentEl from '../runtime-helpers/react-component-el.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7AccordionItem extends React.Component {
  constructor(props, context) {
    super(props, context);
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

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      opened
    } = props;
    const classes = Utils.classNames(className, 'accordion-item', {
      'accordion-item-opened': opened
    }, Mixins.colorClasses(props));
    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    const el = self.el;
    if (!el) return;
    el.removeEventListener('accordion:open', self.onOpenBound);
    el.removeEventListener('accordion:opened', self.onOpenedBound);
    el.removeEventListener('accordion:close', self.onCloseBound);
    el.removeEventListener('accordion:closed', self.onClosedBound);
  }

  componentDidMount() {
    const self = this;
    const el = self.el;
    if (!el) return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('accordion:open', self.onOpenBound);
    el.addEventListener('accordion:opened', self.onOpenedBound);
    el.addEventListener('accordion:close', self.onCloseBound);
    el.addEventListener('accordion:closed', self.onClosedBound);
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

__reactComponentSetProps(F7AccordionItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean
}, Mixins.colorProps));

F7AccordionItem.displayName = 'f7-accordion-item';
export default F7AccordionItem;