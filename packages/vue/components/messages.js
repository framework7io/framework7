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

      default() {
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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    const classes = Utils.classNames(className, 'messages', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },

  beforeUpdate() {
    const self = this;
    if (!self.props.init) return;
    const el = self.$refs.el;
    if (!el) return;
    const children = el.children;
    if (!children) return;

    for (let i = 0; i < children.length; i += 1) {
      children[i].classList.add('message-appeared');
    }
  },

  updated() {
    const self = this;
    const {
      init,
      autoLayout,
      scrollMessages
    } = self.props;
    if (!init) return;
    const el = self.$refs.el;
    if (!el) return;
    const children = el.children;
    if (!children) return;

    for (let i = 0; i < children.length; i += 1) {
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

  mounted() {
    const self = this;
    const {
      init,
      autoLayout,
      messages,
      newMessagesFirst,
      scrollMessages,
      scrollMessagesOnEdge,
      firstMessageRule,
      lastMessageRule,
      tailMessageRule,
      sameNameMessageRule,
      sameHeaderMessageRule,
      sameFooterMessageRule,
      sameAvatarMessageRule,
      customClassMessageRule,
      renderMessage
    } = self.props;
    if (!init) return;
    self.$f7ready(f7 => {
      self.f7Messages = f7.messages.create(Utils.noUndefinedProps({
        el: self.$refs.el,
        autoLayout,
        messages,
        newMessagesFirst,
        scrollMessages,
        scrollMessagesOnEdge,
        firstMessageRule,
        lastMessageRule,
        tailMessageRule,
        sameNameMessageRule,
        sameHeaderMessageRule,
        sameFooterMessageRule,
        sameAvatarMessageRule,
        customClassMessageRule,
        renderMessage
      }));
    });
  },

  beforeDestroy() {
    if (this.f7Messages && this.f7Messages.destroy) this.f7Messages.destroy();
  },

  methods: {
    renderMessages(messagesToRender, method) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.renderMessages(messagesToRender, method);
    },

    layout() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.layout();
    },

    scroll(duration, scrollTop) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.scroll(duration, scrollTop);
    },

    clear() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.clear();
    },

    removeMessage(messageToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.removeMessage(messageToRemove, layout);
    },

    removeMessages(messagesToRemove, layout) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.removeMessages(messagesToRemove, layout);
    },

    addMessage(...args) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.addMessage(...args);
    },

    addMessages(...args) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.addMessages(...args);
    },

    showTyping(message) {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.showTyping(message);
    },

    hideTyping() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.hideTyping();
    },

    destroy() {
      if (!this.f7Messages) return undefined;
      return this.f7Messages.destroy();
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};