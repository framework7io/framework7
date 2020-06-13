import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Icon from './icon';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-chip',
  props: Object.assign({
    id: [String, Number],
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
    outline: Boolean,
    tooltip: String,
    tooltipTrigger: String
  }, Mixins.colorProps, {}, Mixins.linkIconProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      media,
      text,
      deleteable,
      className,
      id,
      style,
      mediaTextColor,
      mediaBgColor,
      outline,
      icon,
      iconMaterial,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      iconColor,
      iconSize
    } = props;
    let iconEl;
    let mediaEl;
    let labelEl;
    let deleteEl;

    if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = _h(F7Icon, {
        attrs: {
          material: iconMaterial,
          f7: iconF7,
          icon: icon,
          md: iconMd,
          ios: iconIos,
          aurora: iconAurora,
          color: iconColor,
          size: iconSize
        }
      });
    }

    if (media || iconEl || self.$slots && self.$slots.media) {
      const mediaClasses = Utils.classNames('chip-media', mediaTextColor && `text-color-${mediaTextColor}`, mediaBgColor && `bg-color-${mediaBgColor}`);
      mediaEl = _h('div', {
        class: mediaClasses
      }, [iconEl, media, this.$slots['media']]);
    }

    if (text || self.$slots && (self.$slots.text || self.$slots.default && self.$slots.default.length)) {
      labelEl = _h('div', {
        class: 'chip-label'
      }, [text, this.$slots['text'], this.$slots['default']]);
    }

    if (deleteable) {
      deleteEl = _h('a', {
        ref: 'deleteEl',
        class: 'chip-delete'
      });
    }

    const classes = Utils.classNames(className, 'chip', {
      'chip-outline': outline
    }, Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [mediaEl, labelEl, deleteEl]);
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
    Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    el.addEventListener('click', self.onClick);

    if (self.$refs.deleteEl) {
      self.$refs.deleteEl.addEventListener('click', self.onDeleteClick);
    }

    const {
      tooltip,
      tooltipTrigger
    } = self.props;
    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip,
        trigger: tooltipTrigger
      });
    });
  },

  beforeDestroy() {
    const self = this;
    self.$refs.el.removeEventListener('click', self.onClick);

    if (self.$refs.deleteEl) {
      self.$refs.deleteEl.removeEventListener('click', self.onDeleteClick);
    }

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },

  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },

    onDeleteClick(event) {
      this.dispatchEvent('delete', event);
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