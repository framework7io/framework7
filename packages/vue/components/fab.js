import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-fab',
  props: Object.assign({
    id: [String, Number],
    morphTo: String,
    href: [Boolean, String],
    target: String,
    text: String,
    position: {
      type: String,
      default: 'right-bottom'
    },
    tooltip: String
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        morphTo = props.morphTo,
        initialHref = props.href,
        position = props.position,
        text = props.text,
        target = props.target;
    var href = initialHref;
    if (href === true) href = '#';
    if (href === false) href = undefined;
    var linkChildren = [];
    var rootChildren = [];
    var _self$$slots = self.$slots,
        linkSlots = _self$$slots.link,
        defaultSlots = _self$$slots.default,
        rootSlots = _self$$slots.root,
        textSlots = _self$$slots.text;

    if (defaultSlots) {
      for (var i = 0; i < defaultSlots.length; i += 1) {
        var child = defaultSlots[i];
        var isRoot = void 0;
        {
          if (child.tag && child.tag.indexOf('fab-buttons') >= 0) isRoot = true;
        }
        if (isRoot) rootChildren.push(child);else linkChildren.push(child);
      }
    }

    var textEl;

    if (text || textSlots && textSlots.length) {
      textEl = _h('div', {
        class: 'fab-text'
      }, [text || textSlots]);
    }

    var linkEl;

    if (linkChildren.length || linkSlots && linkSlots.length) {
      linkEl = _h('a', {
        ref: 'linkEl',
        key: 'f7-fab-link',
        attrs: {
          target: target,
          href: href
        }
      }, [linkChildren, textEl, linkSlots]);
    }

    var classes = Utils.classNames(className, 'fab', "fab-".concat(position), {
      'fab-morph': morphTo,
      'fab-extended': typeof textEl !== 'undefined'
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id,
        'data-morph-to': morphTo
      }
    }, [linkEl, rootChildren, rootSlots]);
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
  created: function created() {
    Utils.bindMethods(this, ['onClick']);
  },
  mounted: function mounted() {
    var self = this;

    if (self.$refs.linkEl) {
      self.$refs.linkEl.addEventListener('click', self.onClick);
    }

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

    if (self.$refs.linkEl) {
      self.$refs.linkEl.removeEventListener('click', self.onClick);
    }

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },
  methods: {
    onClick: function onClick(event) {
      var self = this;
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