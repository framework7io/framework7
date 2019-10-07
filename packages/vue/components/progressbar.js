import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-progressbar',
  props: Object.assign({
    id: [String, Number],
    progress: Number,
    infinite: Boolean
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var progress = props.progress,
        id = props.id,
        style = props.style,
        infinite = props.infinite,
        className = props.className;
    var transformStyle = {
      transform: progress ? "translate3d(".concat(-100 + progress, "%, 0, 0)") : '',
      WebkitTransform: progress ? "translate3d(".concat(-100 + progress, "%, 0, 0)") : ''
    };
    var classes = Utils.classNames(className, 'progressbar', {
      'progressbar-infinite': infinite
    }, Mixins.colorClasses(props));
    return _h('span', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id,
        'data-progress': progress
      }
    }, [_h('span', {
      style: transformStyle
    })]);
  },
  methods: {
    set: function set(progress, speed) {
      var self = this;
      if (!self.$f7) return;
      self.$f7.progressbar.set(self.$refs.el, progress, speed);
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};