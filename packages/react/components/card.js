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

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      title,
      content,
      footer,
      padding,
      outline
    } = props;
    let headerEl;
    let contentEl;
    let footerEl;
    const classes = Utils.classNames(className, 'card', {
      'card-outline': outline
    }, Mixins.colorClasses(props));

    if (title || self.slots && self.slots.header) {
      headerEl = React.createElement(F7CardHeader, null, title, this.slots['header']);
    }

    if (content || self.slots && self.slots.content) {
      contentEl = React.createElement(F7CardContent, {
        padding: padding
      }, content, this.slots['content']);
    }

    if (footer || self.slots && self.slots.footer) {
      footerEl = React.createElement(F7CardFooter, null, footer, this.slots['footer']);
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: classes
    }, headerEl, contentEl, footerEl, this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7Card, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  title: [String, Number],
  content: [String, Number],
  footer: [String, Number],
  outline: Boolean,
  padding: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Card.displayName = 'f7-card';
export default F7Card;