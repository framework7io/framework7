import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7SkeletonText extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      width,
      height,
      tag
    } = props;
    const classes = Utils.classNames('skeleton-text', className, Mixins.colorClasses(props));
    let styleAttribute = style;

    if (width) {
      const widthValue = typeof width === 'number' ? `${width}px` : width;

      if (!styleAttribute) {
        styleAttribute = {
          width: widthValue
        };
      } else if (typeof styleAttribute === 'object') {
        styleAttribute = Object.assign({
          width: widthValue
        }, styleAttribute);
      } else if (typeof styleAttribute === 'string') {
        styleAttribute = `width: ${widthValue}; ${styleAttribute}`;
      }
    }

    if (height) {
      const heightValue = typeof height === 'number' ? `${height}px` : height;

      if (!styleAttribute) {
        styleAttribute = {
          height: heightValue
        };
      } else if (typeof styleAttribute === 'object') {
        styleAttribute = Object.assign({
          height: heightValue
        }, styleAttribute);
      } else if (typeof styleAttribute === 'string') {
        styleAttribute = `height: ${heightValue}; ${styleAttribute}`;
      }
    }

    const Tag = tag;
    return React.createElement(Tag, {
      id: id,
      style: styleAttribute,
      className: classes
    }, this.slots['default']);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

}

__reactComponentSetProps(F7SkeletonText, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  width: [Number, String],
  height: [Number, String],
  tag: {
    type: String,
    default: 'span'
  }
}, Mixins.colorProps));

F7SkeletonText.displayName = 'f7-skeleton-text';
export default F7SkeletonText;