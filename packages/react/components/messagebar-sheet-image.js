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

  onChange(event) {
    if (this.props.checked) this.dispatchEvent('checked', event);else this.dispatchEvent('unchecked', event);
    this.dispatchEvent('change', event);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      image,
      checked,
      id,
      className,
      style
    } = props;
    const classes = Utils.classNames(className, 'messagebar-sheet-image', 'checkbox', Mixins.colorClasses(props));
    const styles = Utils.extend({
      backgroundImage: image && `url(${image})`
    }, style || {});
    let inputEl;
    {
      inputEl = React.createElement('input', {
        type: 'checkbox',
        checked: checked,
        onChange: self.onChangeBound
      });
    }
    return React.createElement('label', {
      id: id,
      className: classes,
      style: styles
    }, inputEl, React.createElement('i', {
      className: 'icon icon-checkbox'
    }), this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

}

__reactComponentSetProps(F7MessagebarSheetImage, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  image: String,
  checked: Boolean
}, Mixins.colorProps));

F7MessagebarSheetImage.displayName = 'f7-messagebar-sheet-image';
export default F7MessagebarSheetImage;