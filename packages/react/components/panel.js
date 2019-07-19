import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Panel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onBackdropClick', 'onPanelSwipe', 'onPanelSwipeOpen', 'onBreakpoint', 'onResize']);
    })();
  }

  onOpen(event) {
    this.dispatchEvent('panel:open panelOpen', event);
  }

  onOpened(event) {
    this.dispatchEvent('panel:opened panelOpened', event);
  }

  onClose(event) {
    this.dispatchEvent('panel:close panelClose', event);
  }

  onClosed(event) {
    this.dispatchEvent('panel:closed panelClosed', event);
  }

  onBackdropClick(event) {
    this.dispatchEvent('panel:backdrop-click panelBackdropClick', event);
  }

  onPanelSwipe(event) {
    this.dispatchEvent('panel:swipe panelSwipe', event);
  }

  onPanelSwipeOpen(event) {
    this.dispatchEvent('panel:swipeopen panelSwipeOpen', event);
  }

  onBreakpoint(event) {
    this.dispatchEvent('panel:breakpoint panelBreakpoint', event);
  }

  onResize(event) {
    this.dispatchEvent('panel:resize panelResize', event);
  }

  open(animate) {
    const self = this;
    if (!self.$f7) return;
    const side = self.props.side || (self.props.left ? 'left' : 'right');
    self.$f7.panel.open(side, animate);
  }

  close(animate) {
    const self = this;
    if (!self.$f7) return;
    const side = self.props.side || (self.props.left ? 'left' : 'right');
    self.$f7.panel.close(side, animate);
  }

  toggle(animate) {
    const self = this;
    if (!self.$f7) return;
    const side = self.props.side || (self.props.left ? 'left' : 'right');
    self.$f7.panel.toggle(side, animate);
  }

  get classes() {
    const self = this;
    const props = self.props;
    const {
      left,
      reveal,
      className,
      opened,
      resizable
    } = props;
    let {
      side,
      effect
    } = props;
    side = side || (left ? 'left' : 'right');
    effect = effect || (reveal ? 'reveal' : 'cover');
    return Utils.classNames(className, 'panel', {
      'panel-active': opened,
      'panel-resizable': resizable,
      [`panel-${side}`]: side,
      [`panel-${effect}`]: effect
    }, Mixins.colorClasses(props));
  }

  render() {
    const props = this.props;
    const {
      id,
      style,
      resizable
    } = props;
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: this.classes
    }, this.slots['default'], resizable && React.createElement('div', {
      className: 'panel-resize-handler'
    }));
  }

  componentWillUnmount() {
    const self = this;

    if (self.f7Panel) {
      self.f7Panel.destroy();
    }
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const {
      side,
      effect,
      opened,
      left,
      reveal,
      resizable
    } = self.props;
    self.$f7ready(() => {
      const $ = self.$$;
      if (!$) return;

      if ($('.panel-backdrop').length === 0) {
        $('<div class="panel-backdrop"></div>').insertBefore(el);
      }

      self.f7Panel = self.$f7.panel.create({
        el,
        resizable
      });
      const events = {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed,
        backdropClick: self.onBackdropClick,
        swipe: self.onPanelSwipe,
        swipeOpen: self.onPanelSwipeOpen,
        breakpoint: self.onBreakpoint,
        resize: self.onResize
      };
      Object.keys(events).forEach(ev => {
        self.f7Panel.on(ev, events[ev]);
      });
    });

    if (opened) {
      el.style.display = 'block';
    }

    const $ = self.$$;
    if (!$) return;
    const panelSide = side || (left ? 'left' : 'right');
    const panelEffect = effect || (reveal ? 'reveal' : 'cover');

    if (opened) {
      $('html').addClass(`with-panel-${panelSide}-${panelEffect}`);
    }
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.resizable', prevProps, prevState, resizable => {
      const self = this;
      if (!resizable) return;

      if (self.f7Panel && !self.f7Panel.resizableInitialized) {
        self.f7Panel.initResizablePanel();
      }
    });

    __reactComponentWatch(this, 'props.opened', prevProps, prevState, opened => {
      const self = this;
      if (!self.$f7) return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');

      if (opened) {
        self.$f7.panel.open(side);
      } else {
        self.$f7.panel.close(side);
      }
    });
  }

}

__reactComponentSetProps(F7Panel, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  side: String,
  effect: String,
  cover: Boolean,
  reveal: Boolean,
  left: Boolean,
  right: Boolean,
  opened: Boolean,
  resizable: Boolean
}, Mixins.colorProps));

F7Panel.displayName = 'f7-panel';
export default F7Panel;