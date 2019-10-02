import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-preloader',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    size: [Number, String],
    ...Mixins.colorProps,
  },
  state() {
    const self = this;
    const $f7 = self.$f7;
    if (!$f7) {
      self.$f7ready(() => {
        self.setState({ _theme: self.$theme });
      });
    }
    return {
      _theme: $f7 ? self.$theme : null,
    };
  },
  render() {
    const self = this;
    const { sizeComputed, props } = self;
    const { id, style, className } = props;
    // eslint-disable-next-line
    const theme = self.state._theme;

    const preloaderStyle = {};
    if (sizeComputed) {
      preloaderStyle.width = `${sizeComputed}px`;
      preloaderStyle.height = `${sizeComputed}px`;
      preloaderStyle['--f7-preloader-size'] = `${sizeComputed}px`;
    }
    if (style) Utils.extend(preloaderStyle, style || {});

    let innerEl;
    if (theme && theme.md) {
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
    } else if (theme && theme.ios) {
      innerEl = (
        <span className="preloader-inner">
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
          <span className="preloader-inner-line"></span>
        </span>
      );
    } else if (theme && theme.aurora) {
      innerEl = (
        <span className="preloader-inner">
          <span className="preloader-inner-circle"></span>
        </span>
      );
    }

    const classes = Utils.classNames(
      className,
      'preloader',
      Mixins.colorClasses(props),
    );
    return (
      <span id={id} style={preloaderStyle} className={classes}>
        {innerEl}
      </span>
    );
  },
  computed: {
    sizeComputed() {
      let s = this.props.size;
      if (s && typeof s === 'string' && s.indexOf('px') >= 0) {
        s = s.replace('px', '');
      }
      return s;
    },
  },
};
