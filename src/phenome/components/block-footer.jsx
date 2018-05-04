import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-block-footer',
  props: Mixins.colorProps,
  render() {
    const classes = Utils.classNames(
      this.props.className,
      'block-footer',
      Mixins.colorClasses(this),
    );
    return (<div id={this.props.id} style={this.props.style} className={classes}><slot /></div>);
  },
};
