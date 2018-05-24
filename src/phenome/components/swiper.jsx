import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-swiper',
  props: {
    id: [String, Number],
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
    return (
      <div id={self.props.id} style={self.props.style} ref="el" className={self.classes}>
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
    classes() {
      return Utils.classNames(
        this.props.className,
        'swiper-container',
        Mixins.colorClasses(this),
      );
    },
    paginationComputed() {
      const self = this;
      if (self.props.pagination === true || (self.props.params && self.props.params.pagination && !self.props.params.pagination.el)) {
        return true;
      }
      return false;
    },
    scrollbarComputed() {
      const self = this;
      if (self.props.scrollbar === true || (self.props.params && self.props.params.scrollbar && !self.props.params.scrollbar.el)) {
        return true;
      }
      return false;
    },
    navigationComputed() {
      const self = this;
      if (self.props.navigation === true || (self.props.params && self.props.params.navigation && !self.props.params.navigation.nextEl && !self.props.params.navigation.prevEl)) {
        return true;
      }
      return false;
    },
  },
  componentWillUnmount() {
    const self = this;
    if (!self.props.init) return;
    if (self.swiper && self.swiper.destroy) self.swiper.destroy();
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
};
