import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
*/

export default {
  name: 'f7-icon',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    material: String, // Material Icons
    f7: String, // Framework7 Icons
    ion: String, // Ionicons
    fa: String, // Font Awesome
    icon: String, // Custom
    ios: String,
    aurora: String,
    md: String,
    tooltip: String,
    size: [String, Number],
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
    } = props;
    return (
      <i
        ref="el"
        id={id}
        style={Utils.extend({ fontSize: self.sizeComputed }, style)}
        className={self.classes}
      >
        {self.iconTextComputed}
        <slot />
      </i>
    );
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const { tooltip } = self.props;
    if (!tooltip) return;

    self.$f7ready((f7) => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip,
      });
    });
  },
  componentWillUnmount() {
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
      const { material, f7, md, ios, aurora } = self.props;
      let text = material || f7;
      if (md && self.$theme.md && (md.indexOf('material:') >= 0 || md.indexOf('f7:') >= 0)) {
        text = md.split(':')[1];
      } else if (ios && self.$theme.ios && (ios.indexOf('material:') >= 0 || ios.indexOf('f7:') >= 0)) {
        text = ios.split(':')[1];
      } else if (aurora && self.$theme.aurora && (aurora.indexOf('material:') >= 0 || aurora.indexOf('f7:') >= 0)) {
        text = aurora.split(':')[1];
      }
      return text;
    },
    classes() {
      let classes = {
        icon: true,
      };
      const self = this;
      const props = self.props;
      const {
        material, f7, fa, ion, icon, md, ios, aurora, className,
      } = props;
      let themeIcon;
      if (self.$theme.ios) themeIcon = ios;
      else if (self.$theme.md) themeIcon = md;
      else if (self.$theme.aurora) themeIcon = aurora;

      if (themeIcon) {
        const parts = themeIcon.split(':');
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
          fa,
        };
        if (ion) classes[`ion-${ion}`] = true;
        if (fa) classes[`fa-${fa}`] = true;
        if (icon) classes[icon] = true;
      }
      return Utils.classNames(
        className,
        classes,
        Mixins.colorClasses(props),
      );
    },
  },
};
