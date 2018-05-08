import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-preloader',
  props: {
    id: [String, Number],
    size: [Number, String],
    ...Mixins.colorProps,
  },
  render() {
    const { classes, sizeComputed } = this;
    const { id, style } = this.props;

    const preloaderStyle = {};
    if (sizeComputed) {
      preloaderStyle.width = `${sizeComputed}px`;
      preloaderStyle.height = `${sizeComputed}px`;
    }
    if (style) Utils.extend(preloaderStyle, style || {});

    let innerEl;
    if (this.$theme.md) {
      innerEl = (
        <span className="preloader-inner">
          <span className="preloader-inner-gap" />
          <span className="preloader-inner-left">
            <span className="preloader-inner-half-circle" />
          </span>
          <span className="preloader-inner-right">
            <span className="preloader-inner-half-circle" />
          </span>
        </span>
      );
    }
    return (
      <span id={id} style={preloaderStyle} className={classes}>
        {innerEl}
      </span>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        'preloader',
        Mixins.colorClasses(this),
      );
    },
    sizeComputed() {
      let s = this.props.size;
      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }
      return s;
    },
  },
};
