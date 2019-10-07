import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-messages',
  props: Object.assign({
    id: [String, Number],
    autoLayout: {
      type: Boolean,
      default: false
    },
    messages: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    newMessagesFirst: {
      type: Boolean,
      default: false
    },
    scrollMessages: {
      type: Boolean,
      default: true
    },
    scrollMessagesOnEdge: {
      type: Boolean,
      default: true
    },
    firstMessageRule: Function,
    lastMessageRule: Function,
    tailMessageRule: Function,
    sameNameMessageRule: Function,
    sameHeaderMessageRule: Function,
    sameFooterMessageRule: Function,
    sameAvatarMessageRule: Function,
    customClassMessageRule: Function,
    renderMessage: Function,
    init: {
      type: Boolean,
      default: true
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        style = props.style,
        className = props.className;
    var classes = Utils.classNames(className, 'messages', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },
  beforeUpdate: function beforeUpdate() {
    var self = this;
    if (!self.props.init) return;
    var el = self.$refs.el;
    if (!el) return;
    var children = el.children;
    if (!children) return;

    for (var i = 0; i < children.length; i += 1) {
      children[i].classList.add('message-appeared');
    }
  },
  updated: function updated() {
    var self = this;
    var _self$props = self.props,
        init = _self$props.init,
        autoLayout = _self$props.autoLayout,
        scrollMessages = _self$props.scrollMessages;
    if (!init) return;
    var el = self.$refs.el;
    if (!el) return;
    var children = el.children;
    if (!children) return;

    for (var i = 0; i < children.length; i += 1) {
      if (!children[i].classList.contains('message-appeared')) {
        children[i].classList.add('message-appear-from-bottom');
      }
    }

    if (self.f7Messages && self.f7Messages.layout && autoLayout) {
      self.f7Messages.layout();
    }

    if (self.f7Messages && self.f7Messages.scroll && scrollMessages) {
      self.f7Messages.scroll();
    }
  },
  mounted: function mounted() {
    var self = this;
    var _self$props2 = self.props,
        init = _self$props2.init,
        autoLayout = _self$props2.autoLayout,
        messages = _self$props2.messages,
        newMessagesFirst = _self$props2.newMessagesFirst,
        scrollMessages = _self$props2.scrollMessages,
        scrollMessagesOnEdge = _self$props2.scrollMessagesOnEdge,
        firstMessageRule = _self$props2.firstMessageRule,
        lastMessageRule = _self$props2.lastMessageRule,
        tailMessageRule = _self$props2.tailMessageRule,
        sameNameMessageRule = _self$props2.sameNameMessageRule,
        sameHeaderMessageRule = _self$props2.sameHeaderMessageRule,
        sameFooterMessageRule = _self$props2.sameFooterMessageRule,
        sameAvatarMessageRule = _self$props2.sameAvatarMessageRule,
        customClassMessageRule = _self$props2.customClassMessageRule,
        renderMessage = _self$props2.renderMessage;
    if (!init) return;
    self.$f7ready(function (f7) {
      self.f7Messages = f7.messages.create(Utils.noUndefinedProps({
        el: self.$refs.el,
        autoLayout: autoLayout,
        messages: messages,
        newMessagesFirst: newMessagesFirst,
        scrollMessages: scrollMessages,
        scrollMessagesOnEdge: scrollMessagesOnEdge,
        firstMessageRule: firstMessageRule,
        lastMessageRule: lastMessageRule,
        tailMessageRule: tailMessageRule,
        sameNameMessageRule: sameNameMessageRule,
        sameHeaderMessageRule: sameHeaderMessageRule,
        sameFooterMessageRule: sameFooterMessageRule,
        sameAvatarMessageRule: sameAvatarMessageRule,
        customClassMessageRule: customClassMessageRule,
        renderMessage: renderMessage
      }));
    });
  },
  beforeDestroy: function beforeDestroy() {
    if (this.f7Messages && this.f7Messages.destroy) this.f7Messages.destroy();
  },
  methods: {
    renderMessages: function renderMessages(messagesToRender, method) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.renderMessages(messagesToRender, method);
    },
    layout: function layout() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.layout();
    },
    scroll: function scroll(duration, scrollTop) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.scroll(duration, scrollTop);
    },
    clear: function clear() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.clear();
    },
    removeMessage: function removeMessage(messageToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.removeMessage(messageToRemove, layout);
    },
    removeMessages: function removeMessages(messagesToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.removeMessages(messagesToRemove, layout);
    },
    addMessage: function addMessage() {
      var _this$f7Messages;

      if (!this.f7Messages) return undefined;
      return (_this$f7Messages = this.f7Messages).addMessage.apply(_this$f7Messages, arguments);
    },
    addMessages: function addMessages() {
      var _this$f7Messages2;

      if (!this.f7Messages) return undefined;
      return (_this$f7Messages2 = this.f7Messages).addMessages.apply(_this$f7Messages2, arguments);
    },
    showTyping: function showTyping(message) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.showTyping(message);
    },
    hideTyping: function hideTyping() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.hideTyping();
    },
    destroy: function destroy() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.destroy();
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};