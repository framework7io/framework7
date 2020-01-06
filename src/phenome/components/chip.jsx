import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

// eslint-disable-next-line
import F7Icon from './icon';

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
    ...Mixins.linkIconProps,
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
      icon,
      iconMaterial,
      iconF7,
      iconMd,
      iconIos,
      iconAurora,
      iconColor,
      iconSize,
    } = props;

    let iconEl;
    let mediaEl;
    let labelEl;
    let deleteEl;

    if (icon || iconMaterial || iconF7 || iconMd || iconIos || iconAurora) {
      iconEl = (
        <F7Icon
          material={iconMaterial}
          f7={iconF7}
          icon={icon}
          md={iconMd}
          ios={iconIos}
          aurora={iconAurora}
          color={iconColor}
          size={iconSize}
        />
      );
    }
    if (media || iconEl || (self.slots && self.slots.media)) {
      const mediaClasses = Utils.classNames(
        'chip-media',
        mediaTextColor && `text-color-${mediaTextColor}`,
        mediaBgColor && `bg-color-${mediaBgColor}`,
      );
      mediaEl = (
        <div className={mediaClasses}>
          {iconEl}
          {media}
          <slot name="media" />
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
        <a ref="deleteEl" className="chip-delete" />
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
      <div ref="el" id={id} style={style} className={classes}>
        {mediaEl}
        {labelEl}
        {deleteEl}
      </div>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
  },
  componentDidMount() {
    this.refs.el.addEventListener('click', this.onClick);
    if (this.refs.deleteEl) {
      this.refs.deleteEl.addEventListener('click', this.onDeleteClick);
    }
  },
  componentWillUnmount() {
    this.refs.el.removeEventListener('click', this.onClick);
    if (this.refs.deleteEl) {
      this.refs.deleteEl.removeEventListener('click', this.onDeleteClick);
    }
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
