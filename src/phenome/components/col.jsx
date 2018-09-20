import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-col',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    tag: {
      type: String,
      default: 'div',
    },
    width: {
      type: [Number, String],
      default: 'auto',
    },
    tabletWidth: {
      type: [Number, String],
    },
    desktopWidth: {
      type: [Number, String],
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
      width,
      tabletWidth,
      desktopWidth,
    } = props;

    const ColTag = tag;

    const classes = Utils.classNames(
      className,
      {
        col: width === 'auto',
        [`col-${width}`]: width !== 'auto',
        [`tablet-${tabletWidth}`]: tabletWidth,
        [`desktop-${desktopWidth}`]: desktopWidth,
      },
      Mixins.colorClasses(props),
    );

    return (
      <ColTag id={id} style={style} className={classes} onClick={self.onClick.bind(self)}>
        <slot />
      </ColTag>
    );
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
