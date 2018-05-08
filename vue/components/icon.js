import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-icon',
  props: {
    id: [
      String,
      Number
    ],
    material: String,
    f7: String,
    ion: String,
    fa: String,
    icon: String,
    ifMd: String,
    ifIos: String,
    size: [
      String,
      Number
    ],
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    return _h('i', {
      style: Utils.extend({ fontSize: self.sizeComputed }, this.props.style),
      class: self.classes,
      attrs: { id: this.props.id }
    }, [
      self.iconTextComputed,
      this.$slots['default']
    ]);
  },
  computed: {
    sizeComputed() {
      const self = this;
      let size = self.props.size;
      if (typeof size === 'number' || parseFloat(size) === size * 1) {
        size = `${ size }px`;
      }
      return size;
    },
    iconTextComputed() {
      const self = this;
      const {material, f7, ifMd, ifIos} = self.props;
      let text = material || f7;
      if (ifMd && self.$theme.md && (ifMd.indexOf('material:') >= 0 || ifMd.indexOf('f7:') >= 0)) {
        text = ifMd.split(':')[1];
      } else if (ifIos && self.$theme.ios && (ifIos.indexOf('material:') >= 0 || ifIos.indexOf('f7:') >= 0)) {
        text = ifIos.split(':')[1];
      }
      return text;
    },
    classes() {
      let classes = { icon: true };
      const self = this;
      const {ifMd, ifIos, material, f7, fa, ion, icon} = self.props;
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
          classes[`${ prop }-${ value }`] = true;
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
        if (ion)
          classes[`ion-${ ion }`] = true;
        if (fa)
          classes[`fa-${ fa }`] = true;
        if (icon)
          classes[icon] = true;
      }
      return Utils.classNames(self.props.className, classes, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};