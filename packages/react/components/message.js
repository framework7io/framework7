import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Message extends React.Component {
  constructor(props, context) {
    super(props, context);

    (() => {
      this.onClickBound = this.onClick.bind(this);
      this.onNameClickBound = this.onNameClick.bind(this);
      this.onTextClickBound = this.onTextClick.bind(this);
      this.onAvatarClickBound = this.onAvatarClick.bind(this);
      this.onHeaderClickBound = this.onHeaderClick.bind(this);
      this.onFooterClickBound = this.onFooterClick.bind(this);
      this.onBubbleClickBound = this.onBubbleClick.bind(this);
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
      id: id,
      style: style,
      className: self.classes,
      onClick: self.onClickBound
    }, slotsStart, (avatar || slotsAvatar) && React.createElement('div', {
      className: 'message-avatar',
      style: {
        backgroundImage: avatar && `url(${avatar})`
      },
      onClick: self.onAvatarClickBound
    }, slotsAvatar), React.createElement('div', {
      className: 'message-content'
    }, slotsContentStart, (slotsName || name) && React.createElement('div', {
      className: 'message-name',
      onClick: self.onNameClickBound
    }, slotsName || name), (slotsHeader || header) && React.createElement('div', {
      className: 'message-header',
      onClick: self.onHeaderClickBound
    }, slotsHeader || header), React.createElement('div', {
      className: 'message-bubble',
      onClick: self.onBubbleClickBound
    }, slotsBubbleStart, (slotsImage || image) && React.createElement('div', {
      className: 'message-image'
    }, slotsImage || React.createElement('img', {
      src: image
    })), (slotsTextHeader || textHeader) && React.createElement('div', {
      className: 'message-text-header'
    }, slotsTextHeader || textHeader), (slotsText || text || typing) && React.createElement('div', {
      className: 'message-text',
      onClick: self.onTextClickBound
    }, slotsText || text, typing && React.createElement('div', {
      className: 'message-typing-indicator'
    }, React.createElement('div', null), React.createElement('div', null), React.createElement('div', null))), (slotsTextFooter || textFooter) && React.createElement('div', {
      className: 'message-text-footer'
    }, slotsTextFooter || textFooter), slotsBubbleEnd, slotsDefault), (slotsFooter || footer) && React.createElement('div', {
      className: 'message-footer',
      onClick: self.onFooterClickBound
    }, slotsFooter || footer), slotsContentEnd), slotsEnd);
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

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