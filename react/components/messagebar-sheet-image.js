import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7MessagebarSheetImage extends React.Component {
  constructor(props, context) {
    super(props, context);
    (() => {
      this.onChangeBound = this.onChange.bind(this);
    })();
  }
  render() {
    const self = this;
    const {image, checked, id, className, style} = self.props;
    const classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(self));
    const styles = Utils.extend({ 'background-image': image && `url(${ image })` }, style || {});
    return React.createElement('label', {
      id: id,
      className: classes,
      style: styles
    }, React.createElement('input', {
      type: 'checkbox',
      checked: checked,
      onChange: self.onChangeBound
    }), React.createElement('i', { className: 'icon icon-checkbox' }), this.slots['default']);
  }
  onChange(e) {
    if (this.props.checked)
      this.dispatchEvent('checked', e);
    else
      this.dispatchEvent('unchecked', e);
    this.dispatchEvent('change', e);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7MessagebarSheetImage, {
  image: String,
  checked: Boolean,
  ...Mixins.colorProps
});
export default F7MessagebarSheetImage;