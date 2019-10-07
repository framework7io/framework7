function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-title',
  props: Object.assign({
    id: [String, Number],
    title: String,
    subtitle: String,
    sliding: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var title = props.title,
        subtitle = props.subtitle,
        id = props.id,
        style = props.style,
        sliding = props.sliding,
        className = props.className;
    var subtitleEl;

    if (subtitle) {
      subtitleEl = _h('span', {
        class: 'subtitle'
      }, [subtitle]);
    }

    var classes = Utils.classNames(className, 'title', {
      sliding: sliding
    }, Mixins.colorClasses(props));
    var children;
    var slots = self.$slots;

    if (slots && Object.keys(slots).length) {
      children = [];
      Object.keys(slots).forEach(function (key) {
        var _children;

        (_children = children).push.apply(_children, _toConsumableArray(slots[key]));
      });
    }

    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [children, !children && title, !children && subtitleEl]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};