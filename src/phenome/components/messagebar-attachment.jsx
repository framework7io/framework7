import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-messagebar-attachment',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    image: String,
    deletable: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick', 'onDeleteClick']);
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      deletable,
      image,
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'messagebar-attachment',
      Mixins.colorClasses(props),
    );

    return (
      <div id={id} style={style} className={classes} onClick={self.onClick}>
        {image &&
          <img src={image} />}
        {deletable &&
          <span className="messagebar-attachment-delete" onClick={self.onDeleteClick} />
        }
        <slot />
      </div>
    );
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('attachment:click attachmentClick', event);
    },
    onDeleteClick(event) {
      this.dispatchEvent('attachment:delete attachmentDelete', event);
    },
  },
};
