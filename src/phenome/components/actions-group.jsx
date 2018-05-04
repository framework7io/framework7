import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-actions-group',
  props: Mixins.colorProps,
  render() {
    const self = this;

    const classes = Utils.classNames(
      self.props.className,
      { 'actions-group': true },
    );

    return (
      <div id={self.props.id} style={self.props.style} className={classes}>
        <slot />
      </div>
    );
  },
};
