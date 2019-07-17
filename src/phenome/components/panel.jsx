import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Panel as PanelNamespace } from 'framework7/components/panel/panel';
*/

/* phenome-dts-instance
f7Panel: PanelNamespace.Panel
*/

export default {
  name: 'f7-panel',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    side: String,
    effect: String,
    cover: Boolean,
    reveal: Boolean,
    left: Boolean,
    right: Boolean,
    opened: Boolean,
    resizable: Boolean,
    backdrop: {
      type: Boolean,
      default: true,
    },
    backdropEl: {
      type: String,
      default: undefined,
    },
    visibleBreakpoint: {
      type: Number,
      default: undefined,
    },
    collapsedBreakpoint: {
      type: Number,
      default: undefined,
    },
    swipe: Boolean,
    swipeOnlyClose: Boolean,
    swipeActiveArea: {
      type: Number,
      default: 0,
    },
    swipeThreshold: {
      type: Number,
      default: 0,
    },
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      id,
      style,
      resizable,
    } = props;
    return (
      <div
        ref="el"
        id={id}
        style={style}
        className={this.classes}
      >
        <slot />
        {resizable && (
          <div className="panel-resize-handler"></div>
        )}
      </div>
    );
  },
  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const { left, reveal, className, resizable } = props;
      let { side, effect } = props;
      side = side || (left ? 'left' : 'right');
      effect = effect || (reveal ? 'reveal' : 'cover');
      return Utils.classNames(
        className,
        'panel',
        {
          'panel-resizable': resizable,
          [`panel-${side}`]: side,
          [`panel-${effect}`]: effect,
        },
        Mixins.colorClasses(props),
      );
    },
  },
  watch: {
    'props.resizable': function watchResizable(resizable) {
      const self = this;
      if (!self.f7Panel) return;
      if (resizable) self.f7Panel.enableResizable();
      else self.f7Panel.disableResizable();
    },
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Panel) return;
      if (opened) {
        self.f7Panel.open();
      } else {
        self.f7Panel.close();
      }
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onOpen',
      'onOpened',
      'onClose',
      'onClosed',
      'onBackdropClick',
      'onSwipe',
      'onSwipeOpen',
      'onBreakpoint',
      'onCollapsedBreakpoint',
      'onResize',
    ]);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const {
      opened,
      resizable,
      backdrop,
      backdropEl,
      visibleBreakpoint,
      collapsedBreakpoint,
      swipe,
      swipeOnlyClose,
      swipeActiveArea,
      swipeThreshold,
    } = self.props;

    self.$f7ready(() => {
      const $ = self.$$;
      if (!$) return;
      if ($('.panel-backdrop').length === 0) {
        $('<div class="panel-backdrop"></div>').insertBefore(el);
      }
      const params = Utils.noUndefinedProps({
        el,
        resizable,
        backdrop,
        backdropEl,
        visibleBreakpoint,
        collapsedBreakpoint,
        swipe,
        swipeOnlyClose,
        swipeActiveArea,
        swipeThreshold,
        on: {
          open: self.onOpen,
          opened: self.onOpened,
          close: self.onClose,
          closed: self.onClosed,
          backdropClick: self.onBackdropClick,
          swipe: self.onSwipe,
          swipeOpen: self.onSwipeOpen,
          collapsedBreakpoint: self.onCollapsedBreakpoint,
          breakpoint: self.onBreakpoint,
          resize: self.onResize,
        },
      });
      self.f7Panel = self.$f7.panel.create(params);
      if (opened) {
        self.f7Panel.open(false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Panel && self.f7Panel.destroy) {
      self.f7Panel.destroy();
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
    onSwipe(event) {
      this.dispatchEvent('panel:swipe panelSwipe', event);
    },
    onSwipeOpen(event) {
      this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
    },
    onBreakpoint(event) {
      this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
    },
    onCollapsedBreakpoint(event) {
      this.dispatchEvent('panel:collapsedbreakpoint panelCollapsedBreakpoint', event);
    },
    onResize(event) {
      this.dispatchEvent('panel:resize panelResize', event);
    },
    open(animate) {
      const self = this;
      if (!self.f7Panel) return;
      self.f7Panel.open(animate);
    },
    close(animate) {
      const self = this;
      if (!self.f7Panel) return;
      self.f7Panel.close(animate);
    },
    toggle(animate) {
      const self = this;
      if (!self.f7Panel) return;
      self.f7Panel.toggle(animate);
    },
  },
};
