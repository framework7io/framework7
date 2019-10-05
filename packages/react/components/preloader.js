import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Preloader extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = (() => {
      const self = this;
      const $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(() => {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null
      };
    })();
  }

  get sizeComputed() {
    let s = this.props.size;

    if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
      s = s.replace('px', '');
    }

    return s;
  }

  render() {
    const self = this;
    const {
      sizeComputed,
      props
    } = self;
    const {
      id,
      style,
      className
    } = props;
    const theme = self.state._theme;
    const preloaderStyle = {};

    if (sizeComputed) {
      preloaderStyle.width = `${sizeComputed}px`;
      preloaderStyle.height = `${sizeComputed}px`;
      preloaderStyle['--f7-preloader-size'] = `${sizeComputed}px`;
    }

    if (style) Utils.extend(preloaderStyle, style || {});
    let innerEl;

    if (theme && theme.md) {
      innerEl = React.createElement('span', {
        className: 'preloader-inner'
      }, React.createElement('span', {
        className: 'preloader-inner-gap'
      }), React.createElement('span', {
        className: 'preloader-inner-left'
      }, React.createElement('span', {
        className: 'preloader-inner-half-circle'
      })), React.createElement('span', {
        className: 'preloader-inner-right'
      }, React.createElement('span', {
        className: 'preloader-inner-half-circle'
      })));
    } else if (theme && theme.ios) {
      innerEl = React.createElement('span', {
        className: 'preloader-inner'
      }, React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }), React.createElement('span', {
        className: 'preloader-inner-line'
      }));
    } else if (theme && theme.aurora) {
      innerEl = React.createElement('span', {
        className: 'preloader-inner'
      }, React.createElement('span', {
        className: 'preloader-inner-circle'
      }));
    }

    const classes = Utils.classNames(className, 'preloader', Mixins.colorClasses(props));
    return React.createElement('span', {
      id: id,
      style: preloaderStyle,
      className: classes
    }, innerEl);
  }

}

__reactComponentSetProps(F7Preloader, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  size: [Number, String]
}, Mixins.colorProps));

F7Preloader.displayName = 'f7-preloader';
export default F7Preloader;