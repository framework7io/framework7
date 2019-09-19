import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-preloader',
  props: Object.assign({
    id: [String, Number],
    size: [Number, String]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const {
      sizeComputed
    } = self;
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    const preloaderStyle = {};

    if (sizeComputed) {
      preloaderStyle.width = `${sizeComputed}px`;
      preloaderStyle.height = `${sizeComputed}px`;
      preloaderStyle['--f7-preloader-size'] = `${sizeComputed}px`;
    }

    if (style) Utils.extend(preloaderStyle, style || {});
    let innerEl;

    if (self.$theme.md) {
      innerEl = _h('span', {
        class: 'preloader-inner'
      }, [_h('span', {
        class: 'preloader-inner-gap'
      }), _h('span', {
        class: 'preloader-inner-left'
      }, [_h('span', {
        class: 'preloader-inner-half-circle'
      })]), _h('span', {
        class: 'preloader-inner-right'
      }, [_h('span', {
        class: 'preloader-inner-half-circle'
      })])]);
    } else if (self.$theme.ios) {
      innerEl = _h('span', {
        class: 'preloader-inner'
      }, [_h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      }), _h('span', {
        class: 'preloader-inner-line'
      })]);
    } else if (self.$theme.aurora) {
      innerEl = _h('span', {
        class: 'preloader-inner'
      }, [_h('span', {
        class: 'preloader-inner-circle'
      })]);
    }

    const classes = Utils.classNames(className, 'preloader', Mixins.colorClasses(props));
    return _h('span', {
      style: preloaderStyle,
      class: classes,
      attrs: {
        id: id
      }
    }, [innerEl]);
  },

  computed: {
    sizeComputed() {
      let s = this.props.size;

      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }

      return s;
    },

    props() {
      return __vueComponentProps(this);
    }

  }
};