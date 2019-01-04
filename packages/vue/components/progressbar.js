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

  render() {
    const _h = this.$createElement;
    const self = this;
    const props = self.props;
    const {
      progress,
      id,
      style,
      infinite,
      className
    } = props;
    const transformStyle = {
      transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
      WebkitTransform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : ''
    };
    const classes = Utils.classNames(className, 'progressbar', {
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
    set(progress, speed) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.progressbar.set(self.$refs.el, progress, speed);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};