import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Chip extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  onClick(event) {
    this.dispatchEvent('click', event);
  }
  onDeleteClick(event) {
    this.dispatchEvent('delete', event);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, { chip: true }, Mixins.colorClasses(self));
  }
  get mediaClasses() {
    const c = { 'chip-media': true };
    if (this.props.mediaTextColor)
      c[`text-color-${ this.props.mediaTextColor }`] = true;
    if (this.props.mediaBgColor)
      c[`bg-color-${ this.props.mediaBgColor }`] = true;
    return Utils.classNames(c);
  }
  render() {
    const self = this;
    let mediaEl;
    let labelEl;
    let deleteEl;
    if (self.props.media || self.slots && self.slots.media) {
      mediaEl = React.createElement('div', { className: self.mediaClasses }, self.props.media ? self.props.media : this.slots['media']);
    }
    if (self.props.text || self.slots && self.slots.text) {
      labelEl = React.createElement('div', { className: 'chip-label' }, self.props.text, this.slots['text']);
    }
    if (self.props.deleteable) {
      deleteEl = React.createElement('a', {
        href: '#',
        className: 'chip-delete',
        onClick: self.onDeleteClick.bind(self)
      });
    }
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: self.classes,
      onClick: self.onClick.bind(self)
    }, mediaEl, labelEl, deleteEl);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7Chip, {
  id: [
    String,
    Number
  ],
  media: String,
  text: [
    String,
    Number
  ],
  deleteable: Boolean,
  mediaBgColor: String,
  mediaTextColor: String,
  onDelete: Function,
  ...Mixins.colorProps
});
export default F7Chip;