import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { VirtualList as VirtualListNamespace } from 'framework7/components/virtual-list/virtual-list';
*/

/* phenome-dts-instance
f7VirtualList: VirtualListNamespace.VirtualList
*/

export default {
  name: 'f7-list',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line

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
    accordionList: Boolean,
    contactsList: Boolean,
    simpleList: Boolean,
    linksList: Boolean,

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
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      style,
      form,
      sortableMoveElements,
    } = props;

    const { list: slotsList, default: slotsDefault } = self.slots;
    const rootChildrenBeforeList = [];
    const rootChildrenAfterList = [];
    const ulChildren = slotsList || [];
    const flattenSlots = Utils.flattenArray(slotsDefault);

    let wasUlChild = false;
    flattenSlots.forEach((child) => {
      if (typeof child === 'undefined') return;
      let tag;
      if (process.env.COMPILER === 'react') {
        tag = child.type && (child.type.displayName || child.type.name);
        if (!tag && typeof child.type === 'string') {
          tag = child.type;
        }
      }
      if (process.env.COMPILER === 'vue') {
        tag = child.tag;
      }

      if (
        (!tag && process.env.COMPILER === 'react')
        || (tag && !(
          tag === 'li'
          || tag === 'F7ListItem'
          || tag === 'F7ListButton'
          || tag === 'F7ListInput'
          || tag.indexOf('list-item') >= 0
          || tag.indexOf('list-button') >= 0
          || tag.indexOf('list-input') >= 0
          || tag.indexOf('f7-list-item') >= 0
          || tag.indexOf('f7-list-button') >= 0
          || tag.indexOf('f7-list-input') >= 0
        ))
      ) {
        if (wasUlChild) rootChildrenAfterList.push(child);
        else rootChildrenBeforeList.push(child);
      } else if (tag) {
        wasUlChild = true;
        ulChildren.push(child);
      }
    });
    const ListTag = form ? 'form' : 'div';
    if (ulChildren.length > 0) {
      return (
        <ListTag
          id={id}
          ref="el"
          style={style}
          className={self.classes}
          data-sortable-move-elements={typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined}
        >
          {self.slots['before-list']}
          {rootChildrenBeforeList}
          <ul>
            {ulChildren}
          </ul>
          {self.slots['after-list']}
          {rootChildrenAfterList}
        </ListTag>
      );
    } else { // eslint-disable-line
      return (
        <ListTag
          id={id}
          ref="el"
          style={style}
          className={self.classes}
          data-sortable-move-elements={typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined}
        >
          {self.slots['before-list']}
          {rootChildrenBeforeList}
          {self.slots['after-list']}
          {rootChildrenAfterList}
        </ListTag>
      );
    }
  },
  computed: {
    classes() {
      const self = this;
      const props = self.props;
      const {
        inset,
        xsmallInset,
        smallInset,
        mediumInset,
        largeInset,
        xlargeInset,
        mediaList,
        simpleList,
        linksList,
        sortable,
        sortableTapHold,
        sortableEnabled,
        accordionList,
        contactsList,
        virtualList,
        tab,
        tabActive,
        noHairlines,
        noHairlinesIos,
        noHairlinesMd,
        noHairlinesAurora,
        noHairlinesBetween,
        noHairlinesBetweenIos,
        noHairlinesBetweenMd,
        noHairlinesBetweenAurora,
        formStoreData,
        inlineLabels,
        className,
        noChevron,
        chevronCenter,
      } = props;

      return Utils.classNames(
        className,
        'list',
        {
          inset,
          'xsmall-inset': xsmallInset,
          'small-inset': smallInset,
          'medium-inset': mediumInset,
          'large-inset': largeInset,
          'xlarge-inset': xlargeInset,
          'media-list': mediaList,
          'simple-list': simpleList,
          'links-list': linksList,
          sortable,
          'sortable-tap-hold': sortableTapHold,
          'sortable-enabled': sortableEnabled,
          'accordion-list': accordionList,
          'contacts-list': contactsList,
          'virtual-list': virtualList,
          tab,
          'tab-active': tabActive,
          'no-hairlines': noHairlines,
          'no-hairlines-md': noHairlinesMd,
          'no-hairlines-ios': noHairlinesIos,
          'no-hairlines-aurora': noHairlinesAurora,
          'no-hairlines-between': noHairlinesBetween,
          'no-hairlines-between-md': noHairlinesBetweenMd,
          'no-hairlines-between-ios': noHairlinesBetweenIos,
          'no-hairlines-between-aurora': noHairlinesBetweenAurora,
          'form-store-data': formStoreData,
          'inline-labels': inlineLabels,
          'no-chevron': noChevron,
          'chevron-center': chevronCenter,
        },
        Mixins.colorClasses(props),
      );
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onSortableEnable',
      'onSortableDisable',
      'onSortableSort',
      'onTabShow',
      'onTabHide',
      'onSubmit',
    ]);
  },
  componentDidMount() {
    const self = this;
    // Init Virtual List
    const el = self.refs.el;
    const { virtualList, virtualListParams, form } = self.props;

    self.$f7ready((f7) => {
      self.eventTargetEl = el;

      f7.on('sortableEnable', self.onSortableEnable);
      f7.on('sortableDisable', self.onSortableDisable);
      f7.on('sortableSort', self.onSortableSort);
      f7.on('tabShow', self.onTabShow);
      f7.on('tabHide', self.onTabHide);

      if (form) {
        el.addEventListener('submit', self.onSubmit);
      }

      if (!virtualList) return;
      const vlParams = virtualListParams || {};
      if (!vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;

      self.f7VirtualList = f7.virtualList.create(Utils.extend(
        {
          el,
          on: {
            itemBeforeInsert(itemEl, item) {
              const vl = this;
              self.dispatchEvent('virtual:itembeforeinsert virtualItemBeforeInsert', vl, itemEl, item);
            },
            beforeClear(fragment) {
              const vl = this;
              self.dispatchEvent('virtual:beforeclear virtualBeforeClear', vl, fragment);
            },
            itemsBeforeInsert(fragment) {
              const vl = this;
              self.dispatchEvent('virtual:itemsbeforeinsert virtualItemsBeforeInsert', vl, fragment);
            },
            itemsAfterInsert(fragment) {
              const vl = this;
              self.dispatchEvent('virtual:itemsafterinsert virtualItemsAfterInsert', vl, fragment);
            },
          },
        },
        vlParams,
      ));
    });
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    const f7 = self.$f7;
    if (!el || !f7) return;
    f7.off('sortableEnable', self.onSortableEnable);
    f7.off('sortableDisable', self.onSortableDisable);
    f7.off('sortableSort', self.onSortableSort);
    f7.off('tabShow', self.onTabShow);
    f7.off('tabHide', self.onTabHide);
    el.removeEventListener('submit', self.onSubmit);
    self.eventTargetEl = null;
    delete self.eventTargetEl;

    if (!(self.virtualList && self.f7VirtualList)) return;
    if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
  },
  methods: {
    onSubmit(event) {
      this.dispatchEvent('submit', event);
    },
    onSortableEnable(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('sortable:enable sortableEnable');
    },
    onSortableDisable(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('sortable:disable sortableDisable');
    },
    onSortableSort(el, sortData, listEl) {
      if (this.eventTargetEl !== listEl) return;
      this.dispatchEvent('sortable:sort sortableSort', sortData);
    },
    onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:show tabShow');
    },
    onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:hide tabHide');
    },
  },
};
