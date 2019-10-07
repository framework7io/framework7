import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-segmented',
  props: Object.assign({
    id: [String, Number],
    raised: Boolean,
    raisedIos: Boolean,
    raisedMd: Boolean,
    raisedAurora: Boolean,
    round: Boolean,
    roundIos: Boolean,
    roundMd: Boolean,
    roundAurora: Boolean,
    strong: Boolean,
    strongIos: Boolean,
    strongMd: Boolean,
    strongAurora: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var className = props.className,
        raised = props.raised,
        raisedIos = props.raisedIos,
        raisedAurora = props.raisedAurora,
        raisedMd = props.raisedMd,
        round = props.round,
        roundIos = props.roundIos,
        roundAurora = props.roundAurora,
        roundMd = props.roundMd,
        strong = props.strong,
        strongIos = props.strongIos,
        strongMd = props.strongMd,
        strongAurora = props.strongAurora,
        id = props.id,
        style = props.style,
        tag = props.tag;
    var classNames = Utils.classNames(className, {
      segmented: true,
      'segmented-raised': raised,
      'segmented-raised-ios': raisedIos,
      'segmented-raised-aurora': raisedAurora,
      'segmented-raised-md': raisedMd,
      'segmented-round': round,
      'segmented-round-ios': roundIos,
      'segmented-round-aurora': roundAurora,
      'segmented-round-md': roundMd,
      'segmented-strong': strong,
      'segmented-strong-ios': strongIos,
      'segmented-strong-md': strongMd,
      'segmented-strong-aurora': strongAurora
    }, Mixins.colorClasses(props));
    var SegmentedTag = tag;
    return _h(SegmentedTag, {
      style: style,
      class: classNames,
      attrs: {
        id: id
      }
    }, [this.$slots['default']]);
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};