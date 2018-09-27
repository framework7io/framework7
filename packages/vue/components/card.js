import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7CardHeader from './card-header';
import F7CardContent from './card-content';
import F7CardFooter from './card-footer';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-card',
  props: Object.assign({
    id: [String, Number],
    title: [String, Number],
    content: [String, Number],
    footer: [String, Number],
    outline: Boolean,
    padding: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      title,
      content,
      footer,
      padding,
      outline
    } = props;
    let headerEl;
    let contentEl;
    let footerEl;
    const classes = Utils.classNames(className, 'card', {
      'card-outline': outline
    }, Mixins.colorClasses(props));

    if (title || self.$slots && self.$slots.header) {
      headerEl = _h(F7CardHeader, [title, this.$slots['header']]);
    }

    if (content || self.$slots && self.$slots.content) {
      contentEl = _h(F7CardContent, {
        attrs: {
          padding: padding
        }
      }, [content, this.$slots['content']]);
    }

    if (footer || self.$slots && self.$slots.footer) {
      footerEl = _h(F7CardFooter, [footer, this.$slots['footer']]);
    }

    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [headerEl, contentEl, footerEl, this.$slots['default']]);
  },

  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};