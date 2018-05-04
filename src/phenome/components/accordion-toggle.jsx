import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  props: Mixins.colorProps,
  name: 'f7-accordion-toggle',
  render() {
    const classes = Utils.classNames(
      this.props.className,
      {
        'accordion-item-toggle': true,
      },
      Mixins.colorClasses(this),
    );
    return (
      <div id={this.props.id} style={this.props.style} className={classes}>
        <slot />
      </div>
    );
  },
};
