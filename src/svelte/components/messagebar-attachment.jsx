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
      <div ref="el" id={id} style={style} className={classes}>
        {image &&
          <img src={image} />}
        {deletable &&
          <span ref="deleteEl" className="messagebar-attachment-delete" />
        }
        <slot />
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
      this.dispatchEvent('attachment:click attachmentClick', event);
    },
    onDeleteClick(event) {
      this.dispatchEvent('attachment:delete attachmentDelete', event);
    },
  },
};
