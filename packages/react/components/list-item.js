import React from 'react';
import Utils from '../utils/utils';
import F7ListItemContent from './list-item-content';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7ListItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};

    this.state = (() => {
      return {
        isMedia: props.mediaItem || props.mediaList,
        isSortable: props.sortable,
        isSimple: false
      };
    })();

    (() => {
      Utils.bindMethods(this, ['onClick', 'onChange', 'onSwipeoutOpen', 'onSwipeoutOpened', 'onSwipeoutClose', 'onSwipeoutClosed', 'onSwipeoutDelete', 'onSwipeoutDeleted', 'onSwipeoutOverswipeEnter', 'onSwipeoutOverswipeExit', 'onSwipeout', 'onAccBeforeOpen', 'onAccOpen', 'onAccOpened', 'onAccBeforeClose', 'onAccClose', 'onAccClosed']);
    })();
  }

  onClick(event) {
    const self = this;

    if (event.target.tagName.toLowerCase() !== 'input') {
      self.dispatchEvent('click', event);
    }
  }

  onSwipeoutOverswipeEnter(event) {
    this.dispatchEvent('swipeout:overswipeenter swipeoutOverswipeEnter', event);
  }

  onSwipeoutOverswipeExit(event) {
    this.dispatchEvent('swipeout:overswipeexit swipeoutOverswipeExit', event);
  }

  onSwipeoutDeleted(event) {
    this.dispatchEvent('swipeout:deleted swipeoutDeleted', event);
  }

  onSwipeoutDelete(event) {
    this.dispatchEvent('swipeout:delete swipeoutDelete', event);
  }

  onSwipeoutClose(event) {
    this.dispatchEvent('swipeout:close swipeoutClose', event);
  }

  onSwipeoutClosed(event) {
    this.dispatchEvent('swipeout:closed swipeoutClosed', event);
  }

  onSwipeoutOpen(event) {
    this.dispatchEvent('swipeout:open swipeoutOpen', event);
  }

  onSwipeoutOpened(event) {
    this.dispatchEvent('swipeout:opened swipeoutOpened', event);
  }

  onSwipeout(event) {
    this.dispatchEvent('swipeout', event);
  }

  onAccBeforeClose(event) {
    this.dispatchEvent('accordion:beforeclose accordionBeforeClose', event, event.detail.prevent);
  }

  onAccClose(event) {
    this.dispatchEvent('accordion:close accordionClose', event);
  }

  onAccClosed(event) {
    this.dispatchEvent('accordion:closed accordionClosed', event);
  }

  onAccBeforeOpen(event) {
    this.dispatchEvent('accordion:beforeopen accordionBeforeOpen', event, event.detail.prevent);
  }

  onAccOpen(event) {
    this.dispatchEvent('accordion:open accordionOpen', event);
  }

  onAccOpened(event) {
    this.dispatchEvent('accordion:opened accordionOpened', event);
  }

  onChange(event) {
    this.dispatchEvent('change', event);
  }

  onInput(event) {
    this.dispatchEvent('input', event);
  }

  render() {
    const self = this;
    let linkEl;
    let itemContentEl;
    const props = self.props;
    const {
      id,
      style,
      className,
      title,
      text,
      media,
      subtitle,
      header,
      footer,
      link,
      href,
      target,
      noFastclick,
      noFastClick,
      after,
      badge,
      badgeColor,
      mediaItem,
      mediaList,
      divider,
      groupTitle,
      swipeout,
      accordionItem,
      accordionItemOpened,
      smartSelect,
      checkbox,
      radio,
      checked,
      defaultChecked,
      indeterminate,
      name,
      value,
      readonly,
      required,
      disabled,
      sortable,
      noChevron,
      chevronCenter,
      virtualListIndex
    } = props;
    const isMedia = mediaItem || mediaList || self.state.isMedia;
    const isSortable = sortable || self.state.isSortable;
    const isSimple = self.state.isSimple;

    if (!isSimple) {
      const needsEvents = !(link || href || accordionItem || smartSelect);
      itemContentEl = React.createElement(F7ListItemContent, {
        title: title,
        text: text,
        media: media,
        subtitle: subtitle,
        after: after,
        header: header,
        footer: footer,
        badge: badge,
        badgeColor: badgeColor,
        mediaList: isMedia,
        accordionItem: accordionItem,
        checkbox: checkbox,
        checked: checked,
        defaultChecked: defaultChecked,
        indeterminate: indeterminate,
        radio: radio,
        name: name,
        value: value,
        readonly: readonly,
        required: required,
        disabled: disabled,
        onClick: needsEvents ? self.onClick : null,
        onChange: needsEvents ? self.onChange : null
      }, this.slots['content-start'], this.slots['content'], this.slots['content-end'], this.slots['media'], this.slots['inner-start'], this.slots['inner'], this.slots['inner-end'], this.slots['after-start'], this.slots['after'], this.slots['after-end'], this.slots['header'], this.slots['footer'], this.slots['before-title'], this.slots['title'], this.slots['after-title'], this.slots['subtitle'], this.slots['text'], swipeout || accordionItem ? null : self.slots.default);

      if (link || href || accordionItem || smartSelect) {
        const linkAttrs = Object.assign({
          href: link === true ? '' : link || href,
          target
        }, Mixins.linkRouterAttrs(props), Mixins.linkActionsAttrs(props));
        const linkClasses = Utils.classNames({
          'item-link': true,
          'no-fastclick': noFastclick || noFastClick,
          'smart-select': smartSelect
        }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
        linkEl = React.createElement('a', Object.assign({
          ref: __reactNode => {
            this.__reactRefs['linkEl'] = __reactNode;
          },
          className: linkClasses
        }, linkAttrs), itemContentEl);
      }
    }

    const liClasses = Utils.classNames(className, {
      'item-divider': divider,
      'list-group-title': groupTitle,
      'media-item': isMedia,
      swipeout,
      'accordion-item': accordionItem,
      'accordion-item-opened': accordionItemOpened,
      disabled: disabled && !(radio || checkbox),
      'no-chevron': noChevron,
      'chevron-center': chevronCenter
    }, Mixins.colorClasses(props));

    if (divider || groupTitle) {
      return React.createElement('li', {
        ref: __reactNode => {
          this.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: liClasses,
        'data-virtual-list-index': virtualListIndex
      }, React.createElement('span', null, this.slots['default'], !this.slots.default && title));
    }

    if (isSimple) {
      return React.createElement('li', {
        ref: __reactNode => {
          this.__reactRefs['el'] = __reactNode;
        },
        id: id,
        style: style,
        className: liClasses,
        'data-virtual-list-index': virtualListIndex
      }, title, this.slots['default']);
    }

    const linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
    return React.createElement('li', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: liClasses,
      'data-virtual-list-index': virtualListIndex
    }, this.slots['root-start'], swipeout ? React.createElement('div', {
      className: 'swipeout-content'
    }, linkItemEl) : linkItemEl, isSortable && React.createElement('div', {
      className: 'sortable-handler'
    }), (swipeout || accordionItem) && self.slots.default, this.slots['root'], this.slots['root-end']);
  }

  componentWillUnmount() {
    const self = this;
    const {
      el,
      linkEl
    } = self.refs;
    const {
      link,
      href,
      smartSelect,
      swipeout,
      accordionItem
    } = self.props;
    const needsEvents = !(link || href || accordionItem || smartSelect);

    if (linkEl) {
      if (!needsEvents) {
        linkEl.removeEventListener('click', self.onClick);
      }

      delete linkEl.f7RouteProps;
    }

    if (el) {
      if (swipeout) {
        el.removeEventListener('swipeout:open', self.onSwipeoutOpen);
        el.removeEventListener('swipeout:opened', self.onSwipeoutOpened);
        el.removeEventListener('swipeout:close', self.onSwipeoutClose);
        el.removeEventListener('swipeout:closed', self.onSwipeoutClosed);
        el.removeEventListener('swipeout:delete', self.onSwipeoutDelete);
        el.removeEventListener('swipeout:deleted', self.onSwipeoutDeleted);
        el.removeEventListener('swipeout:overswipeenter', self.onSwipeoutOverswipeEnter);
        el.removeEventListener('swipeout:overswipeexit', self.onSwipeoutOverswipeExit);
        el.removeEventListener('swipeout', self.onSwipeout);
      }

      if (accordionItem) {
        el.removeEventListener('accordion:beforeopen', self.onAccBeforeOpen);
        el.removeEventListener('accordion:open', self.onAccOpen);
        el.removeEventListener('accordion:opened', self.onAccOpened);
        el.removeEventListener('accordion:beforeclose', self.onAccBeforeClose);
        el.removeEventListener('accordion:close', self.onAccClose);
        el.removeEventListener('accordion:closed', self.onAccClosed);
      }
    }

    if (smartSelect && self.f7SmartSelect) {
      self.f7SmartSelect.destroy();
    }

    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.tooltip', prevProps, prevState, newText => {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    });

    __reactComponentWatch(this, 'props.swipeoutOpened', prevProps, prevState, opened => {
      const self = this;
      if (!self.props.swipeout) return;
      const el = self.refs.el;

      if (opened) {
        self.$f7.swipeout.open(el);
      } else {
        self.$f7.swipeout.close(el);
      }
    });

    const self = this;
    const {
      $listEl
    } = self;
    const {
      linkEl
    } = self.refs;
    const {
      routeProps
    } = self.props;

    if (linkEl && routeProps) {
      linkEl.f7RouteProps = routeProps;
    }

    if (!$listEl || $listEl && $listEl.length === 0) return;
    const isMedia = $listEl.hasClass('media-list');
    const isSimple = $listEl.hasClass('simple-list');
    const isSortable = $listEl.hasClass('sortable');

    if (isMedia !== self.state.isMedia) {
      self.setState({
        isMedia
      });
    }

    if (isSimple !== self.state.isSimple) {
      self.setState({
        isSimple
      });
    }

    if (isSortable !== self.state.isSortable) {
      self.setState({
        isSortable
      });
    }
  }

  componentDidMount() {
    const self = this;
    const {
      el,
      linkEl
    } = self.refs;
    if (!el) return;
    const {
      link,
      href,
      smartSelect,
      swipeout,
      swipeoutOpened,
      accordionItem,
      smartSelectParams,
      routeProps,
      tooltip
    } = self.props;
    const needsEvents = !(link || href || accordionItem || smartSelect);

    if (!needsEvents && linkEl) {
      linkEl.addEventListener('click', self.onClick);
    }

    if (linkEl && routeProps) {
      linkEl.f7RouteProps = routeProps;
    }

    self.$listEl = self.$$(el).parents('.list, .list-group').eq(0);

    if (self.$listEl.length) {
      self.setState({
        isMedia: self.$listEl.hasClass('media-list'),
        isSimple: self.$listEl.hasClass('simple-list'),
        isSortable: self.$listEl.hasClass('sortable')
      });
    }

    if (swipeout) {
      el.addEventListener('swipeout:open', self.onSwipeoutOpen);
      el.addEventListener('swipeout:opened', self.onSwipeoutOpened);
      el.addEventListener('swipeout:close', self.onSwipeoutClose);
      el.addEventListener('swipeout:closed', self.onSwipeoutClosed);
      el.addEventListener('swipeout:delete', self.onSwipeoutDelete);
      el.addEventListener('swipeout:deleted', self.onSwipeoutDeleted);
      el.addEventListener('swipeout:overswipeenter', self.onSwipeoutOverswipeEnter);
      el.addEventListener('swipeout:overswipeexit', self.onSwipeoutOverswipeExit);
      el.addEventListener('swipeout', self.onSwipeout);
    }

    if (accordionItem) {
      el.addEventListener('accordion:beforeopen', self.onAccBeforeOpen);
      el.addEventListener('accordion:open', self.onAccOpen);
      el.addEventListener('accordion:opened', self.onAccOpened);
      el.addEventListener('accordion:beforeclose', self.onAccBeforeClose);
      el.addEventListener('accordion:close', self.onAccClose);
      el.addEventListener('accordion:closed', self.onAccClosed);
    }

    self.$f7ready(f7 => {
      if (smartSelect) {
        const ssParams = Utils.extend({
          el: el.querySelector('a.smart-select')
        }, smartSelectParams || {});
        self.f7SmartSelect = f7.smartSelect.create(ssParams);
      }

      if (swipeoutOpened) {
        f7.swipeout.open(el);
      }

      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip
        });
      }
    });
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

}

__reactComponentSetProps(F7ListItem, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  title: [String, Number],
  text: [String, Number],
  media: String,
  subtitle: [String, Number],
  header: [String, Number],
  footer: [String, Number],
  tooltip: String,
  link: [Boolean, String],
  target: String,
  noFastclick: Boolean,
  noFastClick: Boolean,
  after: [String, Number],
  badge: [String, Number],
  badgeColor: String,
  mediaItem: Boolean,
  mediaList: Boolean,
  divider: Boolean,
  groupTitle: Boolean,
  swipeout: Boolean,
  swipeoutOpened: Boolean,
  sortable: Boolean,
  accordionItem: Boolean,
  accordionItemOpened: Boolean,
  smartSelect: Boolean,
  smartSelectParams: Object,
  noChevron: Boolean,
  chevronCenter: Boolean,
  checkbox: Boolean,
  radio: Boolean,
  checked: Boolean,
  defaultChecked: Boolean,
  indeterminate: Boolean,
  name: String,
  value: [String, Number, Array],
  readonly: Boolean,
  required: Boolean,
  disabled: Boolean,
  virtualListIndex: Number
}, Mixins.colorProps, Mixins.linkRouterProps, Mixins.linkActionsProps));

F7ListItem.displayName = 'f7-list-item';
export default F7ListItem;