import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-label',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    floating: Boolean,
    inline: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      inline,
      id,
      style,
      className,
      floating,
    } = props;

    const classes = Utils.classNames(
      className,
      'item-title',
      {
        'item-label-inline': inline,
        'item-label': !floating,
        'item-floating-label': floating,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div id={id} style={style} className={classes}>
        <slot />
      </div>
    );
  },
};
