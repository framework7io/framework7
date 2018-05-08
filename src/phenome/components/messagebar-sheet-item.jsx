import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-messagebar-sheet-item',
  props: {
    id: [String, Number],
    ...Mixins.colorProps,
  },
  render() {
    const classes = Utils.classNames(
      this.props.className,
      'messagebar-sheet-item',
      Mixins.colorClasses(this),
    );
    return (<div id={this.props.id} style={this.props.style} className={classes}><slot /></div>);
  },
};

