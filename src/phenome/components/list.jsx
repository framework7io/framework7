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
    tabletInset: Boolean,
    mediaList: Boolean,
    sortable: Boolean,
    sortableEnabled: Boolean,
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
        tabletInset,
        mediaList,
        simpleList,
        linksList,
        sortable,
        accordionList,
        contactsList,
        virtualList,
        sortableEnabled,
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
          'tablet-inset': tabletInset,
          'media-list': mediaList,
          'simple-list': simpleList,
          'links-list': linksList,
          sortable,
          'accordion-list': accordionList,
          'contacts-list': contactsList,
          'virtual-list': virtualList,
          'sortable-enabled': sortableEnabled,
          tab,
          'tab-active': tabActive,
          'no-hairlines': noHairlines,
          'no-hairlines-between': noHairlinesBetween,
          'no-hairlines-md': noHairlinesMd,
          'no-hairlines-between-md': noHairlinesBetweenMd,
          'no-hairlines-ios': noHairlinesIos,
          'no-hairlines-between-ios': noHairlinesBetweenIos,
          'no-hairlines-aurora': noHairlinesAurora,
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
    if (el) {
      el.addEventListener('sortable:enable', self.onSortableEnable);
      el.addEventListener('sortable:disable', self.onSortableDisable);
      el.addEventListener('sortable:sort', self.onSortableSort);
      el.addEventListener('tab:show', self.onTabShow);
      el.addEventListener('tab:hide', self.onTabHide);
      if (form) {
        el.addEventListener('submit', self.onSubmit);
      }
    }

    if (!virtualList) return;

    self.$f7ready((f7) => {
      const $$ = self.$$;
      const $el = $$(el);
      const templateScript = $el.find('script');
      let template = templateScript.html();
      if (!template && templateScript.length > 0) {
        template = templateScript[0].outerHTML;
        // eslint-disable-next-line
        template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
      }
      const vlParams = virtualListParams || {};
      if (!template && !vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;
      if (template) template = self.$t7.compile(template);

      self.f7VirtualList = f7.virtualList.create(Utils.extend(
        {
          el,
          itemTemplate: template,
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
    if (el) {
      el.removeEventListener('sortable:enable', self.onSortableEnable);
      el.removeEventListener('sortable:disable', self.onSortableDisable);
      el.removeEventListener('sortable:sort', self.onSortableSort);
      el.removeEventListener('tab:show', self.onTabShow);
      el.removeEventListener('tab:hide', self.onTabHide);
      if (self.props.form) {
        el.removeEventListener('submit', self.onSubmit);
      }
    }
    if (!(self.virtualList && self.f7VirtualList)) return;
    if (self.f7VirtualList.destroy) self.f7VirtualList.destroy();
  },
  methods: {
    onSubmit(event) {
      this.dispatchEvent('submit', event);
    },
    onSortableEnable(event) {
      this.dispatchEvent('sortable:enable sortableEnable', event);
    },
    onSortableDisable(event) {
      this.dispatchEvent('sortable:disable sortableDisable', event);
    },
    onSortableSort(event) {
      const sortData = event.detail;
      this.dispatchEvent('sortable:sort sortableSort', event, sortData);
    },
    onTabShow(event) {
      this.dispatchEvent('tab:show tabShow', event);
    },
    onTabHide(event) {
      this.dispatchEvent('tab:hide tabHide', event);
    },
  },
};
