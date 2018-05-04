import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-list-group',
  props: {
    mediaList: Boolean,
    sortable: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const {
      className,
      id,
      style,
      mediaList,
      sortable,
    } = self.props;

    const classes = Utils.classNames(
      className,
      'list-group',
      {
        'media-list': mediaList,
        sortable,
      },
      Mixins.colorClasses(self),
    );

    return (
      <div id={id} style={style} className={classes}>
        <ul>
          <slot />
        </ul>
      </div>
    );
  },
};
