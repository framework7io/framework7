import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-preloader',
  props: Object.assign({
    id: [String, Number],
    size: [Number, String]
  }, Mixins.colorProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
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

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
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
    } else if (theme && theme.ios) {
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
    } else if (theme && theme.aurora) {
      innerEl = _h('span', {
        class: 'preloader-inner'
      }, [_h('span', {
        class: 'preloader-inner-circle'
      })]);
    } else if (!theme) {
      innerEl = _h('span', {
        class: 'preloader-inner'
      });
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

  },
  methods: {
    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  }
};