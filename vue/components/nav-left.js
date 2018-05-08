import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Link from './link';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-left',
  props: {
    id: [
      String,
      Number
    ],
    backLink: [
      Boolean,
      String
    ],
    backLinkUrl: String,
    sliding: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const {backLink, backLinkUrl} = this.props;
    let linkEl;
    if (backLink) {
      linkEl = _h(F7Link, {
        class: backLink === true || backLink && this.$theme.md ? 'icon-only' : undefined,
        on: { click: this.onBackClick.bind(this) },
        attrs: {
          href: backLinkUrl || '#',
          back: true,
          icon: 'icon-back',
          text: backLink !== true && !this.$theme.md ? backLink : undefined
        }
      });
    }
    return _h('div', {
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [
      linkEl,
      this.$slots['default']
    ]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        left: true,
        sliding: this.props.slidng
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};