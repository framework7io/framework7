import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7AccordionItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, 'onBeforeOpen onOpen onOpened onBeforeClose onClose onClosed'.split(' '));
    })();
  }

  onBeforeOpen(event) {
    this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', event, event.detail.prevent);
  }

  onOpen(event) {
    this.dispatchEvent('accordionOpen accordion:open', event);
  }

  onOpened(event) {
    this.dispatchEvent('accordionOpened accordion:opened', event);
  }

  onBeforeClose(event) {
    this.dispatchEvent('accordionBeforeClose accordion:beforeclose', event, event.detail.prevent);
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
      className: classes,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      }
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('accordion:beforeopen', self.onBeforeOpen);
    el.removeEventListener('accordion:open', self.onOpen);
    el.removeEventListener('accordion:opened', self.onOpened);
    el.removeEventListener('accordion:beforeclose', self.onBeforeClose);
    el.removeEventListener('accordion:close', self.onClose);
    el.removeEventListener('accordion:closed', self.onClosed);
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('accordion:beforeopen', self.onBeforeOpen);
    el.addEventListener('accordion:open', self.onOpen);
    el.addEventListener('accordion:opened', self.onOpened);
    el.addEventListener('accordion:beforeclose', self.onBeforeClose);
    el.addEventListener('accordion:close', self.onClose);
    el.addEventListener('accordion:closed', self.onClosed);
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

__reactComponentSetProps(F7AccordionItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean
}, Mixins.colorProps));

F7AccordionItem.displayName = 'f7-accordion-item';
export default F7AccordionItem;