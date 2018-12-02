import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-row',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    noGap: Boolean,
    tag: {
      type: String,
      default: 'div',
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tag,
      noGap,
    } = props;

    const RowTag = tag;

    const classes = Utils.classNames(
      className,
      'row',
      {
        'no-gap': noGap,
      },
      Mixins.colorClasses(props),
    );

    return (
      <RowTag id={id} style={style} className={classes} ref="el">
        <slot />
      </RowTag>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick'])
  },
  componentDidMount() {
    this.refs.el.addEventListener('click', this.onClick);
  },
  componentWillUnmount() {
    this.refs.el.removeEventListener('click', this.onClick);
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
