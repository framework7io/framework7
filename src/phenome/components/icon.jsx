import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const IconProps = Utils.extend(
  {
    material: String, // Material Icons
    f7: String, // Framework7 Icons
    ion: String, // Ionicons
    fa: String, // Font Awesome
    icon: String, // Custom
    ifMd: String,
    ifIos: String,
    size: [String, Number],
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-icon',
  props: IconProps,
  render() {
    const self = this;

    return (
      <i
        id={this.props.id}
        style={Utils.extend({ fontSize: self.sizeComputed }, this.props.style)}
        className={self.classes}
      >
        {self.iconTextComputed}
        <slot />
      </i>
    );
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
      const { material, f7, ifMd, ifIos } = self.props;
      let text = material || f7;
      if (ifMd && self.$theme.md && (ifMd.indexOf('material:') >= 0 || ifMd.indexOf('f7:') >= 0)) {
        text = ifMd.split(':')[1];
      } else if (ifIos && self.$theme.ios && (ifIos.indexOf('material:') >= 0 || ifIos.indexOf('f7:') >= 0)) {
        text = ifIos.split(':')[1];
      }
      return text;
    },
    classes() {
      let classes = {
        icon: true,
      };
      const self = this;
      const {
        ifMd, ifIos, material, f7, fa, ion, icon,
      } = self.props;
      if (ifMd || ifIos) {
        const parts = (self.$theme.md ? ifMd : ifIos).split(':');
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
        self.props.className,
        classes,
        Mixins.colorClasses(self),
      );
    },
  },
};
