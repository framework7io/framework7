import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-chip',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    media: String,
    text: [String, Number],
    deleteable: Boolean,
    mediaBgColor: String,
    mediaTextColor: String,
    outline: Boolean,
    ...Mixins.colorProps,
  },
  render() {
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
      outline,
    } = props;

    let mediaEl;
    let labelEl;
    let deleteEl;
    if (media || (self.slots && self.slots.media)) {
      const mediaClasses = Utils.classNames(
        'chip-media',
        mediaTextColor && `text-color-${mediaTextColor}`,
        mediaBgColor && `bg-color-${mediaBgColor}`,
      );
      mediaEl = (
        <div className={mediaClasses}>
          {media || (<slot name="media" />)}
        </div>
      );
    }
    if (text || (self.slots && self.slots.text)) {
      labelEl = (
        <div className="chip-label">
          {text}
          <slot name="text" />
        </div>
      );
    }
    if (deleteable) {
      deleteEl = (
        <a href="#" className="chip-delete" onClick={self.onDeleteClick} />
      );
    }

    const classes = Utils.classNames(
      className,
      'chip',
      {
        'chip-outline': outline,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div id={id} style={style} className={classes} onClick={self.onClick}>
        {mediaEl}
        {labelEl}
        {deleteEl}
      </div>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick', 'onDeleteClick'])
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onDeleteClick(event) {
      this.dispatchEvent('delete', event);
    },
  },
};
