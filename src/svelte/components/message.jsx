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
      <div ref="el" id={id} style={style} className={self.classes}>
        {slotsStart}
        {(avatar || slotsAvatar) &&
          <div
            ref="avatarEl"
            className="message-avatar"
            style={{ backgroundImage: avatar && `url(${avatar})` }}
          >{slotsAvatar}</div>
        }
        <div className="message-content">
          {slotsContentStart}
          {(slotsName || name) &&
            <div ref="nameEl" className="message-name">
              {slotsName || name}
            </div>
          }
          {(slotsHeader || header) &&
            <div ref="headerEl" className="message-header">
              {slotsHeader || header}
            </div>
          }
          <div ref="bubbleEl" className="message-bubble">
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
              <div ref="textEl" className="message-text">
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
            <div ref="footerEl" className="message-footer">
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
  componentDidMount() {
    const { el, nameEl, textEl, avatarEl, headerEl, footerEl, bubbleEl } = this.refs;
    el.addEventListener('click', this.onClick);
    if (nameEl) nameEl.addEventListener('click', this.onNameClick);
    if (textEl) textEl.addEventListener('click', this.onTextClick);
    if (avatarEl) avatarEl.addEventListener('click', this.onAvatarClick);
    if (headerEl) headerEl.addEventListener('click', this.onHeaderClick);
    if (footerEl) footerEl.addEventListener('click', this.onFooterClick);
    if (bubbleEl) bubbleEl.addEventListener('click', this.onBubbleClick);
  },
  componentWillUnmount() {
    const { el, nameEl, textEl, avatarEl, headerEl, footerEl, bubbleEl } = this.refs;
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
  },
};
