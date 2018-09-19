import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-progressbar',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    progress: Number,
    infinite: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const { progress, id, style, infinite, className } = props;
    const transformStyle = {
      transform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
      WebkitTransform: progress ? `translate3d(${-100 + progress}%, 0, 0)` : '',
    };

    const classes = Utils.classNames(
      className,
      'progressbar',
      {
        'progressbar-infinite': infinite,
      },
      Mixins.colorClasses(props),
    );

    return (
      <span
        ref="el"
        id={id}
        style={style}
        className={classes}
        data-progress={progress}
      >
        <span style={transformStyle} />
      </span>
    );
  },
  methods: {
    set(progress, speed) {
      const self = this;
      if (!self.$f7) return;
      self.$f7.progressbar.set(self.refs.el, progress, speed);
    },
  },
};
