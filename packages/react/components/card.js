import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7CardHeader from './card-header';
import F7CardContent from './card-content';
import F7CardFooter from './card-footer';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7Card extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    (() => {
      Utils.bindMethods(this, 'onBeforeOpen onOpen onOpened onClose onClosed'.split(' '));
    })();
  }

  open() {
    const self = this;
    if (!self.refs.el) return;
    self.$f7.card.open(self.refs.el);
  }

  close() {
    const self = this;
    if (!self.refs.el) return;
    self.$f7.card.close(self.refs.el);
  }

  onBeforeOpen(e) {
    this.dispatchEvent('cardBeforeOpen card:beforeopen', e, e.detail.prevent);
  }

  onOpen(e) {
    this.dispatchEvent('cardOpen card:open', e);
  }

  onOpened(e) {
    this.dispatchEvent('cardOpened card:opened', e);
  }

  onClose(e) {
    this.dispatchEvent('cardClose card:close', e);
  }

  onClosed(e) {
    this.dispatchEvent('cardClosed card:closed', e);
  }

  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      title,
      content,
      footer,
      padding,
      outline,
      expandable,
      expandableAnimateWidth,
      animate,
      hideNavbarOnOpen,
      hideToolbarOnOpen,
      swipeToClose,
      closeByBackdropClick,
      backdrop,
      backdropEl,
      noShadow,
      noBorder
    } = props;
    let headerEl;
    let contentEl;
    let footerEl;
    const classes = Utils.classNames(className, 'card', {
      'card-outline': outline,
      'card-expandable': expandable,
      'card-expandable-animate-width': expandableAnimateWidth,
      'no-shadow': noShadow,
      'no-border': noBorder
    }, Mixins.colorClasses(props));

    if (title || self.slots && self.slots.header) {
      headerEl = React.createElement(F7CardHeader, null, title, this.slots['header']);
    }

    if (content || self.slots && self.slots.content) {
      contentEl = React.createElement(F7CardContent, {
        padding: padding
      }, content, this.slots['content']);
    }

    if (footer || self.slots && self.slots.footer) {
      footerEl = React.createElement(F7CardFooter, null, footer, this.slots['footer']);
    }

    return React.createElement('div', {
      id: id,
      style: style,
      className: classes,
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      'data-animate': typeof animate === 'undefined' ? animate : animate.toString(),
      'data-hide-navbar-on-open': typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString(),
      'data-hide-toolbar-on-open': typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString(),
      'data-swipe-to-close': typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString(),
      'data-close-by-backdrop-click': typeof closeByBackdropClick === 'undefined' ? closeByBackdropClick : closeByBackdropClick.toString(),
      'data-backdrop': typeof backdrop === 'undefined' ? backdrop : backdrop.toString(),
      'data-backdrop-el': backdropEl
    }, headerEl, contentEl, footerEl, this.slots['default']);
  }

  componentWillUnmount() {
    const self = this;
    if (!self.props.expandable) return;
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('card:beforeopen', self.onBeforeOpen);
    el.removeEventListener('card:open', self.onOpen);
    el.removeEventListener('card:opened', self.onOpened);
    el.removeEventListener('card:close', self.onClose);
    el.removeEventListener('card:closed', self.onClosed);
  }

  componentDidMount() {
    const self = this;
    if (!self.props.expandable) return;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('card:beforeopen', self.onBeforeOpen);
    el.addEventListener('card:open', self.onOpen);
    el.addEventListener('card:opened', self.onOpened);
    el.addEventListener('card:close', self.onClose);
    el.addEventListener('card:closed', self.onClosed);

    if (self.props.expandable && self.props.expandableOpened) {
      self.$f7ready(() => {
        self.$f7.card.open(el, false);
      });
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
    __reactComponentWatch(this, 'props.expandableOpened', prevProps, prevState, expandableOpened => {
      const self = this;

      if (expandableOpened) {
        self.open();
      } else {
        self.close();
      }
    });
  }

}

__reactComponentSetProps(F7Card, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  title: [String, Number],
  content: [String, Number],
  footer: [String, Number],
  outline: Boolean,
  expandable: Boolean,
  expandableAnimateWidth: Boolean,
  expandableOpened: Boolean,
  animate: {
    type: Boolean,
    default: undefined
  },
  hideNavbarOnOpen: {
    type: Boolean,
    default: undefined
  },
  hideToolbarOnOpen: {
    type: Boolean,
    default: undefined
  },
  swipeToClose: {
    type: Boolean,
    default: undefined
  },
  closeByBackdropClick: {
    type: Boolean,
    default: undefined
  },
  backdrop: {
    type: Boolean,
    default: undefined
  },
  backdropEl: {
    type: String,
    default: undefined
  },
  noShadow: Boolean,
  noBorder: Boolean,
  padding: {
    type: Boolean,
    default: true
  }
}, Mixins.colorProps));

F7Card.displayName = 'f7-card';
export default F7Card;