import React from 'react';
import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7ActionsButton extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  onClick(event) {
    const self = this;
    const $$ = self.$$;
    const el = self.refs.el;
    if (self.props.close && self.$f7 && el) {
      self.$f7.actions.close($$(el).parents('.actions-modal'));
    }
    self.dispatchEvent('click', event);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, {
      'actions-button': true,
      'actions-button-bold': self.props.bold
    }, Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    let mediaEl;
    if (self.slots.media && self.slots.media.length) {
      mediaEl = React.createElement('div', { className: 'actions-button-media' }, this.slots['media']);
    }
    return React.createElement('div', {
      id: self.props.id,
      style: self.props.style,
      className: self.classes,
      onClick: self.onClick.bind(self),
      ref: 'el'
    }, mediaEl, React.createElement('div', { className: 'actions-button-text' }, this.slots['default']));
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7ActionsButton, {
  id: [
    String,
    Number
  ],
  bold: Boolean,
  close: {
    type: Boolean,
    default: true
  },
  ...Mixins.colorProps
});
export default F7ActionsButton;