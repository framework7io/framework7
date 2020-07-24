import Utils from '../utils/utils';

export default {
  name: 'f7-swiper-slide',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    zoom: Boolean,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      zoom,
    } = props;

    const classes = Utils.classNames(
      className,
      'swiper-slide',
    );

    return (
      <div id={id} style={style} className={classes}>
        {zoom ? (
          <div className="swiper-zoom-container">
            <slot />
          </div>
        ) : (
          <slot />
        )}
      </div>
    );
  },

};
