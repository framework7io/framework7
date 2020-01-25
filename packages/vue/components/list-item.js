import Utils from '../utils/utils';
import F7ListItemContent from './list-item-content';
import Mixins from '../utils/mixins';
import __vueComponentTransformJSXProps from '../runtime-helpers/vue-component-transform-jsx-props.js';
import __vueComponentSetState from '../runtime-helpers/vue-component-set-state.js';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list-item',
  props: Object.assign({
    id: [String, Number],
    title: [String, Number],
    text: [String, Number],
    media: String,
    subtitle: [String, Number],
    header: [String, Number],
    footer: [String, Number],
    tooltip: String,
    link: [Boolean, String],
    target: String,
    after: [String, Number],
    badge: [String, Number],
    badgeColor: String,
    mediaItem: Boolean,
    mediaList: Boolean,
    divider: Boolean,
    groupTitle: Boolean,
    swipeout: Boolean,
    swipeoutOpened: Boolean,
    sortable: {
      type: Boolean,
      default: undefined
    },
    sortableOpposite: {
      type: Boolean,
      default: undefined
    },
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
  }, Mixins.colorProps, {}, Mixins.linkRouterProps, {}, Mixins.linkActionsProps),

  data() {
    const props = __vueComponentProps(this);

    const state = (() => {
      return {
        isMedia: props.mediaItem || props.mediaList,
        isSortable: props.sortable,
        isSortableOpposite: props.sortableOpposite,
        isSimple: false
      };
    })();

    return {
      state
    };
  },

  render() {
    const _h = this.$createElement;
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
      sortableOpposite,
      noChevron,
      chevronCenter,
      virtualListIndex
    } = props;
    const isMedia = mediaItem || mediaList || self.state.isMedia;
    const isSortable = sortable || self.state.isSortable;
    const isSortableOpposite = isSortable && (sortableOpposite || self.state.isSortableOpposite);
    const isSimple = self.state.isSimple;

    if (!isSimple) {
      const needsEvents = !(link || href || accordionItem || smartSelect);
      itemContentEl = _h(F7ListItemContent, {
        on: needsEvents ? {
          click: self.onClick,
          change: self.onChange
        } : undefined,
        attrs: {
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
          disabled: disabled
        }
      }, [this.$slots['content-start'], this.$slots['content'], this.$slots['content-end'], this.$slots['media'], this.$slots['inner-start'], this.$slots['inner'], this.$slots['inner-end'], this.$slots['after-start'], this.$slots['after'], this.$slots['after-end'], this.$slots['header'], this.$slots['footer'], this.$slots['before-title'], this.$slots['title'], this.$slots['after-title'], this.$slots['subtitle'], this.$slots['text'], swipeout || accordionItem ? null : self.$slots.default, isSortable && sortable !== false && isSortableOpposite && _h('div', {
        class: 'sortable-handler',
        slot: 'content-start'
      })]);

      if (link || href || accordionItem || smartSelect) {
        const linkAttrs = Object.assign({
          href: link === true ? '' : link || href,
          target
        }, Mixins.linkRouterAttrs(props), {}, Mixins.linkActionsAttrs(props));
        const linkClasses = Utils.classNames({
          'item-link': true,
          'smart-select': smartSelect
        }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
        linkEl = _h('a', __vueComponentTransformJSXProps(Object.assign({
          ref: 'linkEl',
          class: linkClasses
        }, linkAttrs)), [itemContentEl]);
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
      'chevron-center': chevronCenter,
      'disallow-sorting': sortable === false
    }, Mixins.colorClasses(props));

    if (divider || groupTitle) {
      return _h('li', {
        ref: 'el',
        style: style,
        class: liClasses,
        attrs: {
          id: id,
          'data-virtual-list-index': virtualListIndex
        }
      }, [_h('span', [this.$slots['default'] || [title]])]);
    }

    if (isSimple) {
      return _h('li', {
        ref: 'el',
        style: style,
        class: liClasses,
        attrs: {
          id: id,
          'data-virtual-list-index': virtualListIndex
        }
      }, [title, this.$slots['default']]);
    }

    const linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
    return _h('li', {
      ref: 'el',
      style: style,
      class: liClasses,
      attrs: {
        id: id,
        'data-virtual-list-index': virtualListIndex
      }
    }, [this.$slots['root-start'], swipeout ? _h('div', {
      class: 'swipeout-content'
    }, [linkItemEl]) : linkItemEl, isSortable && sortable !== false && !isSortableOpposite && _h('div', {
      class: 'sortable-handler'
    }), (swipeout || accordionItem) && self.$slots.default, this.$slots['root'], this.$slots['root-end']]);
  },

  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;

      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }

      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.$refs.el,
          text: newText
        });
        return;
      }

      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
    'props.swipeoutOpened': function watchSwipeoutOpened(opened) {
      const self = this;
      if (!self.props.swipeout) return;
      const el = self.$refs.el;

      if (opened) {
        self.$f7.swipeout.open(el);
      } else {
        self.$f7.swipeout.close(el);
      }
    }
  },

  created() {
    Utils.bindMethods(this, ['onClick', 'onChange', 'onSwipeoutOpen', 'onSwipeoutOpened', 'onSwipeoutClose', 'onSwipeoutClosed', 'onSwipeoutDelete', 'onSwipeoutDeleted', 'onSwipeoutOverswipeEnter', 'onSwipeoutOverswipeExit', 'onSwipeout', 'onAccBeforeOpen', 'onAccOpen', 'onAccOpened', 'onAccBeforeClose', 'onAccClose', 'onAccClosed']);
  },

  mounted() {
    const self = this;
    const {
      el,
      linkEl
    } = self.$refs;
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
        isSortable: self.$listEl.hasClass('sortable'),
        isSortableOpposite: self.$listEl.hasClass('sortable-opposite')
      });
    }

    self.$f7ready(f7 => {
      self.eventTargetEl = el;

      if (swipeout) {
        f7.on('swipeoutOpen', self.onSwipeoutOpen);
        f7.on('swipeoutOpened', self.onSwipeoutOpened);
        f7.on('swipeoutClose', self.onSwipeoutClose);
        f7.on('swipeoutClosed', self.onSwipeoutClosed);
        f7.on('swipeoutDelete', self.onSwipeoutDelete);
        f7.on('swipeoutDeleted', self.onSwipeoutDeleted);
        f7.on('swipeoutOverswipeEnter', self.onSwipeoutOverswipeEnter);
        f7.on('swipeoutOverswipeExit', self.onSwipeoutOverswipeExit);
        f7.on('swipeout', self.onSwipeout);
      }

      if (accordionItem) {
        f7.on('accordionBeforeOpen', self.onAccBeforeOpen);
        f7.on('accordionOpen', self.onAccOpen);
        f7.on('accordionOpened', self.onAccOpened);
        f7.on('accordionBeforeClose', self.onAccBeforeClose);
        f7.on('accordionClose', self.onAccClose);
        f7.on('accordionClosed', self.onAccClosed);
      }

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
  },

  updated() {
    const self = this;
    const {
      $listEl
    } = self;
    const {
      linkEl
    } = self.$refs;
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
    const isSortableOpposite = $listEl.hasClass('sortable-opposite');

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

      if (isSortableOpposite !== self.state.isSortableOpposite) {
        self.setState({
          isSortableOpposite
        });
      }
    }
  },

  beforeDestroy() {
    const self = this;
    const {
      linkEl
    } = self.$refs;
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

    if (self.$f7) {
      const f7 = self.$f7;

      if (swipeout) {
        f7.off('swipeoutOpen', self.onSwipeoutOpen);
        f7.off('swipeoutOpened', self.onSwipeoutOpened);
        f7.off('swipeoutClose', self.onSwipeoutClose);
        f7.off('swipeoutClosed', self.onSwipeoutClosed);
        f7.off('swipeoutDelete', self.onSwipeoutDelete);
        f7.off('swipeoutDeleted', self.onSwipeoutDeleted);
        f7.off('swipeoutOverswipeEnter', self.onSwipeoutOverswipeEnter);
        f7.off('swipeoutOverswipeExit', self.onSwipeoutOverswipeExit);
        f7.off('swipeout', self.onSwipeout);
      }

      if (accordionItem) {
        f7.off('accordionBeforeOpen', self.onAccBeforeOpen);
        f7.off('accordionOpen', self.onAccOpen);
        f7.off('accordionOpened', self.onAccOpened);
        f7.off('accordionBeforeClose', self.onAccBeforeClose);
        f7.off('accordionClose', self.onAccClose);
        f7.off('accordionClosed', self.onAccClosed);
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

    self.eventTargetEl = null;
    delete self.eventTargetEl;
  },

  methods: {
    onClick(event) {
      const self = this;

      if (event.target.tagName.toLowerCase() !== 'input') {
        self.dispatchEvent('click', event);
      }
    },

    onSwipeoutOverswipeEnter(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:overswipeenter swipeoutOverswipeEnter');
    },

    onSwipeoutOverswipeExit(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:overswipeexit swipeoutOverswipeExit');
    },

    onSwipeoutDeleted(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:deleted swipeoutDeleted');
    },

    onSwipeoutDelete(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:delete swipeoutDelete');
    },

    onSwipeoutClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:close swipeoutClose');
    },

    onSwipeoutClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:closed swipeoutClosed');
    },

    onSwipeoutOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:open swipeoutOpen');
    },

    onSwipeoutOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:opened swipeoutOpened');
    },

    onSwipeout(el, progress) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout', progress);
    },

    onAccBeforeClose(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:beforeclose accordionBeforeClose', prevent);
    },

    onAccClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:close accordionClose');
    },

    onAccClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:closed accordionClosed');
    },

    onAccBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:beforeopen accordionBeforeOpen', prevent);
    },

    onAccOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:open accordionOpen');
    },

    onAccOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:opened accordionOpened');
    },

    onChange(event) {
      this.dispatchEvent('change', event);
    },

    onInput(event) {
      this.dispatchEvent('input', event);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    },

    setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};