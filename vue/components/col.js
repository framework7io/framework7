import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-col',
  props: {
    id: [
      String,
      Number
    ],
    tag: {
      type: String,
      default: 'div'
    },
    width: {
      type: [
        Number,
        String
      ],
      default: 'auto'
    },
    tabletWidth: {
      type: [
        Number,
        String
      ]
    },
    desktopWidth: {
      type: [
        Number,
        String
      ]
    },
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const ColTag = self.props.tag;
    return _h(ColTag, {
      style: this.props.style,
      class: self.classes,
      on: { click: self.onClick.bind(self) },
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, {
        col: self.props.width === 'auto',
        [`col-${ self.props.width }`]: self.props.width !== 'auto',
        [`tablet-${ self.props.tabletWidth }`]: self.props.tabletWidth,
        [`desktop-${ self.props.desktopWidth }`]: self.props.desktopWidth
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    onClick(e) {
      this.dispatchEvent('click', e);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};