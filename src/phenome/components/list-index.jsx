
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { ListIndex as ListIndexNamespace } from 'framework7/components/list-index/list-index';
*/

/* phenome-dts-instance
f7ListIndex: ListIndexNamespace.ListIndex
*/

export default {
  name: 'f7-list-index',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    init: {
      type: Boolean,
      default: true,
    },
    listEl: [String, Object],
    indexes: {
      type: [String, Array],
      default: 'auto',
    },
    scrollList: {
      type: Boolean,
      default: true,
    },
    label: {
      type: Boolean,
      default: false,
    },
    iosItemHeight: {
      type: Number,
      default: 14,
    },
    mdItemHeight: {
      type: Number,
      default: 14,
    },
    auroraItemHeight: {
      type: Number,
      default: 14,
    },
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'list-index',
      Mixins.colorClasses(props),
    );

    return (
      <div ref="el" id={id} style={style} className={classes}>
        <slot />
      </div>
    );
  },

  componentWillUnmount() {
    if (!this.props.init) return;
    if (this.f7ListIndex && this.f7ListIndex.destroy) {
      this.f7ListIndex.destroy();
    }
  },
  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready((f7) => {
      const el = self.refs.el;
      const {
        listEl, indexes, iosItemHeight, mdItemHeight, auroraItemHeight, scrollList, label,
      } = self.props;

      self.f7ListIndex = f7.listIndex.create({
        el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        auroraItemHeight,
        scrollList,
        label,
        on: {
          select(index, itemContent, itemIndex) {
            self.dispatchEvent('listindex:select listIndexSelect', itemContent, itemIndex);
          },
        },
      });
    });
  },
  watch: {
    'props.indexes': function watchIndexes() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.params.indexes = this.props.indexes;
      this.update();
    },
  },
  methods: {
    update() {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.update();
    },
    scrollListToIndex(indexContent) {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.scrollListToIndex(indexContent);
    },
  },
};
