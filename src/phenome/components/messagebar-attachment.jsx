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
    this.onClickBound = this.onClick.bind(this);
    this.onDeleteClickBound = this.onDeleteClick.bind(this);
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
      <div id={id} style={style} className={classes} onClick={self.onClickBound}>
        {image &&
          <img src={image} />}
        {deletable &&
          <span className="messagebar-attachment-delete" onClick={self.onDeleteClickBound} />
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
