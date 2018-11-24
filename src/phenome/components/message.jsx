import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-message',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    text: String,
    name: String,
    avatar: String,
    type: {
      type: String,
      default: 'sent',
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
    typing: Boolean,
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onClick',
      'onNameClick',
      'onTextClick',
      'onAvatarClick',
      'onHeaderClick',
      'onFooterClick',
      'onBubbleClick',
    ]);
  },
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
      style,
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
      'bubble-end': slotsBubbleEnd,
    } = self.slots;

    return (
      <div id={id} style={style} className={self.classes} onClick={self.onClick}>
        {slotsStart}
        {(avatar || slotsAvatar) &&
          <div
            className="message-avatar"
            style={{ backgroundImage: avatar && `url(${avatar})` }}
            onClick={self.onAvatarClick}
          >{slotsAvatar}</div>
        }
        <div className="message-content">
          {slotsContentStart}
          {(slotsName || name) &&
            <div className="message-name" onClick={self.onNameClick}>
              {slotsName || name}
            </div>
          }
          {(slotsHeader || header) &&
            <div className="message-header" onClick={self.onHeaderClick}>
              {slotsHeader || header}
            </div>
          }
          <div className="message-bubble" onClick={self.onBubbleClick}>
            {slotsBubbleStart}
            {(slotsImage || image) &&
              <div className="message-image">
                {slotsImage || <img src={image} />}
              </div>
            }
            {(slotsTextHeader || textHeader) &&
              <div className="message-text-header">
                {slotsTextHeader || textHeader}
              </div>
            }
            {(slotsText || text || typing) &&
              <div className="message-text" onClick={self.onTextClick}>
                {slotsText || text}
                {typing &&
                  <div className="message-typing-indicator">
                    <div />
                    <div />
                    <div />
                  </div>
                }
              </div>
            }
            {(slotsTextFooter || textFooter) &&
              <div className="message-text-footer">
                {slotsTextFooter || textFooter}
              </div>
            }
            {slotsBubbleEnd}
            {slotsDefault}
          </div>
          {(slotsFooter || footer) &&
            <div className="message-footer" onClick={self.onFooterClick}>
              {slotsFooter || footer}
            </div>
          }
          {slotsContentEnd}
        </div>
        {slotsEnd}
      </div>
    );
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
        className,
      } = props;

      return Utils.classNames(
        className,
        'message',
        {
          'message-sent': type === 'sent',
          'message-received': type === 'received',
          'message-typing': typing,
          'message-first': first,
          'message-last': last,
          'message-tail': tail,
          'message-same-name': sameName,
          'message-same-header': sameHeader,
          'message-same-footer': sameFooter,
          'message-same-avatar': sameAvatar,
        },
        Mixins.colorClasses(props),
      );
    },
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
  },
};
