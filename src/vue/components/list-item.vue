<script>
import { computed, ref, h, onMounted, onBeforeUnmount, watch, inject } from 'vue';
import { classNames, isStringProp } from '../shared/utils.js';
import {
  colorClasses,
  colorProps,
  actionsProps,
  actionsAttrs,
  actionsClasses,
  routerProps,
  routerAttrs,
  routerClasses,
} from '../shared/mixins.js';

import { useRouteProps } from '../shared/use-route-props.js';
import { useSmartSelect } from '../shared/use-smart-select.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { f7ready, f7 } from '../shared/f7.js';

import f7Badge from './badge.js';

const ListItemContent = ({
  props,
  slots,
  inputElRef,
  onChange,
  onClick,
  isMediaComputed,
  isSortableComputed,
  isSortableOppositeComputed,
  itemContentClasses,
} = {}) => {
  const {
    radio,
    checkbox,
    value,
    name,
    readonly,
    disabled,
    checked,
    required,
    media,
    header,
    footer,
    title,
    subtitle,
    text,
    after,
    badge,
    badgeColor,
    swipeout,
    sortable,
    accordionItem,
  } = props;
  let titleEl;
  let afterWrapEl;
  let afterEl;
  let badgeEl;
  let innerEl;
  let titleRowEl;
  let subtitleEl;
  let textEl;
  let mediaEl;
  let inputEl;
  let inputIconEl;
  let headerEl;
  let footerEl;

  // Input
  if (radio || checkbox) {
    inputEl = h('input', {
      ref: inputElRef,
      value,
      name,
      checked,
      readonly,
      disabled,
      required,
      type: radio ? 'radio' : 'checkbox',
      onChange,
    });
    inputIconEl = h('i', { class: `icon icon-${radio ? 'radio' : 'checkbox'}` });
  }
  // Media
  if (media || slots.media) {
    let mediaImgEl;
    if (media) {
      mediaImgEl = h('img', { src: media });
    }
    mediaEl = h('div', { class: 'item-media' }, [mediaImgEl, slots.media && slots.media()]);
  }
  // Inner Elements
  if (header || slots.header) {
    headerEl = h('div', { class: 'item-header' }, [header, slots.header && slots.header()]);
  }
  if (footer || slots.footer) {
    footerEl = h('div', { class: 'item-footer' }, [footer, slots.footer && slots.footer()]);
  }
  if (
    title ||
    slots.title ||
    (!isMediaComputed.value && headerEl) ||
    (!isMediaComputed.value && footerEl)
  ) {
    titleEl = h('div', { class: 'item-title' }, [
      !isMediaComputed.value && headerEl,
      title,
      slots.title && slots.title(),
      !isMediaComputed.value && footerEl,
    ]);
  }
  if (subtitle || slots.subtitle) {
    subtitleEl = h('div', { class: 'item-subtitle' }, [
      subtitle,
      slots.subtitle && slots.subtitle(),
    ]);
  }
  if (text || slots.text) {
    textEl = h('div', { class: 'item-text' }, [text, slots.text && slots.text()]);
  }
  if (after || badge || slots.after) {
    if (after) {
      afterEl = h('span', [after]);
    }
    if (badge) {
      badgeEl = h(f7Badge, { color: badgeColor }, () => badge);
    }
    afterWrapEl = h('div', { class: 'item-after' }, [
      slots['after-start'] && slots['after-start'](),
      afterEl,
      badgeEl,
      slots.after && slots.after(),
      slots['after-end'] && slots['after-end'](),
    ]);
  }
  if (isMediaComputed.value) {
    titleRowEl = h('div', { class: 'item-title-row' }, [
      slots['before-title'] && slots['before-title'](),
      titleEl,
      slots['after-title'] && slots['after-title'](),
      afterWrapEl,
    ]);

    innerEl = h('div', { class: 'item-inner' }, [
      slots['inner-start'] && slots['inner-start'],
      headerEl,
      titleRowEl,
      subtitleEl,
      textEl,
      swipeout || accordionItem ? null : slots.default && slots.default(),
      slots.inner && slots.inner(),
      footerEl,
      slots['inner-end'] && slots['inner-end'],
    ]);
  } else {
    innerEl = h('div', { class: 'item-inner' }, [
      slots['inner-start'] && slots['inner-start'](),
      slots['before-title'] && slots['before-title'](),
      titleEl,
      slots['after-title'] && slots['after-title'](),
      afterWrapEl,
      swipeout || accordionItem ? null : slots.default && slots.default(),
      slots.inner && slots.inner(),
      slots['inner-end'] && slots['inner-end'](),
    ]);
  }

  const ItemContentTag = checkbox || radio ? 'label' : 'div';

  return h(ItemContentTag, { class: itemContentClasses.value, onClick }, [
    isSortableComputed.value &&
      sortable !== false &&
      isSortableOppositeComputed.value &&
      h('div', { class: 'sortable-handler' }),
    slots['content-start'] && slots['content-start'](),
    inputEl,
    inputIconEl,
    mediaEl,
    innerEl,
    slots.content && slots.content(),
    slots['content-end'] && slots['content-end'](),
  ]);
};

export default {
  name: 'f7-list-item',
  props: {
    title: [String, Number],
    text: [String, Number],
    media: String,
    subtitle: [String, Number],
    header: [String, Number],
    footer: [String, Number],

    // Tooltip
    tooltip: String,
    tooltipTrigger: String,

    // Link Props
    link: [Boolean, String],
    target: String,

    tabLink: [Boolean, String],
    tabLinkActive: Boolean,
    selected: Boolean,

    after: [String, Number],
    badge: [String, Number],
    badgeColor: String,

    mediaItem: Boolean,
    mediaList: Boolean,
    groupTitle: Boolean,
    swipeout: Boolean,
    swipeoutOpened: Boolean,
    sortable: {
      type: Boolean,
      default: undefined,
    },
    sortableOpposite: {
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
    radioIcon: String,
    checkboxIcon: String,
    checked: Boolean,
    indeterminate: Boolean,
    name: String,
    value: {
      type: [String, Number, Array],
      default: undefined,
    },
    readonly: Boolean,
    required: Boolean,
    disabled: Boolean,
    virtualListIndex: Number,
    ...colorProps,
    ...actionsProps,
    ...routerProps,
  },
  emits: [
    'click',
    'swipeout',
    'swipeout:overswipeenter',
    'swipeout:overswipeexit',
    'swipeout:deleted',
    'swipeout:delete',
    'swipeout:close',
    'swipeout:closed',
    'swipeout:open',
    'swipeout:opened',
    'accordion:beforeclose',
    'accordion:close',
    'accordion:closed',
    'accordion:beforeopen',
    'accordion:open',
    'accordion:opened',
    'change',
    'update:checked',
  ],
  setup(props, { slots, emit }) {
    const ListContext = inject('ListContext', {
      value: {
        listIsMedia: false,
        listIsSortable: false,
        listIsSortableOpposite: false,
        listIsSimple: false,
      },
    });

    const listIsMedia = computed(() => ListContext.value.listIsMedia || false);
    const listIsSortable = computed(() => ListContext.value.listIsSortable || false);
    const listIsSortableOpposite = computed(
      () => ListContext.value.listIsSortableOpposite || false,
    );
    const listIsSimple = computed(() => ListContext.value.listIsSimple || false);

    const elRef = ref(null);
    const linkElRef = ref(null);
    const inputElRef = ref(null);

    const onClick = (event) => {
      if (event.target.tagName.toLowerCase() !== 'input') {
        emit('click', event);
      }
    };
    const onSwipeoutOverswipeEnter = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:overswipeenter');
    };
    const onSwipeoutOverswipeExit = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:overswipeexit');
    };
    const onSwipeoutDeleted = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:deleted');
    };
    const onSwipeoutDelete = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:delete');
    };
    const onSwipeoutClose = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:close');
    };
    const onSwipeoutClosed = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:closed');
    };
    const onSwipeoutOpen = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:open');
    };
    const onSwipeoutOpened = (el) => {
      if (elRef.value !== el) return;
      emit('swipeout:opened');
    };
    const onSwipeout = (el, progress) => {
      if (elRef.value !== el) return;
      emit('swipeout', progress);
    };
    const onAccBeforeClose = (el, prevent) => {
      if (elRef.value !== el) return;
      emit('accordion:beforeclose', prevent);
    };
    const onAccClose = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:close');
    };
    const onAccClosed = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:closed');
    };
    const onAccBeforeOpen = (el, prevent) => {
      if (elRef.value !== el) return;
      emit('accordion:beforeopen', prevent);
    };
    const onAccOpen = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:open');
    };
    const onAccOpened = (el) => {
      if (elRef.value !== el) return;
      emit('accordion:opened');
    };
    const onChange = (event) => {
      emit('change', event);
      emit('update:checked', event.target.checked);
    };

    useTooltip(elRef, props);

    useRouteProps(linkElRef, props);

    useSmartSelect(
      props,
      () => {},
      () => elRef.value.querySelector('a.smart-select'),
    );

    watch(
      () => props.swipeoutOpened,
      (newValue) => {
        if (!props.swipeout || !elRef.value || !f7) return;
        if (newValue) {
          f7.swipeout.open(elRef.value);
        } else {
          f7.swipeout.close(elRef.value);
        }
      },
    );

    onMounted(() => {
      f7ready(() => {
        if (props.swipeout) {
          f7.on('swipeoutOpen', onSwipeoutOpen);
          f7.on('swipeoutOpened', onSwipeoutOpened);
          f7.on('swipeoutClose', onSwipeoutClose);
          f7.on('swipeoutClosed', onSwipeoutClosed);
          f7.on('swipeoutDelete', onSwipeoutDelete);
          f7.on('swipeoutDeleted', onSwipeoutDeleted);
          f7.on('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
          f7.on('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
          f7.on('swipeout', onSwipeout);
        }
        if (props.accordionItem) {
          f7.on('accordionBeforeOpen', onAccBeforeOpen);
          f7.on('accordionOpen', onAccOpen);
          f7.on('accordionOpened', onAccOpened);
          f7.on('accordionBeforeClose', onAccBeforeClose);
          f7.on('accordionClose', onAccClose);
          f7.on('accordionClosed', onAccClosed);
        }
        if (props.swipeout && props.swipeoutOpened) {
          f7.swipeout.open(elRef.value);
        }
      });
      if (props.checkbox && inputElRef.value) {
        inputElRef.value.indeterminate = !!props.indeterminate;
      }
    });

    onBeforeUnmount(() => {
      if (!f7) return;
      f7.off('swipeoutOpen', onSwipeoutOpen);
      f7.off('swipeoutOpened', onSwipeoutOpened);
      f7.off('swipeoutClose', onSwipeoutClose);
      f7.off('swipeoutClosed', onSwipeoutClosed);
      f7.off('swipeoutDelete', onSwipeoutDelete);
      f7.off('swipeoutDeleted', onSwipeoutDeleted);
      f7.off('swipeoutOverswipeEnter', onSwipeoutOverswipeEnter);
      f7.off('swipeoutOverswipeExit', onSwipeoutOverswipeExit);
      f7.off('swipeout', onSwipeout);
      f7.off('accordionBeforeOpen', onAccBeforeOpen);
      f7.off('accordionOpen', onAccOpen);
      f7.off('accordionOpened', onAccOpened);
      f7.off('accordionBeforeClose', onAccBeforeClose);
      f7.off('accordionClose', onAccClose);
      f7.off('accordionClosed', onAccClosed);
    });

    watch(
      () => props.indeterminate,
      (newValue) => {
        if (inputElRef.value) {
          inputElRef.value.indeterminate = !!newValue;
        }
      },
    );

    const isMediaComputed = computed(() => props.mediaItem || props.mediaList || listIsMedia.value);
    const isSortableComputed = computed(() =>
      props.sortable === true || props.sortable === false ? props.sortable : listIsSortable.value,
    );
    const isSortableOppositeComputed = computed(
      () => isSortableComputed.value && (props.sortableOpposite || listIsSortableOpposite.value),
    );

    const linkAttrs = computed(() => ({
      href: props.link === true ? '' : props.link || props.href,
      target: props.target,
      'data-tab': (isStringProp(props.tabLink) && props.tabLink) || undefined,
      ...routerAttrs(props),
      ...actionsAttrs(props),
    }));

    const linkClasses = computed(() =>
      classNames(
        {
          'item-link': true,
          'smart-select': props.smartSelect,
          'tab-link': props.tabLink || props.tabLink === '',
          'tab-link-active': props.tabLinkActive,
          'item-selected': props.selected,
        },
        routerClasses(props),
        actionsClasses(props),
      ),
    );

    const itemContentClasses = computed(() =>
      classNames(
        'item-content',
        {
          'item-checkbox': props.checkbox,
          'item-radio': props.radio,
          'item-checkbox-icon-start': props.checkbox && props.checkboxIcon === 'start',
          'item-checkbox-icon-end': props.checkbox && props.checkboxIcon === 'end',
          'item-radio-icon-start': props.radio && props.radioIcon === 'start',
          'item-radio-icon-end': props.radio && props.radioIcon === 'end',
        },
        colorClasses(props),
      ),
    );

    const liClasses = computed(() =>
      classNames(
        {
          'list-group-title': props.groupTitle,
          'media-item': isMediaComputed.value,
          swipeout: props.swipeout,
          'accordion-item': props.accordionItem,
          'accordion-item-opened': props.accordionItemOpened,
          disabled: props.disabled && !(props.radio || props.checkbox),
          'no-chevron': props.noChevron,
          'chevron-center': props.chevronCenter,
          'disallow-sorting': props.sortable === false,
        },
        colorClasses(props),
      ),
    );

    return () => {
      let linkEl;
      let itemContentEl;
      if (!listIsSimple.value) {
        // Item Content
        itemContentEl = ListItemContent({
          props,
          slots,
          inputElRef,
          onChange,
          onClick:
            props.link || props.href || props.accordionItem || props.smartSelect
              ? undefined
              : onClick,
          isMediaComputed,
          isSortableComputed,
          isSortableOppositeComputed,
          itemContentClasses,
        });

        // Link
        if (props.link || props.href || props.accordionItem || props.smartSelect) {
          linkEl = h(
            'a',
            { ref: linkElRef, class: linkClasses.value, ...linkAttrs.value, onClick },
            [itemContentEl],
          );
        }
      }

      if (props.groupTitle) {
        return h(
          'li',
          {
            ref: elRef,
            class: liClasses.value,
            'data-virtual-list-index': props.virtualListIndex,
            onClick,
          },
          [props.title, slots.default && slots.default()],
        );
      }
      if (listIsSimple.value) {
        return h(
          'li',
          {
            ref: elRef,
            class: liClasses.value,
            onClick,
            'data-virtual-list-index': props.virtualListIndex,
          },
          [props.title, slots.default && slots.default()],
        );
      }

      const linkItemEl =
        props.link || props.href || props.smartSelect || props.accordionItem
          ? linkEl
          : itemContentEl;
      return h(
        'li',
        {
          ref: elRef,
          class: liClasses.value,
          'data-virtual-list-index': props.virtualListIndex,
        },
        [
          slots['root-start'] && slots['root-start'](),
          props.swipeout ? h('div', { class: 'swipeout-content' }, [linkItemEl]) : linkItemEl,
          isSortableComputed.value &&
            props.sortable !== false &&
            !isSortableOppositeComputed.value &&
            h('div', { class: 'sortable-handler' }),
          (props.swipeout || props.accordionItem) && slots.default(),
          slots.root && slots.root(),
          slots['root-end'] && slots['root-end'](),
        ],
      );
    };
  },
};
</script>
