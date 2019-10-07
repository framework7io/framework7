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
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var text = props.text,
        name = props.name,
        avatar = props.avatar,
        image = props.image,
        header = props.header,
        footer = props.footer,
        textHeader = props.textHeader,
        textFooter = props.textFooter,
        typing = props.typing,
        id = props.id,
        style = props.style;
    var _self$$slots = self.$slots,
        slotsStart = _self$$slots.start,
        slotsEnd = _self$$slots.end,
        slotsDefault = _self$$slots.default,
        slotsContentStart = _self$$slots['content-start'],
        slotsContentEnd = _self$$slots['content-end'],
        slotsAvatar = _self$$slots.avatar,
        slotsName = _self$$slots.name,
        slotsHeader = _self$$slots.header,
        slotsFooter = _self$$slots.footer,
        slotsImage = _self$$slots.image,
        slotsText = _self$$slots.text,
        slotsTextHeader = _self$$slots['text-header'],
        slotsTextFooter = _self$$slots['text-footer'],
        slotsBubbleStart = _self$$slots['bubble-start'],
        slotsBubbleEnd = _self$$slots['bubble-end'];
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
        backgroundImage: avatar && "url(".concat(avatar, ")")
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
    classes: function classes() {
      var self = this;
      var props = self.props;
      var type = props.type,
          typing = props.typing,
          first = props.first,
          last = props.last,
          tail = props.tail,
          sameName = props.sameName,
          sameHeader = props.sameHeader,
          sameFooter = props.sameFooter,
          sameAvatar = props.sameAvatar,
          className = props.className;
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
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick', 'onNameClick', 'onTextClick', 'onAvatarClick', 'onHeaderClick', 'onFooterClick', 'onBubbleClick']);
  },
  mounted: function mounted() {
    var _this$$refs = this.$refs,
        el = _this$$refs.el,
        nameEl = _this$$refs.nameEl,
        textEl = _this$$refs.textEl,
        avatarEl = _this$$refs.avatarEl,
        headerEl = _this$$refs.headerEl,
        footerEl = _this$$refs.footerEl,
        bubbleEl = _this$$refs.bubbleEl;
    el.addEventListener('click', this.onClick);
    if (nameEl) nameEl.addEventListener('click', this.onNameClick);
    if (textEl) textEl.addEventListener('click', this.onTextClick);
    if (avatarEl) avatarEl.addEventListener('click', this.onAvatarClick);
    if (headerEl) headerEl.addEventListener('click', this.onHeaderClick);
    if (footerEl) footerEl.addEventListener('click', this.onFooterClick);
    if (bubbleEl) bubbleEl.addEventListener('click', this.onBubbleClick);
  },
  beforeDestroy: function beforeDestroy() {
    var _this$$refs2 = this.$refs,
        el = _this$$refs2.el,
        nameEl = _this$$refs2.nameEl,
        textEl = _this$$refs2.textEl,
        avatarEl = _this$$refs2.avatarEl,
        headerEl = _this$$refs2.headerEl,
        footerEl = _this$$refs2.footerEl,
        bubbleEl = _this$$refs2.bubbleEl;
    el.removeEventListener('click', this.onClick);
    if (nameEl) nameEl.removeEventListener('click', this.onNameClick);
    if (textEl) textEl.removeEventListener('click', this.onTextClick);
    if (avatarEl) avatarEl.removeEventListener('click', this.onAvatarClick);
    if (headerEl) headerEl.removeEventListener('click', this.onHeaderClick);
    if (footerEl) footerEl.removeEventListener('click', this.onFooterClick);
    if (bubbleEl) bubbleEl.removeEventListener('click', this.onBubbleClick);
  },
  methods: {
    onClick: function onClick(event) {
      this.dispatchEvent('click', event);
    },
    onNameClick: function onNameClick(event) {
      this.dispatchEvent('click:name clickName', event);
    },
    onTextClick: function onTextClick(event) {
      this.dispatchEvent('click:text clickText', event);
    },
    onAvatarClick: function onAvatarClick(event) {
      this.dispatchEvent('click:avatar clickAvatar', event);
    },
    onHeaderClick: function onHeaderClick(event) {
      this.dispatchEvent('click:header clickHeader', event);
    },
    onFooterClick: function onFooterClick(event) {
      this.dispatchEvent('click:footer clickFooter', event);
    },
    onBubbleClick: function onBubbleClick(event) {
      this.dispatchEvent('click:bubble clickBubble', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};