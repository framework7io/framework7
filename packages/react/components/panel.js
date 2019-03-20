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
      Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onBackdropClick', 'onPanelSwipe', 'onPanelSwipeOpen', 'onBreakpoint']);
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
      opened
    } = props;
    let {
      side,
      effect
    } = props;
    side = side || (left ? 'left' : 'right');
    effect = effect || (reveal ? 'reveal' : 'cover');
    return Utils.classNames(className, 'panel', {
      'panel-active': opened,
      [`panel-${side}`]: side,
      [`panel-${effect}`]: effect
    }, Mixins.colorClasses(props));
  }

  render() {
    const props = this.props;
    const {
      id,
      style
    } = props;
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: this.classes
    }, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    if (self.f7Panel) self.f7Panel.destroy();
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('panel:open', self.onOpen);
    el.removeEventListener('panel:opened', self.onOpened);
    el.removeEventListener('panel:close', self.onClose);
    el.removeEventListener('panel:closed', self.onClosed);
    el.removeEventListener('panel:backdrop-click', self.onBackdropClick);
    el.removeEventListener('panel:swipe', self.onPanelSwipe);
    el.removeEventListener('panel:swipeopen', self.onPanelSwipeOpen);
    el.removeEventListener('panel:breakpoint', self.onBreakpoint);
  }

  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    const {
      side,
      effect,
      opened,
      left,
      reveal
    } = self.props;

    if (el) {
      el.addEventListener('panel:open', self.onOpen);
      el.addEventListener('panel:opened', self.onOpened);
      el.addEventListener('panel:close', self.onClose);
      el.addEventListener('panel:closed', self.onClosed);
      el.addEventListener('panel:backdrop-click', self.onBackdropClick);
      el.addEventListener('panel:swipe', self.onPanelSwipe);
      el.addEventListener('panel:swipeopen', self.onPanelSwipeOpen);
      el.addEventListener('panel:breakpoint', self.onBreakpoint);
    }

    self.$f7ready(() => {
      const $ = self.$$;
      if (!$) return;

      if ($('.panel-backdrop').length === 0) {
        $('<div class="panel-backdrop"></div>').insertBefore(el);
      }

      self.f7Panel = self.$f7.panel.create({
        el
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
    __reactComponentWatch(this, 'props.opened', prevProps, prevState, opened => {
      const self = this;
      if (!self.$f7) return;
      const side = self.props.side || (self.props.left ? 'left' : 'right');

      if (opened) {
        self.$f7.panel.open(side);
      } else {
        self.$f7.panel.open(side);
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
  opened: Boolean
}, Mixins.colorProps));

F7Panel.displayName = 'f7-panel';
export default F7Panel;