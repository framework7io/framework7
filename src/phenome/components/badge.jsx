import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-badge',
  props: Mixins.colorProps,
  render() {
    const classes = Utils.classNames(
      this.props.className,
      'badge',
      Mixins.colorClasses(this),
    );
    return <span id={this.props.id} style={this.props.style} className={classes}><slot /></span>;
  },
};
