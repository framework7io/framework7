import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-chip',
  props: Object.assign({
    id: [String, Number],
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
    outline: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      media,
      text,
      deleteable,
      className,
      id,
      style,
      mediaTextColor,
      mediaBgColor,
      outline
    } = props;
    let mediaEl;
    let labelEl;
    let deleteEl;

    if (media || self.$slots && self.$slots.media) {
      const mediaClasses = Utils.classNames('chip-media', mediaTextColor && `text-color-${mediaTextColor}`, mediaBgColor && `bg-color-${mediaBgColor}`);
      mediaEl = _h('div', {
        class: mediaClasses
      }, [media || this.$slots['media']]);
    }

    if (text || self.$slots && self.$slots.text) {
      labelEl = _h('div', {
        class: 'chip-label'
      }, [text, this.$slots['text']]);
    }

    if (deleteable) {
      deleteEl = _h('a', {
        class: 'chip-delete',
        on: {
          click: self.onDeleteClick.bind(self)
        },
        attrs: {
          href: '#'
        }
      });
    }

    const classes = Utils.classNames(className, 'chip', {
      'chip-outline': outline
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      on: {
        click: self.onClick.bind(self)
      },
      attrs: {
        id: id
      }
    }, [mediaEl, labelEl, deleteEl]);
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

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};