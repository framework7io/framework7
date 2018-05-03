import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const ColProps = Utils.extend(
  {
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
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-col',
  props: ColProps,
  render() {
    const self = this;

    const ColTag = self.props.tag;

    return (
      <ColTag id={this.props.id} style={this.props.style} className={self.classes}>
        <slot />
      </ColTag>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          col: self.props.width === 'auto',
          [`col-${self.props.width}`]: self.props.width !== 'auto',
          [`tablet-${self.props.tabletWidth}`]: self.props.tabletWidth,
          [`desktop-${self.props.desktopWidth}`]: self.props.desktopWidth,
        },
        Mixins.colorClasses(self),
      );
    },
  },
};
