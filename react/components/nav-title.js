import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const NavTitleProps = Utils.extend({
  title: String,
  subtitle: String,
  sliding: Boolean
}, Mixins.colorProps);
class F7NavTitle extends React.Component {
  constructor(props, context) {
    super(props, context);
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
  get classes() {
    return Utils.classNames(this.props.className, {
      title: true,
      sliding: this.props.sliding
    }, Mixins.colorClasses(this));
  }
  get slots() {
    return __reactComponentSlots(this);
  }
}
__reactComponentSetProps(F7NavTitle, NavTitleProps);
export default F7NavTitle;