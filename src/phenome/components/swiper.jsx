import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-swiper',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    params: Object,
    pagination: Boolean,
    scrollbar: Boolean,
    navigation: Boolean,
    init: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      className,
    } = props;

    let paginationEl;
    let scrollbarEl;
    let buttonNextEl;
    let buttonPrevEl;
    if (self.paginationComputed) {
      paginationEl = <div ref="paginationEl" className="swiper-pagination" />;
    }
    if (self.scrollbarComputed) {
      scrollbarEl = <div ref="scrollbarEl" className="swiper-scrollbar" />;
    }
    if (self.navigationComputed) {
      buttonNextEl = <div ref="nextEl" className="swiper-button-next" />;
      buttonPrevEl = <div ref="prevEl" className="swiper-button-prev" />;
    }

    const classes = Utils.classNames(
      className,
      'swiper-container',
      Mixins.colorClasses(props),
    );
    return (
      <div id={id} style={style} ref="el" className={classes}>
        <slot name="before-wrapper" />
        <div className="swiper-wrapper">
          <slot />
        </div>
        {paginationEl}
        {scrollbarEl}
        {buttonPrevEl}
        {buttonNextEl}
        <slot name="after-wrapper" />
      </div>
    );
  },
  computed: {
    paginationComputed() {
      const self = this;
      const { pagination, params } = self.props;
      if (pagination === true || (params && params.pagination && !params.pagination.el)) {
        return true;
      }
      return false;
    },
    scrollbarComputed() {
      const self = this;
      const { scrollbar, params } = self.props;
      if (scrollbar === true || (params && params.scrollbar && !params.scrollbar.el)) {
        return true;
      }
      return false;
    },
    navigationComputed() {
      const self = this;
      const { navigation, params } = self.props;
      if (navigation === true || (params && params.navigation && !params.navigation.nextEl && !params.navigation.prevEl)) {
        return true;
      }
      return false;
    },
  },
  componentDidUpdate() {
    const self = this;
    if (!self.initialUpdate) {
      self.initialUpdate = true;
      return;
    }
    if (self.swiper && self.swiper.update) self.swiper.update();
  },
  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready((f7) => {
      const newParams = {
        pagination: {},
        navigation: {},
        scrollbar: {},
      };
      const { params, pagination, navigation, scrollbar } = self.props;
      if (params) Utils.extend(newParams, params);
      if (pagination && !newParams.pagination.el) newParams.pagination.el = self.refs.paginationEl;
      if (navigation && !newParams.navigation.nextEl && !newParams.navigation.prevEl) {
        newParams.navigation.nextEl = self.refs.nextEl;
        newParams.navigation.prevEl = self.refs.prevEl;
      }
      if (scrollbar && !newParams.scrollbar.el) newParams.scrollbar.el = self.refs.scrollbarEl;

      self.swiper = f7.swiper.create(self.refs.el, newParams);
    });
  },
  componentWillUnmount() {
    const self = this;
    if (!self.props.init) return;
    if (self.swiper && self.swiper.destroy) self.swiper.destroy();
  },
};
