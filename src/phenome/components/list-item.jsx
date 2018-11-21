/* eslint import/no-unresolved: ["off"] */
/* eslint import/extensions: ["off"] */
import Utils from '../utils/utils';
import F7ListItemContent from './list-item-content';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { SmartSelect as SmartSelectNamespace } from 'framework7/components/smart-select/smart-select';
*/

/* phenome-dts-instance
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

    // Link Props
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
    name: String,
    value: [String, Number, Array],
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    itemInput: Boolean,
    itemInputWithInfo: Boolean,
    inlineLabel: Boolean,
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
      name,
      value,
      readonly,
      required,
      disabled,
      itemInput,
      itemInputWithInfo,
      inlineLabel,
      sortable,
      noChevron,
      chevronCenter,
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
          radio={radio}
          name={name}
          value={value}
          readonly={readonly}
          required={required}
          disabled={disabled}
          itemInput={itemInput}
          itemInputWithInfo={itemInputWithInfo}
          inlineLabel={inlineLabel}
          onClick={needsEvents ? self.onClickBound : null} // phenome-react-line
          onChange={needsEvents ? self.onChangeBound : null} // phenome-react-line
          // phenome-vue-next-line
          on={needsEvents ? { click: self.onClickBound, change: self.onChangeBound } : undefined}
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
        const linkAttrs = Utils.extend(
          {
            href: link === true || accordionItem || smartSelect ? '#' : link || href,
            target,
          },
          Mixins.linkRouterAttrs(props),
          Mixins.linkActionsAttrs(props),
        );
        const linkClasses = Utils.classNames(
          {
            'item-link': true,
            'no-fastclick': noFastclick || noFastClick,
            'smart-select': smartSelect,
          },
          Mixins.linkRouterClasses(props),
          Mixins.linkActionsClasses(props),
        );
        linkEl = (
          <a
            className={linkClasses}
            onClick={self.onClick.bind(self)}
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
      },
      Mixins.colorClasses(props),
    );
    if (divider || groupTitle) {
      return (
        <li ref="el" id={id} style={style} className={liClasses}>
          <span><slot>{title}</slot></span>
        </li>
      );
    }
    if (isSimple) {
      return (
        <li ref="el" id={id} style={style} className={liClasses}>
          {title}
          <slot name="default" />
        </li>
      );
    }

    const linkItemEl = (link || href || smartSelect || accordionItem) ? linkEl : itemContentEl;
    return (
      <li ref="el" id={id} style={style} className={liClasses}>
        <slot name="root-start" />
        {swipeout
          ? (
            <div className="swipeout-content">{linkItemEl}</div>
          )
          : linkItemEl
        }
        {isSortable && (<div className="sortable-handler" />)}
        {(swipeout || accordionItem) && self.slots.default}
        <slot name="root" />
        <slot name="root-end" />
      </li>
    );
  },
  watch: {
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
    const self = this;
    self.onClickBound = self.onClick.bind(self);
    self.onChangeBound = self.onChange.bind(self);
    self.onSwipeoutOpenBound = self.onSwipeoutOpen.bind(self);
    self.onSwipeoutOpenedBound = self.onSwipeoutOpened.bind(self);
    self.onSwipeoutCloseBound = self.onSwipeoutClose.bind(self);
    self.onSwipeoutClosedBound = self.onSwipeoutClosed.bind(self);
    self.onSwipeoutDeleteBound = self.onSwipeoutDelete.bind(self);
    self.onSwipeoutDeletedBound = self.onSwipeoutDeleted.bind(self);
    self.onSwipeoutOverswipeEnterBound = self.onSwipeoutOverswipeEnter.bind(self);
    self.onSwipeoutOverswipeExitBound = self.onSwipeoutOverswipeExit.bind(self);
    self.onSwipeoutBound = self.onSwipeout.bind(self);
    self.onAccBeforeOpenBound = self.onAccBeforeOpen.bind(self);
    self.onAccOpenBound = self.onAccOpen.bind(self);
    self.onAccOpenedBound = self.onAccOpened.bind(self);
    self.onAccBeforeCloseBound = self.onAccBeforeClose.bind(self);
    self.onAccCloseBound = self.onAccClose.bind(self);
    self.onAccClosedBound = self.onAccClosed.bind(self);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;

    self.$listEl = self.$$(el).parents('.list, .list-group').eq(0);
    if (self.$listEl.length) {
      self.setState({
        isMedia: self.$listEl.hasClass('media-list'),
        isSimple: self.$listEl.hasClass('simple-list'),
        isSortable: self.$listEl.hasClass('sortable'),
      });
    }
    const { swipeout, swipeoutOpened, accordionItem, smartSelect, smartSelectParams } = self.props;
    if (swipeout) {
      el.addEventListener('swipeout:open', self.onSwipeoutOpenBound);
      el.addEventListener('swipeout:opened', self.onSwipeoutOpenedBound);
      el.addEventListener('swipeout:close', self.onSwipeoutCloseBound);
      el.addEventListener('swipeout:closed', self.onSwipeoutClosedBound);
      el.addEventListener('swipeout:delete', self.onSwipeoutDeleteBound);
      el.addEventListener('swipeout:deleted', self.onSwipeoutDeletedBound);
      el.addEventListener('swipeout:overswipeenter', self.onSwipeoutOverswipeEnterBound);
      el.addEventListener('swipeout:overswipeexit', self.onSwipeoutOverswipeExitBound);
      el.addEventListener('swipeout', self.onSwipeoutBound);
    }
    if (accordionItem) {
      el.addEventListener('accordion:beforeopen', self.onAccBeforeOpenBound);
      el.addEventListener('accordion:open', self.onAccOpenBound);
      el.addEventListener('accordion:opened', self.onAccOpenedBound);
      el.addEventListener('accordion:beforeclose', self.onAccBeforeCloseBound);
      el.addEventListener('accordion:close', self.onAccCloseBound);
      el.addEventListener('accordion:closed', self.onAccClosedBound);
    }

    self.$f7ready((f7) => {
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
    });
  },
  componentDidUpdate() {
    const self = this;
    const { $listEl } = self;
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
    const el = self.refs.el;
    const { swipeout, accordionItem, smartSelect } = self.props;
    if (el) {
      if (swipeout) {
        el.removeEventListener('swipeout:open', self.onSwipeoutOpenBound);
        el.removeEventListener('swipeout:opened', self.onSwipeoutOpenedBound);
        el.removeEventListener('swipeout:close', self.onSwipeoutCloseBound);
        el.removeEventListener('swipeout:closed', self.onSwipeoutClosedBound);
        el.removeEventListener('swipeout:delete', self.onSwipeoutDeleteBound);
        el.removeEventListener('swipeout:deleted', self.onSwipeoutDeletedBound);
        el.removeEventListener('swipeout:overswipeenter', self.onSwipeoutOverswipeEnterBound);
        el.removeEventListener('swipeout:overswipeexit', self.onSwipeoutOverswipeExitBound);
        el.removeEventListener('swipeout', self.onSwipeoutBound);
      }
      if (accordionItem) {
        el.removeEventListener('accordion:beforeopen', self.onAccBeforeOpenBound);
        el.removeEventListener('accordion:open', self.onAccOpenBound);
        el.removeEventListener('accordion:opened', self.onAccOpenedBound);
        el.removeEventListener('accordion:beforeclose', self.onAccBeforeCloseBound);
        el.removeEventListener('accordion:close', self.onAccCloseBound);
        el.removeEventListener('accordion:closed', self.onAccClosedBound);
      }
    }
    if (smartSelect && self.f7SmartSelect) {
      self.f7SmartSelect.destroy();
    }
  },
  methods: {
    onClick(event) {
      const self = this;
      if (event.target.tagName.toLowerCase() !== 'input') {
        self.dispatchEvent('click', event);
      }
    },
    onSwipeoutOverswipeEnter(event) {
      this.dispatchEvent('swipeout:overswipeenter swipeoutOverswipeEnter', event);
    },
    onSwipeoutOverswipeExit(event) {
      this.dispatchEvent('swipeout:overswipeexit swipeoutOverswipeExit', event);
    },
    onSwipeoutDeleted(event) {
      this.dispatchEvent('swipeout:deleted swipeoutDeleted', event);
    },
    onSwipeoutDelete(event) {
      this.dispatchEvent('swipeout:delete swipeoutDelete', event);
    },
    onSwipeoutClose(event) {
      this.dispatchEvent('swipeout:close swipeoutClose', event);
    },
    onSwipeoutClosed(event) {
      this.dispatchEvent('swipeout:closed swipeoutClosed', event);
    },
    onSwipeoutOpen(event) {
      this.dispatchEvent('swipeout:open swipeoutOpen', event);
    },
    onSwipeoutOpened(event) {
      this.dispatchEvent('swipeout:opened swipeoutOpened', event);
    },
    onSwipeout(event) {
      this.dispatchEvent('swipeout', event);
    },
    onAccBeforeClose(event) {
      this.dispatchEvent('accordion:beforeclose accordionBeforeClose', event, event.detail.prevent);
    },
    onAccClose(event) {
      this.dispatchEvent('accordion:close accordionClose', event);
    },
    onAccClosed(event) {
      this.dispatchEvent('accordion:closed accordionClosed', event);
    },
    onAccBeforeOpen(event) {
      this.dispatchEvent('accordion:beforeopen accordionBeforeOpen', event, event.detail.prevent);
    },
    onAccOpen(event) {
      this.dispatchEvent('accordion:open accordionOpen', event);
    },
    onAccOpened(event) {
      this.dispatchEvent('accordion:opened accordionOpened', event);
    },
    onChange(event) {
      this.dispatchEvent('change', event);
    },
    onInput(event) {
      this.dispatchEvent('input', event);
    },
  },
};
