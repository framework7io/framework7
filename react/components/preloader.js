import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const PreloaderProps = Utils.extend({
  size: [
    Number,
    String
  ]
}, Mixins.colorProps);
class F7Preloader extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {classes, sizeComputed} = this;
    const {id, style} = this.props;
    const preloaderStyle = {};
    if (sizeComputed) {
      preloaderStyle.width = `${ sizeComputed }px`;
      preloaderStyle.height = `${ sizeComputed }px`;
    }
    if (style)
      Utils.extend(preloaderStyle, style || {});
    let innerEl;
    if (this.$theme.md) {
      innerEl = React.createElement('span', { className: 'preloader-inner' }, React.createElement('span', { className: 'preloader-inner-gap' }), React.createElement('span', { className: 'preloader-inner-left' }, React.createElement('span', { className: 'preloader-inner-half-circle' })), React.createElement('span', { className: 'preloader-inner-right' }, React.createElement('span', { className: 'preloader-inner-half-circle' })));
    }
    return React.createElement('span', {
      id: id,
      style: preloaderStyle,
      className: classes
    }, innerEl);
  }
  get classes() {
    return Utils.classNames(this.props.className, 'preloader', Mixins.colorClasses(this));
  }
  get sizeComputed() {
    let s = this.props.size;
    if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
      s = s.replace('px', '');
    }
    return s;
  }
}
__reactComponentSetProps(F7Preloader, PreloaderProps);
export default F7Preloader;