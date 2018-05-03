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

    if (inline) {
      /*
      TODO: SET inlineLabelForced
      let $parent = self.$parent;
      let foundItemContent;
      while ($parent && !foundItemContent) {
        const tag = $parent.$vnode && $parent.$vnode.tag;
        if (tag && (tag.indexOf('list-item') > 0 || tag.indexOf('list-item-content') > 0)) {
          foundItemContent = $parent;
        }
        $parent = $parent.$parent;
      }
      if (foundItemContent) foundItemContent.inlineLabelForced = true;
      */
    }

    const classes = Utils.classNames(
      className,
      'item-title',
      {
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
