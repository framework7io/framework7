import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-login-screen-title',
  props: {
    id: [String, Number],
    ...Mixins.colorProps,
  },
  render() {
    const classes = Utils.classNames(
      this.props.className,
      'login-screen-title',
      Mixins.colorClasses(this),
    );
    return (<div id={this.props.id} style={this.props.style} className={classes}><slot /></div>);
  },
};

