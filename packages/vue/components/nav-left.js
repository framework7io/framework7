import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Link from './link';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-nav-left',
  props: Object.assign({
    id: [String, Number],
    backLink: [Boolean, String],
    backLinkUrl: String,
    backLinkForce: Boolean,
    sliding: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const props = this.props;
    const {
      backLink,
      backLinkUrl,
      backLinkForce,
      sliding,
      className,
      style,
      id
    } = props;
    let linkEl;

    if (backLink) {
      linkEl = _h(F7Link, {
        class: backLink === true || backLink && this.$theme.md ? 'icon-only' : undefined,
        on: {
          click: this.onBackClick.bind(this)
        },
        attrs: {
          href: backLinkUrl || '#',
          back: true,
          icon: 'icon-back',
          force: backLinkForce || undefined,
          text: backLink !== true && !this.$theme.md ? backLink : undefined
        }
      });
    }

    const classes = Utils.classNames(className, 'left', {
      sliding
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [linkEl, this.$slots['default']]);
  },

  methods: {
    onBackClick(e) {
      this.dispatchEvent('back-click backClick click:back clickBack', e);
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