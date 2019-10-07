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
  data: function data() {
    var _this = this;

    var props = __vueComponentProps(this);

    var state = function () {
      var self = _this;
      var $f7 = self.$f7;

      if (!$f7) {
        self.$f7ready(function () {
          self.setState({
            _theme: self.$theme
          });
        });
      }

      return {
        _theme: $f7 ? self.$theme : null
      };
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var sizeComputed = self.sizeComputed,
        props = self.props;
    var id = props.id,
        style = props.style,
        className = props.className;
    var theme = self.state._theme;
    var preloaderStyle = {};

    if (sizeComputed) {
      preloaderStyle.width = "".concat(sizeComputed, "px");
      preloaderStyle.height = "".concat(sizeComputed, "px");
      preloaderStyle['--f7-preloader-size'] = "".concat(sizeComputed, "px");
    }

    if (style) Utils.extend(preloaderStyle, style || {});
    var innerEl;

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
    }

    var classes = Utils.classNames(className, 'preloader', Mixins.colorClasses(props));
    return _h('span', {
      style: preloaderStyle,
      class: classes,
      attrs: {
        id: id
      }
    }, [innerEl]);
  },
  computed: {
    sizeComputed: function sizeComputed() {
      var s = this.props.size;

      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }

      return s;
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  }
};