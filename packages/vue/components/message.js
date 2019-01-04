import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-message',
  props: Object.assign({
    id: [String, Number],
    text: String,
    name: String,
    avatar: String,
    type: {
      type: String,
      default: 'sent'
    },
    image: String,
    header: String,
    footer: String,
    textHeader: String,
    textFooter: String,
    first: Boolean,
    last: Boolean,
    tail: Boolean,
    sameName: Boolean,
    sameHeader: Boolean,
    sameFooter: Boolean,
    sameAvatar: Boolean,
    typing: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      text,
      name,
      avatar,
      image,
      header,
      footer,
      textHeader,
      textFooter,
      typing,
      id,
      style
    } = props;
    const {
      start: slotsStart,
      end: slotsEnd,
      default: slotsDefault,
      'content-start': slotsContentStart,
      'content-end': slotsContentEnd,
      avatar: slotsAvatar,
      name: slotsName,
      header: slotsHeader,
      footer: slotsFooter,
      image: slotsImage,
      text: slotsText,
      'text-header': slotsTextHeader,
      'text-footer': slotsTextFooter,
      'bubble-start': slotsBubbleStart,
      'bubble-end': slotsBubbleEnd
    } = self.$slots;
    return _h('div', {
      ref: 'el',
      style: style,
      class: self.classes,
      attrs: {
        id: id
      }
    }, [slotsStart, (avatar || slotsAvatar) && _h('div', {
      ref: 'avatarEl',
      class: 'message-avatar',
      style: {
        backgroundImage: avatar && `url(${avatar})`
      }
    }, [slotsAvatar]), _h('div', {
      class: 'message-content'
    }, [slotsContentStart, (slotsName || name) && _h('div', {
      ref: 'nameEl',
      class: 'message-name'
    }, [slotsName || name]), (slotsHeader || header) && _h('div', {
      ref: 'headerEl',
      class: 'message-header'
    }, [slotsHeader || header]), _h('div', {
      ref: 'bubbleEl',
      class: 'message-bubble'
    }, [slotsBubbleStart, (slotsImage || image) && _h('div', {
      class: 'message-image'
    }, [slotsImage || _h('img', {
      attrs: {
        src: image
      }
    })]), (slotsTextHeader || textHeader) && _h('div', {
      class: 'message-text-header'
    }, [slotsTextHeader || textHeader]), (slotsText || text || typing) && _h('div', {
      ref: 'textEl',
      class: 'message-text'
    }, [slotsText || text, typing && _h('div', {
      class: 'message-typing-indicator'
    }, [_h('div'), _h('div'), _h('div')])]), (slotsTextFooter || textFooter) && _h('div', {
      class: 'message-text-footer'
    }, [slotsTextFooter || textFooter]), slotsBubbleEnd, slotsDefault]), (slotsFooter || footer) && _h('div', {
      ref: 'footerEl',
      class: 'message-footer'
    }, [slotsFooter || footer]), slotsContentEnd]), slotsEnd]);
  },

  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const {
        type,
        typing,
        first,
        last,
        tail,
        sameName,
        sameHeader,
        sameFooter,
        sameAvatar,
        className
      } = props;
      return Utils.classNames(className, 'message', {
        'message-sent': type === 'sent',
        'message-received': type === 'received',
        'message-typing': typing,
        'message-first': first,
        'message-last': last,
        'message-tail': tail,
        'message-same-name': sameName,
        'message-same-header': sameHeader,
        'message-same-footer': sameFooter,
        'message-same-avatar': sameAvatar
      }, Mixins.colorClasses(props));
    },

    props() {
      return __vueComponentProps(this);
    }

  },

  created() {
    Utils.bindMethods(this, ['onClick', 'onNameClick', 'onTextClick', 'onAvatarClick', 'onHeaderClick', 'onFooterClick', 'onBubbleClick']);
  },

  mounted() {
    const {
      el,
      nameEl,
      textEl,
      avatarEl,
      headerEl,
      footerEl,
      bubbleEl
    } = this.$refs;
    el.addEventListener('click', this.onClick);
    if (nameEl) nameEl.addEventListener('click', this.onNameClick);
    if (textEl) textEl.addEventListener('click', this.onTextClick);
    if (avatarEl) avatarEl.addEventListener('click', this.onAvatarClick);
    if (headerEl) headerEl.addEventListener('click', this.onHeaderClick);
    if (footerEl) footerEl.addEventListener('click', this.onFooterClick);
    if (bubbleEl) bubbleEl.addEventListener('click', this.onBubbleClick);
  },

  beforeDestroy() {
    const {
      el,
      nameEl,
      textEl,
      avatarEl,
      headerEl,
      footerEl,
      bubbleEl
    } = this.$refs;
    el.removeEventListener('click', this.onClick);
    if (nameEl) nameEl.removeEventListener('click', this.onNameClick);
    if (textEl) textEl.removeEventListener('click', this.onTextClick);
    if (avatarEl) avatarEl.removeEventListener('click', this.onAvatarClick);
    if (headerEl) headerEl.removeEventListener('click', this.onHeaderClick);
    if (footerEl) footerEl.removeEventListener('click', this.onFooterClick);
    if (bubbleEl) bubbleEl.removeEventListener('click', this.onBubbleClick);
  },

  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },

    onNameClick(event) {
      this.dispatchEvent('click:name clickName', event);
    },

    onTextClick(event) {
      this.dispatchEvent('click:text clickText', event);
    },

    onAvatarClick(event) {
      this.dispatchEvent('click:avatar clickAvatar', event);
    },

    onHeaderClick(event) {
      this.dispatchEvent('click:header clickHeader', event);
    },

    onFooterClick(event) {
      this.dispatchEvent('click:footer clickFooter', event);
    },

    onBubbleClick(event) {
      this.dispatchEvent('click:bubble clickBubble', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  }
};