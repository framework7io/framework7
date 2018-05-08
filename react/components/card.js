import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7CardHeader from './card-header';
import F7CardContent from './card-content';
import F7CardFooter from './card-footer';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7Card extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  get classes() {
    const self = this;
    return Utils.classNames(self.props.className, { card: true }, Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    let headerEl;
    let contentEl;
    let footerEl;
    if (self.title || self.slots && self.slots.header) {
      headerEl = React.createElement(F7CardHeader, null, self.props.title, this.slots['header']);
    }
    if (self.content || self.slots && self.slots.content) {
      contentEl = React.createElement(F7CardContent, { padding: this.props.padding }, self.props.content, this.slots['content']);
    }
    if (self.footer || self.slots && self.slots.footer) {
      footerEl = React.createElement(F7CardFooter, null, self.props.title, this.slots['footer']);
    }
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, headerEl, contentEl, footerEl, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
}
__reactComponentSetProps(F7Card, {
  id: [
    String,
    Number
  ],
  title: [
    String,
    Number
  ],
  content: [
    String,
    Number
  ],
  footer: [
    String,
    Number
  ],
  padding: {
    type: Boolean,
    default: true
  },
  ...Mixins.colorProps
});
export default F7Card;