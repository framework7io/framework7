import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const ChipProps = Utils.extend({
  media: String,
  text: [
    String,
    Number
  ],
  deleteable: Boolean,
  mediaBgColor: String,
  mediaTextColor: String,
  onDelete: Function
}, Mixins.colorProps);
export default {
  name: 'f7-chip',
  props: __vueComponentGetPropKeys(ChipProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    let mediaEl;
    let labelEl;
    let deleteEl;
    if (self.props.media || self.$slots && self.$slots.media) {
      mediaEl = _h('div', { class: self.mediaClasses }, [self.props.media ? self.props.media : this.$slots['media']]);
    }
    if (self.props.text || self.$slots && self.$slots.text) {
      labelEl = _h('div', { class: 'chip-label' }, [
        self.props.text,
        this.$slots['text']
      ]);
    }
    if (self.props.deleteable) {
      deleteEl = _h('a', {
        class: 'chip-delete',
        on: { click: self.onDeleteClick.bind(self) },
        attrs: { href: '#' }
      });
    }
    return _h('div', {
      style: this.props.style,
      class: self.classes,
      on: { click: self.onClick.bind(self) },
      attrs: { id: this.props.id }
    }, [
      mediaEl,
      labelEl,
      deleteEl
    ]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, { chip: true }, Mixins.colorClasses(self));
    },
    mediaClasses() {
      const c = { 'chip-media': true };
      if (this.props.mediaTextColor)
        c[`text-color-${ this.props.mediaTextColor }`] = true;
      if (this.props.mediaBgColor)
        c[`bg-color-${ this.props.mediaBgColor }`] = true;
      return Utils.classNames(c);
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
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
  }
};