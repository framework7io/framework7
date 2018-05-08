import Utils from '../utils/utils';

export default {
  name: 'f7-swiper-slide',
  props: {
    id: [String, Number],
    zoom: Boolean,
  },
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

};
