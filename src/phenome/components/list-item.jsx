/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import F7ListItemContent from './list-item-content';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
import { SmartSelect as SmartSelectNamespace } from 'framework7/components/smart-select/smart-select';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
f7SmartSelect: SmartSelectNamespace.SmartSelect
*/

export default {
  name: 'f7-list-item',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line

    title: [String, Number],
    text: [String, Number],
    media: String,
    subtitle: [String, Number],
    header: [String, Number],
    footer: [String, Number],

    // Tooltip
    tooltip: String,

    // Link Props
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
      default: undefined,
    },
    accordionItem: Boolean,
    accordionItemOpened: Boolean,

    // Smart Select
    smartSelect: Boolean,
    smartSelectParams: Object,

    // Links Chevron (Arrow) Icon
    noChevron: Boolean,
    chevronCenter: Boolean,

    // Inputs
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
    virtualListIndex: Number,
    ...Mixins.colorProps,
    ...Mixins.linkRouterProps,
    ...Mixins.linkActionsProps,
  },
  state(props) {
    return {
      isMedia: props.mediaItem || props.mediaList,
      isSortable: props.sortable,
      isSimple: false,
    };
  },
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
      virtualListIndex,
    } = props;

    const isMedia = mediaItem || mediaList || self.state.isMedia;
    const isSortable = sortable || self.state.isSortable;
    const isSimple = self.state.isSimple;

    if (!isSimple) {
      // Item Content
      const needsEvents = !(link || href || accordionItem || smartSelect);
      itemContentEl = (
        <F7ListItemContent
          title={title}
          text={text}
          media={media}
          subtitle={subtitle}
          after={after}
          header={header}
          footer={footer}
          badge={badge}
          badgeColor={badgeColor}
          mediaList={isMedia}
          accordionItem={accordionItem}
          checkbox={checkbox}
          checked={checked}
          defaultChecked={defaultChecked}
          indeterminate={indeterminate}
          radio={radio}
          name={name}
          value={value}
          readonly={readonly}
          required={required}
          disabled={disabled}
          onClick={needsEvents ? self.onClick : null} // phenome-react-line
          onChange={needsEvents ? self.onChange : null} // phenome-react-line
          // phenome-vue-next-line
          on={needsEvents ? { click: self.onClick, change: self.onChange } : undefined}
        >
          <slot name="content-start" />
          <slot name="content" />
          <slot name="content-end" />
          <slot name="media" />
          <slot name="inner-start" />
          <slot name="inner" />
          <slot name="inner-end" />
          <slot name="after-start" />
          <slot name="after" />
          <slot name="after-end" />
          <slot name="header" />
          <slot name="footer" />
          <slot name="before-title" />
          <slot name="title" />
          <slot name="after-title" />
          <slot name="subtitle" />
          <slot name="text" />
          {swipeout || accordionItem ? null : self.slots.default}
        </F7ListItemContent>
      );

      // Link
      if (link || href || accordionItem || smartSelect) {
        const linkAttrs = {
          href: link === true ? '' : link || href,
          target,
          ...Mixins.linkRouterAttrs(props),
          ...Mixins.linkActionsAttrs(props),
        };
        const linkClasses = Utils.classNames(
          {
            'item-link': true,
            'smart-select': smartSelect,
          },
          Mixins.linkRouterClasses(props),
          Mixins.linkActionsClasses(props),
        );
        linkEl = (
          <a
            ref="linkEl"
            className={linkClasses}
            {...linkAttrs}
          >
            {itemContentEl}
          </a>
        );
      }
    }

    const liClasses = Utils.classNames(
      className,
      {
        'item-divider': divider,
        'list-group-title': groupTitle,
        'media-item': isMedia,
        swipeout,
        'accordion-item': accordionItem,
        'accordion-item-opened': accordionItemOpened,
        disabled: disabled && !(radio || checkbox),
        'no-chevron': noChevron,
        'chevron-center': chevronCenter,
        'disallow-sorting': sortable === false,
      },
      Mixins.colorClasses(props),
    );

    if (divider || groupTitle) {
      return (
        <li ref="el" id={id} style={style} className={liClasses} data-virtual-list-index={virtualListIndex}>
          <span><slot>{title}</slot></span>
        </li>
      );
    }
    if (isSimple) {
      return (
        <li ref="el" id={id} style={style} className={liClasses} data-virtual-list-index={virtualListIndex}>
          {title}
          <slot name="default" />
        </li>
      );
    }

    const linkItemEl = (link || href || smartSelect || accordionItem) ? linkEl : itemContentEl;

    return (
      <li ref="el" id={id} style={style} className={liClasses} data-virtual-list-index={virtualListIndex}>
        <slot name="root-start" />
        {swipeout
          ? (
            <div className="swipeout-content">{linkItemEl}</div>
          )
          : linkItemEl
        }
        {isSortable && sortable !== false && (<div className="sortable-handler" />)}
        {(swipeout || accordionItem) && self.slots.default}
        <slot name="root" />
        <slot name="root-end" />
      </li>
    );
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
          targetEl: self.refs.el,
          text: newText,
        });
        return;
      }
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
    'props.swipeoutOpened': function watchSwipeoutOpened(opened) {
      const self = this;
      if (!self.props.swipeout) return;
      const el = self.refs.el;
      if (opened) {
        self.$f7.swipeout.open(el);
      } else {
        self.$f7.swipeout.close(el);
      }
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onClick',
      'onChange',
      'onSwipeoutOpen',
      'onSwipeoutOpened',
      'onSwipeoutClose',
      'onSwipeoutClosed',
      'onSwipeoutDelete',
      'onSwipeoutDeleted',
      'onSwipeoutOverswipeEnter',
      'onSwipeoutOverswipeExit',
      'onSwipeout',
      'onAccBeforeOpen',
      'onAccOpen',
      'onAccOpened',
      'onAccBeforeClose',
      'onAccClose',
      'onAccClosed',
    ]);
  },
  componentDidMount() {
    const self = this;
    const { el, linkEl } = self.refs;
    if (!el) return;
    const {
      link, href, smartSelect, swipeout, swipeoutOpened, accordionItem, smartSelectParams, routeProps, tooltip,
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
      });
    }

    self.$f7ready((f7) => {
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
        const ssParams = Utils.extend(
          { el: el.querySelector('a.smart-select') },
          smartSelectParams || {},
        );
        self.f7SmartSelect = f7.smartSelect.create(ssParams);
      }
      if (swipeoutOpened) {
        f7.swipeout.open(el);
      }
      if (tooltip) {
        self.f7Tooltip = f7.tooltip.create({
          targetEl: el,
          text: tooltip,
        });
      }
    });
  },
  componentDidUpdate() {
    const self = this;
    const { $listEl } = self;
    const { linkEl } = self.refs;
    const { routeProps } = self.props;
    if (linkEl && routeProps) {
      linkEl.f7RouteProps = routeProps;
    }
    if (!$listEl || ($listEl && $listEl.length === 0)) return;
    const isMedia = $listEl.hasClass('media-list');
    const isSimple = $listEl.hasClass('simple-list');
    const isSortable = $listEl.hasClass('sortable');
    if (isMedia !== self.state.isMedia) {
      self.setState({ isMedia });
    }
    if (isSimple !== self.state.isSimple) {
      self.setState({ isSimple });
    }
    if (isSortable !== self.state.isSortable) {
      self.setState({ isSortable });
    }
  },
  componentWillUnmount() {
    const self = this;
    const { linkEl } = self.refs;
    const { link, href, smartSelect, swipeout, accordionItem } = self.props;
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
  },
};
