import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Progressbar extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  set(progress, speed) {
    const self = this;
    if (!self.$f7) return;
    self.$f7.progressbar.set(self.refs.el, progress, speed);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      progress,
      id,
      style,
      infinite,
      className
    } = props;
    const transformStyle = {
      transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
      WebkitTransform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : ''
    };
    const classes = Utils.classNames(className, 'progressbar', {
      'progressbar-infinite': infinite
    }, Mixins.colorClasses(props));
    return React.createElement('span', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes,
      'data-progress': progress
    }, React.createElement('span', {
      style: transformStyle
    }));
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Progressbar, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  progress: Number,
  infinite: Boolean
}, Mixins.colorProps));

F7Progressbar.displayName = 'f7-progressbar';
export default F7Progressbar;