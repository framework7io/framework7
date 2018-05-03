import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const PanelProps = Utils.extend({
  side: String,
  effect: String,
  cover: Boolean,
  reveal: Boolean,
  left: Boolean,
  right: Boolean,
  opened: Boolean
}, Mixins.colorProps);
export default {
  name: 'f7-panel',
  props: __vueComponentGetPropKeys(PanelProps),
  render() {
    var _h = this.$createElement;
    return _h('div', {
      ref: 'el',
      style: this.props.style,
      class: this.classes,
      attrs: { id: this.props.id }
    }, [this.$slots['default']]);
  },
  computed: {
    classes() {
      const self = this;
      const {left, reveal, className, opened} = self.props;
      let {side, effect} = self.props;
      side = side || (left ? 'left' : 'right');
      effect = effect || (reveal ? 'reveal' : 'cover');
      return Utils.classNames(className, {
        panel: true,
        'panel-active': opened,
        [`panel-${ side }`]: side,
        [`panel-${ effect }`]: effect
      }, Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.$f7)
        return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');
      if (opened) {
        self.$f7.panel.open(side);
      } else {
        self.$f7.panel.open(side);
      }
    }
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Panel)
      self.f7Panel.destroy();
    const el = self.$refs.el;
    if (!el)
      return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    self.onBackdropClickBound = self.onBackdropClick.bind(self);
    self.onPanelSwipeBound = self.onPanelSwipe.bind(self);
    self.onPanelSwipeOpenBound = self.onPanelSwipeOpen.bind(self);
    self.onBreakpointBound = self.onBreakpoint.bind(self);
    el.addEventListener('panel:open', self.onOpenBound);
    el.addEventListener('panel:opened', self.onOpenedBound);
    el.addEventListener('panel:close', self.onCloseBound);
    el.addEventListener('panel:closed', self.onClosedBound);
    el.addEventListener('panel:backdrop-click', self.onBackdropClickBound);
    el.addEventListener('panel:swipe', self.onPanelSwipeBound);
    el.addEventListener('panel:swipeopen', self.onPanelSwipeOpenBound);
    el.addEventListener('panel:breakpoint', self.onBreakpointBound);
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    const {side, effect, opened, left, reveal} = self.props;
    if (el) {
      el.removeEventListener('panel:open', self.onOpenBound);
      el.removeEventListener('panel:opened', self.onOpenedBound);
      el.removeEventListener('panel:close', self.onCloseBound);
      el.removeEventListener('panel:closed', self.onClosedBound);
      el.removeEventListener('panel:backdrop-click', self.onBackdropClickBound);
      el.removeEventListener('panel:swipe', self.onPanelSwipeBound);
      el.removeEventListener('panel:swipeopen', self.onPanelSwipeOpenBound);
      el.removeEventListener('panel:breakpoint', self.onBreakpointBound);
    }
    self.$f7ready(() => {
      const $ = self.$$;
      if (!$)
        return;
      if ($('.panel-backdrop').length === 0) {
        $('<div class="panel-backdrop"></div>').insertBefore(el);
      }
      self.f7Panel = self.$f7.panel.create({ el });
    });
    if (opened) {
      el.style.display = 'block';
    }
    const $ = self.$$;
    if (!$)
      return;
    const panelSide = side || (left ? 'left' : 'right');
    const panelEffect = effect || (reveal ? 'reveal' : 'cover');
    if (opened) {
      $('html').addClass(`with-panel-${ panelSide }-${ panelEffect }`);
    }
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('panel:open panelOpen', event);
    },
    onOpened(event) {
      this.dispatchEvent('panel:opened panelOpened', event);
    },
    onClose(event) {
      this.dispatchEvent('panel:close panelClose', event);
    },
    onClosed(event) {
      this.dispatchEvent('panel:closed panelClosed', event);
    },
    onBackdropClick(event) {
      this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
    },
    onPanelSwipe(event) {
      this.dispatchEvent('panel:swipe panelSwipe', event);
    },
    onPanelSwipeOpen(event) {
      this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
    },
    onBreakpoint(event) {
      this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7)
        return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.open(side, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7)
        return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');
      self.$f7.panel.close(side, animate);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};