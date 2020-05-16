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
    tooltip: String,
    tooltipTrigger: String
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      morphTo,
      href: initialHref,
      position,
      text,
      target
    } = props;
    let href = initialHref;
    if (href === true) href = '#';
    if (href === false) href = undefined;
    const linkChildren = [];
    const rootChildren = [];
    const {
      link: linkSlots,
      default: defaultSlots,
      root: rootSlots,
      text: textSlots
    } = self.$slots;

    if (defaultSlots) {
      for (let i = 0; i < defaultSlots.length; i += 1) {
        const child = defaultSlots[i];
        let isRoot;
        {
          if (child.tag && child.tag.indexOf('fab-buttons') >= 0) isRoot = true;
        }
        if (isRoot) rootChildren.push(child);else linkChildren.push(child);
      }
    }

    let textEl;

    if (text || textSlots && textSlots.length) {
      textEl = _h('div', {
        class: 'fab-text'
      }, [text || textSlots]);
    }

    let linkEl;

    if (linkChildren.length || linkSlots && linkSlots.length || textEl) {
      linkEl = _h('a', {
        ref: 'linkEl',
        attrs: {
          target: target,
          href: href
        }
      }, [linkChildren, textEl, linkSlots]);
    }

    const classes = Utils.classNames(className, 'fab', `fab-${position}`, {
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
      const self = this;

      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }

      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.$refs.el,
          text: newText,
          trigger: self.props.tooltipTrigger
        });
        return;
      }

      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    }
  },

  created() {
    Utils.bindMethods(this, ['onClick']);
  },

  mounted() {
    const self = this;

    if (self.$refs.linkEl) {
      self.$refs.linkEl.addEventListener('click', self.onClick);
    }

    const {
      tooltip,
      tooltipTrigger
    } = self.props;
    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: self.$refs.el,
        text: tooltip,
        trigger: tooltipTrigger
      });
    });
  },

  beforeDestroy() {
    const self = this;

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
    onClick(event) {
      const self = this;
      self.dispatchEvent('click', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};