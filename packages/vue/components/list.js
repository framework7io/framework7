import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-list',
  props: Object.assign({
    id: [String, Number],
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
      default: undefined
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
    noChevron: Boolean,
    chevronCenter: Boolean,
    tab: Boolean,
    tabActive: Boolean,
    form: Boolean,
    formStoreData: Boolean,
    inlineLabels: Boolean,
    virtualList: Boolean,
    virtualListParams: Object
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var props = self.props;
    var id = props.id,
        style = props.style,
        form = props.form,
        sortableMoveElements = props.sortableMoveElements;
    var _self$$slots = self.$slots,
        slotsList = _self$$slots.list,
        slotsDefault = _self$$slots.default;
    var rootChildrenBeforeList = [];
    var rootChildrenAfterList = [];
    var ulChildren = slotsList || [];
    var flattenSlots = Utils.flattenArray(slotsDefault);
    var wasUlChild = false;
    flattenSlots.forEach(function (child) {
      if (typeof child === 'undefined') return;
      var tag;
      {
        tag = child.tag;
      }

      if (!tag && 'vue' === 'react' || tag && !(tag === 'li' || tag === 'F7ListItem' || tag === 'F7ListButton' || tag === 'F7ListInput' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0 || tag.indexOf('list-input') >= 0 || tag.indexOf('f7-list-item') >= 0 || tag.indexOf('f7-list-button') >= 0 || tag.indexOf('f7-list-input') >= 0)) {
        if (wasUlChild) rootChildrenAfterList.push(child);else rootChildrenBeforeList.push(child);
      } else if (tag) {
        wasUlChild = true;
        ulChildren.push(child);
      }
    });
    var ListTag = form ? 'form' : 'div';

    if (ulChildren.length > 0) {
      return _h(ListTag, {
        ref: 'el',
        style: style,
        class: self.classes,
        attrs: {
          id: id,
          'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
        }
      }, [self.$slots['before-list'], rootChildrenBeforeList, _h('ul', [ulChildren]), self.$slots['after-list'], rootChildrenAfterList]);
    } else {
      return _h(ListTag, {
        ref: 'el',
        style: style,
        class: self.classes,
        attrs: {
          id: id,
          'data-sortable-move-elements': typeof sortableMoveElements !== 'undefined' ? sortableMoveElements.toString() : undefined
        }
      }, [self.$slots['before-list'], rootChildrenBeforeList, self.$slots['after-list'], rootChildrenAfterList]);
    }
  },
  computed: {
    classes: function classes() {
      var self = this;
      var props = self.props;
      var inset = props.inset,
          xsmallInset = props.xsmallInset,
          smallInset = props.smallInset,
          mediumInset = props.mediumInset,
          largeInset = props.largeInset,
          xlargeInset = props.xlargeInset,
          mediaList = props.mediaList,
          simpleList = props.simpleList,
          linksList = props.linksList,
          sortable = props.sortable,
          sortableTapHold = props.sortableTapHold,
          sortableEnabled = props.sortableEnabled,
          accordionList = props.accordionList,
          contactsList = props.contactsList,
          virtualList = props.virtualList,
          tab = props.tab,
          tabActive = props.tabActive,
          noHairlines = props.noHairlines,
          noHairlinesIos = props.noHairlinesIos,
          noHairlinesMd = props.noHairlinesMd,
          noHairlinesAurora = props.noHairlinesAurora,
          noHairlinesBetween = props.noHairlinesBetween,
          noHairlinesBetweenIos = props.noHairlinesBetweenIos,
          noHairlinesBetweenMd = props.noHairlinesBetweenMd,
          noHairlinesBetweenAurora = props.noHairlinesBetweenAurora,
          formStoreData = props.formStoreData,
          inlineLabels = props.inlineLabels,
          className = props.className,
          noChevron = props.noChevron,
          chevronCenter = props.chevronCenter;
      return Utils.classNames(className, 'list', {
        inset: inset,
        'xsmall-inset': xsmallInset,
        'small-inset': smallInset,
        'medium-inset': mediumInset,
        'large-inset': largeInset,
        'xlarge-inset': xlargeInset,
        'media-list': mediaList,
        'simple-list': simpleList,
        'links-list': linksList,
        sortable: sortable,
        'sortable-tap-hold': sortableTapHold,
        'sortable-enabled': sortableEnabled,
        'accordion-list': accordionList,
        'contacts-list': contactsList,
        'virtual-list': virtualList,
        tab: tab,
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
        'chevron-center': chevronCenter
      }, Mixins.colorClasses(props));
    },
    props: function props() {
      return __vueComponentProps(this);
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onSortableEnable', 'onSortableDisable', 'onSortableSort', 'onTabShow', 'onTabHide', 'onSubmit']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    var _self$props = self.props,
        virtualList = _self$props.virtualList,
        virtualListParams = _self$props.virtualListParams,
        form = _self$props.form;
    self.$f7ready(function (f7) {
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
      var vlParams = virtualListParams || {};
      if (!vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal) return;
      self.f7VirtualList = f7.virtualList.create(Utils.extend({
        el: el,
        on: {
          itemBeforeInsert: function itemBeforeInsert(itemEl, item) {
            var vl = this;
            self.dispatchEvent('virtual:itembeforeinsert virtualItemBeforeInsert', vl, itemEl, item);
          },
          beforeClear: function beforeClear(fragment) {
            var vl = this;
            self.dispatchEvent('virtual:beforeclear virtualBeforeClear', vl, fragment);
          },
          itemsBeforeInsert: function itemsBeforeInsert(fragment) {
            var vl = this;
            self.dispatchEvent('virtual:itemsbeforeinsert virtualItemsBeforeInsert', vl, fragment);
          },
          itemsAfterInsert: function itemsAfterInsert(fragment) {
            var vl = this;
            self.dispatchEvent('virtual:itemsafterinsert virtualItemsAfterInsert', vl, fragment);
          }
        }
      }, vlParams));
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    var el = self.$refs.el;
    var f7 = self.$f7;
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
    onSubmit: function onSubmit(event) {
      this.dispatchEvent('submit', event);
    },
    onSortableEnable: function onSortableEnable(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('sortable:enable sortableEnable');
    },
    onSortableDisable: function onSortableDisable(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('sortable:disable sortableDisable');
    },
    onSortableSort: function onSortableSort(el, sortData, listEl) {
      if (this.eventTargetEl !== listEl) return;
      this.dispatchEvent('sortable:sort sortableSort', sortData);
    },
    onTabShow: function onTabShow(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:show tabShow');
    },
    onTabHide: function onTabHide(el) {
      if (this.eventTargetEl !== el) return;
      this.dispatchEvent('tab:hide tabHide');
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  }
};