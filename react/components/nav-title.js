import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7NavTitle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      title: true,
      sliding: this.props.sliding
    }, Mixins.colorClasses(this));
  }
  render() {
    const self = this;
    const {title, subtitle, id, style} = self.props;
    let subtitleEl;
    if (self.subtitle) {
      subtitleEl = React.createElement('span', { className: 'subtitle' }, subtitle);
    }
    return React.createElement('div', {
      id: id,
      style: style,
      className: self.classes
    }, this.slots['default'], !this.slots.default && title, !this.slots.default && subtitleEl);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7NavTitle, {
  id: [
    String,
    Number
  ],
  title: String,
  subtitle: String,
  sliding: Boolean,
  ...Mixins.colorProps
});
export default F7NavTitle;