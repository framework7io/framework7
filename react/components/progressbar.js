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
    if (!self.$f7)
      return;
    self.$f7.progressbar.set(self.refs.el, progress, speed);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      progressbar: true,
      'progressbar-infinite': this.props.infinite
    }, Mixins.colorClasses(this));
  }
  render() {
    const self = this;
    const {progress, id, style} = self.props;
    const transformStyle = {
      transform: progress ? `translate3d(${ -100 + progress }%, 0, 0)` : '',
      webkitTransform: progress ? `translate3d(${ -100 + progress }%, 0, 0)` : ''
    };
    return React.createElement('span', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: self.classes,
      'data-progress': progress
    }, React.createElement('span', { style: transformStyle }));
  }
  get refs() {
    return this.__reactRefs;
  }
  set refs(refs) {
  }
}
__reactComponentSetProps(F7Progressbar, {
  id: [
    String,
    Number
  ],
  progress: Number,
  infinite: Boolean,
  ...Mixins.colorProps
});
export default F7Progressbar;