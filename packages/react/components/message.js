import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Message extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onClick', 'onNameClick', 'onTextClick', 'onAvatarClick', 'onHeaderClick', 'onFooterClick', 'onBubbleClick']);
    })();
  }

  onClick(event) {
    this.dispatchEvent('click', event);
  }

  onNameClick(event) {
    this.dispatchEvent('click:name clickName', event);
  }

  onTextClick(event) {
    this.dispatchEvent('click:text clickText', event);
  }

  onAvatarClick(event) {
    this.dispatchEvent('click:avatar clickAvatar', event);
  }

  onHeaderClick(event) {
    this.dispatchEvent('click:header clickHeader', event);
  }

  onFooterClick(event) {
    this.dispatchEvent('click:footer clickFooter', event);
  }

  onBubbleClick(event) {
    this.dispatchEvent('click:bubble clickBubble', event);
  }

  get classes() {
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
  }

  render() {
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
    } = self.slots;
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: self.classes
    }, slotsStart, (avatar || slotsAvatar) && React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['avatarEl'] = __reactNode;
      },
      className: 'message-avatar',
      style: {
        backgroundImage: avatar && `url(${avatar})`
      }
    }, slotsAvatar), React.createElement('div', {
      className: 'message-content'
    }, slotsContentStart, (slotsName || name) && React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['nameEl'] = __reactNode;
      },
      className: 'message-name'
    }, slotsName || name), (slotsHeader || header) && React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['headerEl'] = __reactNode;
      },
      className: 'message-header'
    }, slotsHeader || header), React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['bubbleEl'] = __reactNode;
      },
      className: 'message-bubble'
    }, slotsBubbleStart, (slotsImage || image) && React.createElement('div', {
      className: 'message-image'
    }, slotsImage || React.createElement('img', {
      src: image
    })), (slotsTextHeader || textHeader) && React.createElement('div', {
      className: 'message-text-header'
    }, slotsTextHeader || textHeader), (slotsText || text || typing) && React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['textEl'] = __reactNode;
      },
      className: 'message-text'
    }, slotsText || text, typing && React.createElement('div', {
      className: 'message-typing-indicator'
    }, React.createElement('div', null), React.createElement('div', null), React.createElement('div', null))), (slotsTextFooter || textFooter) && React.createElement('div', {
      className: 'message-text-footer'
    }, slotsTextFooter || textFooter), slotsBubbleEnd, slotsDefault), (slotsFooter || footer) && React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['footerEl'] = __reactNode;
      },
      className: 'message-footer'
    }, slotsFooter || footer), slotsContentEnd), slotsEnd);
  }

  componentWillUnmount() {
    const {
      el,
      nameEl,
      textEl,
      avatarEl,
      headerEl,
      footerEl,
      bubbleEl
    } = this.refs;
    el.removeEventListener('click', this.onClick);
    if (nameEl) nameEl.removeEventListener('click', this.onNameClick);
    if (textEl) textEl.removeEventListener('click', this.onTextClick);
    if (avatarEl) avatarEl.removeEventListener('click', this.onAvatarClick);
    if (headerEl) headerEl.removeEventListener('click', this.onHeaderClick);
    if (footerEl) footerEl.removeEventListener('click', this.onFooterClick);
    if (bubbleEl) bubbleEl.removeEventListener('click', this.onBubbleClick);
  }

  componentDidMount() {
    const {
      el,
      nameEl,
      textEl,
      avatarEl,
      headerEl,
      footerEl,
      bubbleEl
    } = this.refs;
    el.addEventListener('click', this.onClick);
    if (nameEl) nameEl.addEventListener('click', this.onNameClick);
    if (textEl) textEl.addEventListener('click', this.onTextClick);
    if (avatarEl) avatarEl.addEventListener('click', this.onAvatarClick);
    if (headerEl) headerEl.addEventListener('click', this.onHeaderClick);
    if (footerEl) footerEl.addEventListener('click', this.onFooterClick);
    if (bubbleEl) bubbleEl.addEventListener('click', this.onBubbleClick);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

}

__reactComponentSetProps(F7Message, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
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
}, Mixins.colorProps));

F7Message.displayName = 'f7-message';
export default F7Message;