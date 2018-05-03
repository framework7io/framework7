import Utils from '../utils/utils';

export default {
  name: 'f7-swiper-slide',
  render() {
    const classes = Utils.classNames(
      this.props.className,
      'swiper-slide',
    );

    return (
      <div id={this.props.id} style={this.props.style} className={classes}>
        {this.props.zoom ? (
          <div className="swiper-zoom-container">
            <slot />
          </div>
        ) : (
          <slot />
        )}
      </div>
    );
  },
  props: {
    zoom: Boolean,
  },
};
