
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

const ListIndexProps = Utils.extend(
  {
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
  },
  Mixins.colorProps,
);

export default {
  name: 'f7-list-index',
  props: ListIndexProps,
  render() {
    return (
      <div ref="el" id={this.props.id} style={this.props.style} className={this.classes}>
        <slot />
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(
        this.props.className,
        'list-index',
        Mixins.colorClasses(self),
      );
    },
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
        listEl, indexes, iosItemHeight, mdItemHeight, scrollList, label,
      } = self.props;

      self.f7ListIndex = f7.listIndex.create({
        el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
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
      this.f7ListIndex.params.indexes = this.indexes;
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
