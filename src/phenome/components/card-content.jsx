import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const CardContentProps = Utils.extend(
  {
    padding: {
      type: Boolean,
      default: true,
    },
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-card-content',
  props: CardContentProps,
  render() {
    return (<div id={this.props.id} style={this.props.style} className={this.classes}><slot /></div>);
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        self.props.className,
        {
          'card-content': true,
          'card-content-padding': self.props.padding,
        },
        Mixins.colorClasses(self),
      );
    },
  },
};
