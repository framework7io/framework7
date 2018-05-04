import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-label',
  props: {
    floating: Boolean,
    inline: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;

    const {
      inline,
      id,
      style,
      className,
      floating,
    } = self.props;

    const classes = Utils.classNames(
      className,
      'item-title',
      {
        'item-label-inline': inline,
        'item-label': !floating,
        'item-floating-label': floating,
      },
      Mixins.colorClasses(self),
    );

    return (
      <div id={id} style={style} className={classes}>
        <slot />
      </div>
    );
  },
};
