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

  onBeforeOpen(el, prevent) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', prevent);
  }

  onOpen(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('accordionOpen accordion:open');
  }

  onOpened(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('accordionOpened accordion:opened');
  }

  onBeforeClose(el, prevent) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('accordionBeforeClose accordion:beforeclose', prevent);
  }

  onClose(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('accordionClose accordion:close');
  }

  onClosed(el) {
    if (this.eventTargetEl !== el) return;
    this.dispatchEvent('accordionClosed accordion:closed');
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
    if (!el || !self.$f7) return;
    const f7 = self.$f7;
    f7.off('accordionBeforeOpen', self.onBeforeOpen);
    f7.off('accordionOpen', self.onOpen);
    f7.off('accordionOpened', self.onOpened);
    f7.off('accordionBeforeClose', self.onBeforeClose);
    f7.off('accordionClose', self.onClose);
    f7.off('accordionClosed', self.onClosed);
    delete this.eventTargetEl;
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    self.eventTargetEl = el;
    self.$f7ready(f7 => {
      f7.on('accordionBeforeOpen', self.onBeforeOpen);
      f7.on('accordionOpen', self.onOpen);
      f7.on('accordionOpened', self.onOpened);
      f7.on('accordionBeforeClose', self.onBeforeClose);
      f7.on('accordionClose', self.onClose);
      f7.on('accordionClosed', self.onClosed);
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

__reactComponentSetProps(F7AccordionItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  opened: Boolean
}, Mixins.colorProps));

F7AccordionItem.displayName = 'f7-accordion-item';
export default F7AccordionItem;