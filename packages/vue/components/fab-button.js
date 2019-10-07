import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-fab-button',
  props: Object.assign({
    id: [String, Number],
    fabClose: Boolean,
    label: String,
    target: String,
    tooltip: String
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var props = this.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        fabClose = props.fabClose,
        label = props.label,
        target = props.target;
    var classes = Utils.classNames(className, {
      'fab-close': fabClose,
      'fab-label-button': label
    }, Mixins.colorClasses(props));
    var labelEl;

    if (label) {
      labelEl = _h('span', {
        class: 'fab-label'
      }, [label]);
    }

    return _h('a', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id,
        target: target
      }
    }, [this.$slots['default'], labelEl]);
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick']);
  },
  mounted: function mounted() {
    var self = this;
    self.$refs.el.addEventListener('click', self.onClick);
    var tooltip = self.props.tooltip;
    if (!tooltip) return;
    self.$f7ready(function (f7) {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: self.$refs.el,
        text: tooltip
      });
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    self.$refs.el.removeEventListener('click', self.onClick);

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
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
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      var self = this;

      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }

      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.$refs.el,
          text: newText
        });
        return;
      }

      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};