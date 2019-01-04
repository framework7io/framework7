import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-icon',
  props: Object.assign({
    id: [String, Number],
    material: String,
    f7: String,
    ion: String,
    fa: String,
    icon: String,
    ifMd: String,
    ifIos: String,
    ios: String,
    md: String,
    tooltip: String,
    size: [String, Number]
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style
    } = props;
    return _h('i', {
      ref: 'el',
      style: Utils.extend({
        fontSize: self.sizeComputed
      }, style),
      class: self.classes,
      attrs: {
        id: id
      }
    }, [self.iconTextComputed, this.$slots['default']]);
  },

  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    }
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    const {
      tooltip
    } = self.props;
    if (!tooltip) return;
    self.$f7ready(f7 => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip
      });
    });
  },

  beforeDestroy() {
    const self = this;

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },

  computed: {
    sizeComputed() {
      const self = this;
      let size = self.props.size;

      if (typeof size === 'number' || parseFloat(size) === size * 1) {
        size = `${size}px`;
      }

      return size;
    },

    iconTextComputed() {
      const self = this;
      const {
        material,
        f7,
        ifMd,
        ifIos,
        md,
        ios
      } = self.props;
      let text = material || f7;
      const mdIcon = ifMd || md;
      const iosIcon = ifIos || ios;

      if (mdIcon && self.$theme.md && (mdIcon.indexOf('material:') >= 0 || mdIcon.indexOf('f7:') >= 0)) {
        text = mdIcon.split(':')[1];
      } else if (iosIcon && self.$theme.ios && (iosIcon.indexOf('material:') >= 0 || iosIcon.indexOf('f7:') >= 0)) {
        text = iosIcon.split(':')[1];
      }

      return text;
    },

    classes() {
      let classes = {
        icon: true
      };
      const self = this;
      const props = self.props;
      const {
        ifMd,
        ifIos,
        material,
        f7,
        fa,
        ion,
        icon,
        md,
        ios,
        className
      } = props;
      const mdIcon = ifMd || md;
      const iosIcon = ifIos || ios;

      if (mdIcon || iosIcon) {
        const parts = (self.$theme.md ? mdIcon : iosIcon).split(':');
        const prop = parts[0];
        const value = parts[1];

        if (prop === 'material' || prop === 'fa' || prop === 'f7') {
          classes.fa = prop === 'fa';
          classes['material-icons'] = prop === 'material';
          classes['f7-icons'] = prop === 'f7';
        }

        if (prop === 'fa' || prop === 'ion') {
          classes[`${prop}-${value}`] = true;
        }

        if (prop === 'icon') {
          classes[value] = true;
        }
      } else {
        classes = {
          icon: true,
          'material-icons': material,
          'f7-icons': f7,
          fa
        };
        if (ion) classes[`ion-${ion}`] = true;
        if (fa) classes[`fa-${fa}`] = true;
        if (icon) classes[icon] = true;
      }

      return Utils.classNames(className, classes, Mixins.colorClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  }
};