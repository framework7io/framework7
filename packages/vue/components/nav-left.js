function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Link from './link';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-left',
  props: Object.assign({
    id: [String, Number],
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    backLinkShowText: {
      type: Boolean,
      default: undefined
    },
    sliding: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var backLink = props.backLink,
        backLinkUrl = props.backLinkUrl,
        backLinkForce = props.backLinkForce,
        backLinkShowText = props.backLinkShowText,
        sliding = props.sliding,
        className = props.className,
        style = props.style,
        id = props.id;
    var linkEl;
    var needBackLinkText = backLinkShowText;
    if (typeof needBackLinkText === 'undefined') needBackLinkText = !this.$theme.md;

    if (backLink) {
      var text = backLink !== true && needBackLinkText ? backLink : undefined;
      linkEl = _h(F7Link, {
        class: !text ? 'icon-only' : undefined,
        on: {
          click: this.onBackClick
        },
        attrs: {
          href: backLinkUrl || '#',
          back: true,
          icon: 'icon-back',
          force: backLinkForce || undefined,
          text: text
        }
      });
    }

    var classes = Utils.classNames(className, 'left', {
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
    }, [linkEl, children]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onBackClick']);
  },
  methods: {
    onBackClick: function onBackClick(event) {
      this.dispatchEvent('back-click backClick click:back clickBack', event);
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