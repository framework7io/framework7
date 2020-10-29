<script>
import { computed, ref, onMounted, onBeforeUnmount, h, provide, toRaw } from 'vue';
import { classNames, extend } from '../shared/utils';
import { colorClasses, colorProps } from '../shared/mixins';
import { f7, f7ready } from '../shared/f7';
import { useTab } from '../shared/use-tab';

export default {
  name: 'f7-list',
  props: {
    inset: Boolean,
    xsmallInset: Boolean,
    smallInset: Boolean,
    mediumInset: Boolean,
    largeInset: Boolean,
    xlargeInset: Boolean,
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

    noHairlines: Boolean,
    noHairlinesBetween: Boolean,
    noHairlinesMd: Boolean,
    noHairlinesBetweenMd: Boolean,
    noHairlinesIos: Boolean,
    noHairlinesBetweenIos: Boolean,
    noHairlinesAurora: Boolean,
    noHairlinesBetweenAurora: Boolean,

    // Links Chevron (Arrow) Icon
    noChevron: Boolean,
    chevronCenter: Boolean,

    // Tab
    tab: Boolean,
    tabActive: Boolean,

    // Form
    form: Boolean,
    formStoreData: Boolean,
    inlineLabels: Boolean,

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

    useTab(elRef, emit);

    onMounted(() => {
      f7ready(() => {
        f7.on('sortableEnable', onSortableEnable);
        f7.on('sortableDisable', onSortableDisable);
        f7.on('sortableSort', onSortableSort);

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

      if (!(props.virtualList && f7VirtualList)) return;
      if (f7VirtualList.destroy) f7VirtualList.destroy();
      f7VirtualList = null;
    });

    const classes = computed(() =>
      classNames(
        'list',
        {
          inset: props.inset,
          'xsmall-inset': props.xsmallInset,
          'small-inset': props.smallInset,
          'medium-inset': props.mediumInset,
          'large-inset': props.largeInset,
          'xlarge-inset': props.xlargeInset,
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
          'no-hairlines': props.noHairlines,
          'no-hairlines-md': props.noHairlinesMd,
          'no-hairlines-ios': props.noHairlinesIos,
          'no-hairlines-aurora': props.noHairlinesAurora,
          'no-hairlines-between': props.noHairlinesBetween,
          'no-hairlines-between-md': props.noHairlinesBetweenMd,
          'no-hairlines-between-ios': props.noHairlinesBetweenIos,
          'no-hairlines-between-aurora': props.noHairlinesBetweenAurora,
          'form-store-data': props.formStoreData,
          'inline-labels': props.inlineLabels,
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
      const ulChildren = slotsList || [];
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
