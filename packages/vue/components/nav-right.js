function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-right',
  props: Object.assign({
    id: [String, Number],
    sliding: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        sliding = props.sliding;
    var classes = Utils.classNames(className, 'right', {
      sliding: sliding
    }, Mixins.colorClasses(props));
    var children = [];
    var slots = this.$slots;

    if (slots && Object.keys(slots).length) {
      Object.keys(slots).forEach(function (key) {
        children.push.apply(children, _toConsumableArray(slots[key]));
      });
    }

    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [children]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};