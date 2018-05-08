import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-preloader',
  props: {
    id: [
      String,
      Number
    ],
    size: [
      Number,
      String
    ],
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const {classes, sizeComputed} = this;
    const {id, style} = this.props;
    const preloaderStyle = {};
    if (sizeComputed) {
      preloaderStyle.width = `${ sizeComputed }px`;
      preloaderStyle.height = `${ sizeComputed }px`;
    }
    if (style)
      Utils.extend(preloaderStyle, style || {});
    let innerEl;
    if (this.$theme.md) {
      innerEl = _h('span', { class: 'preloader-inner' }, [
        _h('span', { class: 'preloader-inner-gap' }),
        _h('span', { class: 'preloader-inner-left' }, [_h('span', { class: 'preloader-inner-half-circle' })]),
        _h('span', { class: 'preloader-inner-right' }, [_h('span', { class: 'preloader-inner-half-circle' })])
      ]);
    }
    return _h('span', {
      style: preloaderStyle,
      class: classes,
      attrs: { id: id }
    }, [innerEl]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, 'preloader', Mixins.colorClasses(this));
    },
    sizeComputed() {
      let s = this.props.size;
      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }
      return s;
    },
    props() {
      return __vueComponentProps(this);
    }
  }
};