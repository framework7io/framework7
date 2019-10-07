import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-group',
  props: Object.assign({
    id: [String, Number],
    mediaList: Boolean,
    sortable: Boolean,
    sortableTapHold: Boolean,
    sortableMoveElements: {
      type: Boolean,
      default: undefined
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        id = props.id,
        style = props.style,
        mediaList = props.mediaList,
        sortable = props.sortable,
        sortableTapHold = props.sortableTapHold,
        sortableMoveElements = props.sortableMoveElements;
    var classes = Utils.classNames(className, 'list-group', {
      'media-list': mediaList,
      sortable: sortable,
      'sortable-tap-hold': sortableTapHold
    }, Mixins.colorClasses(props));
    return _h('div', {
      style: style,
      class: classes,
      attrs: {
        id: id,
        'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
      }
    }, [_h('ul', [this.$slots['default']])]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};