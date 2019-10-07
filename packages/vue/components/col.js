function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-col',
  props: Object.assign({
    id: [String, Number],
    tag: {
      type: String,
      default: 'div'
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    xsmall: {
      type: [Number, String]
    },
    small: {
      type: [Number, String]
    },
    medium: {
      type: [Number, String]
    },
    large: {
      type: [Number, String]
    },
    xlarge: {
      type: [Number, String]
    }
  }, Mixins.colorProps),
  render: function render() {
    var _Utils$classNames;

    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        tag = props.tag,
        width = props.width,
        xsmall = props.xsmall,
        small = props.small,
        medium = props.medium,
        large = props.large,
        xlarge = props.xlarge;
    var ColTag = tag;
    var classes = Utils.classNames(className, (_Utils$classNames = {
      col: width === 'auto'
    }, _defineProperty(_Utils$classNames, "col-".concat(width), width !== 'auto'), _defineProperty(_Utils$classNames, "xsmall-".concat(xsmall), xsmall), _defineProperty(_Utils$classNames, "small-".concat(small), small), _defineProperty(_Utils$classNames, "medium-".concat(medium), medium), _defineProperty(_Utils$classNames, "large-".concat(large), large), _defineProperty(_Utils$classNames, "xlarge-".concat(xlarge), xlarge), _Utils$classNames), Mixins.colorClasses(props));
    return _h(ColTag, {
      style: style,
      class: classes,
      ref: 'el',
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick']);
  },
  mounted: function mounted() {
    this.$refs.el.addEventListener('click', this.onClick);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.el.removeEventListener('click', this.onClick);
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};