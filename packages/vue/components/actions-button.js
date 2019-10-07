import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-actions-button',
  props: Object.assign({
    id: [String, Number],
    bold: Boolean,
    close: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        className = props.className,
        style = props.style,
        bold = props.bold;
    var mediaEl;

    if (self.$slots.media && self.$slots.media.length) {
      mediaEl = _h('div', {
        class: 'actions-button-media'
      }, [this.$slots['media']]);
    }

    var classes = Utils.classNames(className, {
      'actions-button': true,
      'actions-button-bold': bold
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      ref: 'el',
      attrs: {
        id: id
      }
    }, [mediaEl, _h('div', {
      class: 'actions-button-text'
    }, [this.$slots['default']])]);
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
      var self = this;
      var $$ = self.$$;
      var el = self.$refs.el;

      if (self.props.close && self.$f7 && el) {
        self.$f7.actions.close($$(el).parents('.actions-modal'));
      }

      self.dispatchEvent('click', event);
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