import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-progressbar',
  props: {
    id: [
      String,
      Number
    ],
    progress: Number,
    infinite: Boolean,
    ...Mixins.colorProps
  },
  render() {
    const _h = this.$createElement;
    const self = this;
    const {progress, id, style} = self.props;
    const transformStyle = {
      transform: progress ? `translate3d(${ -100 + progress }%, 0, 0)` : '',
      webkitTransform: progress ? `translate3d(${ -100 + progress }%, 0, 0)` : ''
    };
    return _h('span', {
      ref: 'el',
      style: style,
      class: self.classes,
      attrs: {
        id: id,
        'data-progress': progress
      }
    }, [_h('span', { style: transformStyle })]);
  },
  computed: {
    classes() {
      return Utils.classNames(this.props.className, {
        progressbar: true,
        'progressbar-infinite': this.props.infinite
      }, Mixins.colorClasses(this));
    },
    props() {
      return __vueComponentProps(this);
    }
  },
  methods: {
    set(progress, speed) {
      const self = this;
      if (!self.$f7)
        return;
      self.$f7.progressbar.set(self.$refs.el, progress, speed);
    }
  }
};