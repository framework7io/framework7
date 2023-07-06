<script>
import { computed, ref, onMounted, onBeforeUnmount, h, provide, toRaw } from 'vue';
import { classNames, extend } from '../shared/utils.js';
import { colorClasses, colorProps } from '../shared/mixins.js';
import { f7, f7ready } from '../shared/f7.js';
import { useTab } from '../shared/use-tab.js';

export default {
  name: 'f7-list',
  props: {
    inset: Boolean,
    insetIos: Boolean,
    insetMd: Boolean,
    xsmallInset: Boolean,
    xsmallInsetIos: Boolean,
    xsmallInsetMd: Boolean,
    smallInset: Boolean,
    smallInsetIos: Boolean,
    smallInsetMd: Boolean,
    mediumInset: Boolean,
    mediumInsetIos: Boolean,
    mediumInsetMd: Boolean,
    largeInset: Boolean,
    largeInsetIos: Boolean,
    largeInsetMd: Boolean,
    xlargeInset: Boolean,
    xlargeInsetIos: Boolean,
    xlargeInsetMd: Boolean,
    strong: Boolean,
    strongIos: Boolean,
    strongMd: Boolean,
    outline: Boolean,
    outlineIos: Boolean,
    outlineMd: Boolean,
    dividers: Boolean,
    dividersIos: Boolean,
    dividersMd: Boolean,
    mediaList: Boolean,
    sortable: Boolean,
    sortableTapHold: Boolean,
    sortableEnabled: Boolean,
    sortableMoveElements: {
      type: Boolean,
      default: undefined,
    },
    sortableOpposite: Boolean,
    accordionList: Boolean,
    accordionOpposite: Boolean,
    contactsList: Boolean,
    simpleList: Boolean,
    linksList: Boolean,
    menuList: Boolean,

    // Links Chevron (Arrow) Icon
    noChevron: Boolean,
    chevronCenter: Boolean,

    // Tab
    tab: Boolean,
    tabActive: Boolean,

    // Form
    form: Boolean,
    formStoreData: Boolean,

    // Virtual List
    virtualList: Boolean,
    virtualListParams: Object,
    ...colorProps,
  },
  emits: [
    'submit',
    'sortable:enable',
    'sortable:disable',
    'sortable:sort',
    'sortable:move',
    'virtual:itembeforeinsert',
    'virtual:beforeclear',
    'virtual:itemsbeforeinsert',
    'virtual:itemsafterinsert',
    'tab:hide',
    'tab:show',
  ],
  setup(props, { emit, slots }) {
    let f7VirtualList = null;
    const elRef = ref(null);

    const onSubmit = (event) => {
      emit('submit', event);
    };
    const onSortableEnable = (el) => {
      if (elRef.value !== el) return;
      emit('sortable:enable');
    };
    const onSortableDisable = (el) => {
      if (elRef.value !== el) return;
      emit('sortable:disable');
    };
    const onSortableSort = (el, sortData, listEl) => {
      if (elRef.value !== listEl) return;
      emit('sortable:sort', sortData);
    };
    const onSortableMove = (el, listEl) => {
      if (elRef.value !== listEl) return;
      emit('sortable:move', el, listEl);
    };

    useTab(elRef, emit);

    onMounted(() => {
      f7ready(() => {
        f7.on('sortableEnable', onSortableEnable);
        f7.on('sortableDisable', onSortableDisable);
        f7.on('sortableSort', onSortableSort);
        f7.on('sortableMove', onSortableMove);

        if (!props.virtualList) return;
        const vlParams = props.virtualListParams || {};
        if (!vlParams.renderItem && !vlParams.renderExternal) return;
        if (vlParams.items) vlParams.items = toRaw(vlParams.items);

        f7VirtualList = f7.virtualList.create(
          extend(
            {
              el: elRef.value,
              on: {
                itemBeforeInsert(itemEl, item) {
                  const vl = this;
                  emit('virtual:itembeforeinsert', vl, itemEl, item);
                },
                beforeClear(fragment) {
                  const vl = this;
                  emit('virtual:beforeclear', vl, fragment);
                },
                itemsBeforeInsert(fragment) {
                  const vl = this;
                  emit('virtual:itemsbeforeinsert', vl, fragment);
                },
                itemsAfterInsert(fragment) {
                  const vl = this;
                  emit('virtual:itemsafterinsert', vl, fragment);
                },
              },
            },
            vlParams,
          ),
        );
      });
    });

    onBeforeUnmount(() => {
      if (!f7) return;
      f7.off('sortableEnable', onSortableEnable);
      f7.off('sortableDisable', onSortableDisable);
      f7.off('sortableSort', onSortableSort);
      f7.off('sortableMove', onSortableMove);

      if (!(props.virtualList && f7VirtualList)) return;
      if (f7VirtualList.destroy) f7VirtualList.destroy();
      f7VirtualList = null;
    });

    const classes = computed(() =>
      classNames(
        'list',
        {
          inset: props.inset,
          'inset-ios': props.insetIos,
          'inset-md': props.insetMd,
          'xsmall-inset': props.xsmallInset,
          'xsmall-inset-ios': props.xsmallInsetIos,
          'xsmall-inset-md': props.xsmallInsetMd,
          'small-inset': props.smallInset,
          'small-inset-ios': props.smallInsetIos,
          'small-inset-md': props.smallInsetMd,
          'medium-inset': props.mediumInset,
          'medium-inset-ios': props.mediumInsetIos,
          'medium-inset-md': props.mediumInsetMd,
          'large-inset': props.largeInset,
          'large-inset-ios': props.largeInsetIos,
          'large-inset-md': props.largeInsetMd,
          'xlarge-inset': props.xlargeInset,
          'xlarge-inset-ios': props.xlargeInsetIos,
          'xlarge-inset-md': props.xlargeInsetMd,
          'list-strong': props.strong,
          'list-strong-ios': props.strongIos,
          'list-strong-md': props.strongMd,
          'list-outline': props.outline,
          'list-outline-ios': props.outlineIos,
          'list-outline-md': props.outlineMd,
          'list-dividers': props.dividers,
          'list-dividers-ios': props.dividersIos,
          'list-dividers-md': props.dividersMd,
          'media-list': props.mediaList,
          'simple-list': props.simpleList,
          'links-list': props.linksList,
          'menu-list': props.menuList,
          sortable: props.sortable,
          'sortable-tap-hold': props.sortableTapHold,
          'sortable-enabled': props.sortableEnabled,
          'sortable-opposite': props.sortableOpposite,
          'accordion-list': props.accordionList,
          'accordion-opposite': props.accordionOpposite,
          'contacts-list': props.contactsList,
          'virtual-list': props.virtualList,
          tab: props.tab,
          'tab-active': props.tabActive,
          'form-store-data': props.formStoreData,
          'no-chevron': props.noChevron,
          'chevron-center': props.chevronCenter,
        },
        colorClasses(props),
      ),
    );

    const ListTag = computed(() => (props.form ? 'form' : 'div'));

    const ListContext = computed(() => ({
      listIsMedia: props.mediaList,
      listIsSimple: props.simpleList,
      listIsSortable: props.sortable,
      listIsSortableOpposite: props.sortableOpposite,
    }));

    provide('ListContext', ListContext);

    return () => {
      const { list: slotsList, default: slotsDefault } = slots;
      const rootChildrenBeforeList = [];
      const rootChildrenAfterList = [];
      const ulChildren = slotsList && typeof slotsList === 'function' ? [slotsList()] : [];
      let wasUlChild = false;
      if (slotsDefault) {
        slotsDefault().forEach((vnode) => {
          if (typeof vnode === 'undefined') return;
          const tag = vnode.type && vnode.type.name ? vnode.type.name : vnode.type;
          if (tag && typeof tag === 'symbol') {
            wasUlChild = true;
            ulChildren.push(vnode);
          } else if (
            !tag ||
            (tag &&
              !(
                tag === 'li' ||
                tag.indexOf('f7-list-item') >= 0 ||
                tag.indexOf('f7-list-button') >= 0 ||
                tag.indexOf('f7-list-input') >= 0
              ))
          ) {
            if (wasUlChild) rootChildrenAfterList.push(vnode);
            else rootChildrenBeforeList.push(vnode);
          } else if (tag) {
            wasUlChild = true;
            ulChildren.push(vnode);
          }
        });
      }

      return h(
        ListTag.value,
        {
          ref: elRef,
          class: classes.value,
          'data-sortable-move-elements':
            typeof props.sortableMoveElements !== 'undefined'
              ? props.sortableMoveElements.toString()
              : undefined,
          onSubmit,
        },
        [
          slots['before-list'] && slots['before-list'](),
          rootChildrenBeforeList,
          ulChildren.length > 0 && h('ul', ulChildren),
          slots['after-list'] && slots['after-list'](),
          rootChildrenAfterList,
        ],
      );
    };
  },
};
</script>
