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
  data: function data() {
    var props = __vueComponentProps(this);

    var state = function () {
      return {
        isMedia: props.mediaItem || props.mediaList,
        isSortable: props.sortable,
        isSimple: false
      };
    }();

    return {
      state: state
    };
  },
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var linkEl;
    var itemContentEl;
    var props = self.props;
    var id = props.id,
        style = props.style,
        className = props.className,
        title = props.title,
        text = props.text,
        media = props.media,
        subtitle = props.subtitle,
        header = props.header,
        footer = props.footer,
        link = props.link,
        href = props.href,
        target = props.target,
        after = props.after,
        badge = props.badge,
        badgeColor = props.badgeColor,
        mediaItem = props.mediaItem,
        mediaList = props.mediaList,
        divider = props.divider,
        groupTitle = props.groupTitle,
        swipeout = props.swipeout,
        accordionItem = props.accordionItem,
        accordionItemOpened = props.accordionItemOpened,
        smartSelect = props.smartSelect,
        checkbox = props.checkbox,
        radio = props.radio,
        checked = props.checked,
        defaultChecked = props.defaultChecked,
        indeterminate = props.indeterminate,
        name = props.name,
        value = props.value,
        readonly = props.readonly,
        required = props.required,
        disabled = props.disabled,
        sortable = props.sortable,
        noChevron = props.noChevron,
        chevronCenter = props.chevronCenter,
        virtualListIndex = props.virtualListIndex;
    var isMedia = mediaItem || mediaList || self.state.isMedia;
    var isSortable = sortable || self.state.isSortable;
    var isSimple = self.state.isSimple;

    if (!isSimple) {
      var needsEvents = !(link || href || accordionItem || smartSelect);
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
      }, [this.$slots['content-start'], this.$slots['content'], this.$slots['content-end'], this.$slots['media'], this.$slots['inner-start'], this.$slots['inner'], this.$slots['inner-end'], this.$slots['after-start'], this.$slots['after'], this.$slots['after-end'], this.$slots['header'], this.$slots['footer'], this.$slots['before-title'], this.$slots['title'], this.$slots['after-title'], this.$slots['subtitle'], this.$slots['text'], swipeout || accordionItem ? null : self.$slots.default]);

      if (link || href || accordionItem || smartSelect) {
        var linkAttrs = Object.assign({
          href: link === true ? '' : link || href,
          target: target
        }, Mixins.linkRouterAttrs(props), {}, Mixins.linkActionsAttrs(props));
        var linkClasses = Utils.classNames({
          'item-link': true,
          'smart-select': smartSelect
        }, Mixins.linkRouterClasses(props), Mixins.linkActionsClasses(props));
        linkEl = _h('a', __vueComponentTransformJSXProps(Object.assign({
          ref: 'linkEl',
          class: linkClasses
        }, linkAttrs)), [itemContentEl]);
      }
    }

    var liClasses = Utils.classNames(className, {
      'item-divider': divider,
      'list-group-title': groupTitle,
      'media-item': isMedia,
      swipeout: swipeout,
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

    var linkItemEl = link || href || smartSelect || accordionItem ? linkEl : itemContentEl;
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
    }, [linkItemEl]) : linkItemEl, isSortable && sortable !== false && _h('div', {
      class: 'sortable-handler'
    }), (swipeout || accordionItem) && self.$slots.default, this.$slots['root'], this.$slots['root-end']]);
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      var self = this;

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
      var self = this;
      if (!self.props.swipeout) return;
      var el = self.$refs.el;

      if (opened) {
        self.$f7.swipeout.open(el);
      } else {
        self.$f7.swipeout.close(el);
      }
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onClick', 'onChange', 'onSwipeoutOpen', 'onSwipeoutOpened', 'onSwipeoutClose', 'onSwipeoutClosed', 'onSwipeoutDelete', 'onSwipeoutDeleted', 'onSwipeoutOverswipeEnter', 'onSwipeoutOverswipeExit', 'onSwipeout', 'onAccBeforeOpen', 'onAccOpen', 'onAccOpened', 'onAccBeforeClose', 'onAccClose', 'onAccClosed']);
  },
  mounted: function mounted() {
    var self = this;
    var _self$$refs = self.$refs,
        el = _self$$refs.el,
        linkEl = _self$$refs.linkEl;
    if (!el) return;
    var _self$props = self.props,
        link = _self$props.link,
        href = _self$props.href,
        smartSelect = _self$props.smartSelect,
        swipeout = _self$props.swipeout,
        swipeoutOpened = _self$props.swipeoutOpened,
        accordionItem = _self$props.accordionItem,
        smartSelectParams = _self$props.smartSelectParams,
        routeProps = _self$props.routeProps,
        tooltip = _self$props.tooltip;
    var needsEvents = !(link || href || accordionItem || smartSelect);

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

    self.$f7ready(function (f7) {
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
        var ssParams = Utils.extend({
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
  updated: function updated() {
    var self = this;
    var $listEl = self.$listEl;
    var linkEl = self.$refs.linkEl;
    var routeProps = self.props.routeProps;

    if (linkEl && routeProps) {
      linkEl.f7RouteProps = routeProps;
    }

    if (!$listEl || $listEl && $listEl.length === 0) return;
    var isMedia = $listEl.hasClass('media-list');
    var isSimple = $listEl.hasClass('simple-list');
    var isSortable = $listEl.hasClass('sortable');

    if (isMedia !== self.state.isMedia) {
      self.setState({
        isMedia: isMedia
      });
    }

    if (isSimple !== self.state.isSimple) {
      self.setState({
        isSimple: isSimple
      });
    }

    if (isSortable !== self.state.isSortable) {
      self.setState({
        isSortable: isSortable
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var linkEl = self.$refs.linkEl;
    var _self$props2 = self.props,
        link = _self$props2.link,
        href = _self$props2.href,
        smartSelect = _self$props2.smartSelect,
        swipeout = _self$props2.swipeout,
        accordionItem = _self$props2.accordionItem;
    var needsEvents = !(link || href || accordionItem || smartSelect);

    if (linkEl) {
      if (!needsEvents) {
        linkEl.removeEventListener('click', self.onClick);
      }

      delete linkEl.f7RouteProps;
    }

    if (self.$f7) {
      var f7 = self.$f7;

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
    onClick: function onClick(event) {
      var self = this;

      if (event.target.tagName.toLowerCase() !== 'input') {
        self.dispatchEvent('click', event);
      }
    },
    onSwipeoutOverswipeEnter: function onSwipeoutOverswipeEnter(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:overswipeenter swipeoutOverswipeEnter');
    },
    onSwipeoutOverswipeExit: function onSwipeoutOverswipeExit(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:overswipeexit swipeoutOverswipeExit');
    },
    onSwipeoutDeleted: function onSwipeoutDeleted(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:deleted swipeoutDeleted');
    },
    onSwipeoutDelete: function onSwipeoutDelete(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:delete swipeoutDelete');
    },
    onSwipeoutClose: function onSwipeoutClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:close swipeoutClose');
    },
    onSwipeoutClosed: function onSwipeoutClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:closed swipeoutClosed');
    },
    onSwipeoutOpen: function onSwipeoutOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:open swipeoutOpen');
    },
    onSwipeoutOpened: function onSwipeoutOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout:opened swipeoutOpened');
    },
    onSwipeout: function onSwipeout(el, progress) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('swipeout', progress);
    },
    onAccBeforeClose: function onAccBeforeClose(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:beforeclose accordionBeforeClose', prevent);
    },
    onAccClose: function onAccClose(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:close accordionClose');
    },
    onAccClosed: function onAccClosed(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:closed accordionClosed');
    },
    onAccBeforeOpen: function onAccBeforeOpen(el, prevent) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:beforeopen accordionBeforeOpen', prevent);
    },
    onAccOpen: function onAccOpen(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:open accordionOpen');
    },
    onAccOpened: function onAccOpened(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('accordion:opened accordionOpened');
    },
    onChange: function onChange(event) {
      this.dispatchEvent('change', event);
    },
    onInput: function onInput(event) {
      this.dispatchEvent('input', event);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    },
    setState: function setState(updater, callback) {
      __vueComponentSetState(this, updater, callback);
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};