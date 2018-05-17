import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7List extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }
  onSortableEnable(event) {
    this.dispatchEvent('sortable:enable sortableEnable', event);
  }
  onSortableDisable(event) {
    this.dispatchEvent('sortable:disable sortableDisable', event);
  }
  onSortableSort(event) {
    this.dispatchEvent('sortable:sort sortableSort', event, event.detail);
  }
  onTabShow(e) {
    this.dispatchEvent('tab:show tabShow', e);
  }
  onTabHide(e) {
    this.dispatchEvent('tab:hide tabHide', e);
  }
  get classes() {
    const self = this;
    const {inset, tabletInset, mediaList, simpleList, linksList, sortable, accordionList, contactsList, virtualList, sortableEnabled, tab, tabActive, noHairlines, noHairlinesIos, noHairlinesMd, noHairlinesBetween, noHairlinesBetweenIos, noHairlinesBetweenMd, formStoreData, inlineLabels} = self.props;
    return Utils.classNames(self.props.className, 'list', {
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
      'form-store-data': formStoreData,
      'inline-labels': inlineLabels
    }, Mixins.colorClasses(self));
  }
  render() {
    const self = this;
    const {id, style, form} = self.props;
    const {
      list: slotsList,
      default: slotsDefault
    } = self.slots;
    const rootChildren = [];
    const ulChildren = slotsList || [];
    const flattenSlots = Utils.flattenArray(slotsDefault);
    flattenSlots.forEach(child => {
      let tag;
      {
        tag = child.type && child.type.name;
        if (!tag && typeof child.type === 'string') {
          tag = child.type;
        }
      }
      if (!tag && 'react' === 'react' || tag && !(tag === 'li' || tag === 'F7ListItem' || tag === 'F7ListButton' || tag.indexOf('list-item') >= 0 || tag.indexOf('list-button') >= 0)) {
        rootChildren.push(child);
      } else if (tag) {
        ulChildren.push(child);
      }
    });
    const ListTag = form ? 'form' : 'div';
    if (ulChildren.length > 0) {
      return React.createElement(ListTag, {
        id: id,
        ref: __reactNode => {
          this.__reactRefs['el'] = __reactNode;
        },
        style: style,
        className: self.classes
      }, self.slots['before-list'], React.createElement('ul', null, ulChildren), self.slots['after-list'], rootChildren);
    } else {
      return React.createElement(ListTag, {
        id: id,
        ref: __reactNode => {
          this.__reactRefs['el'] = __reactNode;
        },
        style: style,
        className: self.classes
      }, self.slots['before-list'], rootChildren, self.slots['after-list']);
    }
  }
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (el) {
      self.onSortableEnableBound = self.onSortableEnable.bind(self);
      self.onSortableDisableBound = self.onSortableDisable.bind(self);
      self.onSortableSortBound = self.onSortableSort.bind(self);
      self.onTabShowBound = self.onTabShow.bind(self);
      self.onTabHideBound = self.onTabHide.bind(self);
      el.addEventListener('sortable:enable', self.onSortableEnableBound);
      el.addEventListener('sortable:disable', self.onSortableDisableBound);
      el.addEventListener('sortable:sort', self.onSortableSortBound);
      el.addEventListener('tab:show', self.onTabShowBound);
      el.addEventListener('tab:hide', self.onTabHideBound);
    }
    if (!self.props.virtualList)
      return;
    self.$f7ready(f7 => {
      const $$ = self.$$;
      const $el = $$(el);
      const templateScript = $el.find('script');
      let template = templateScript.html();
      if (!template && templateScript.length > 0) {
        template = templateScript[0].outerHTML;
        template = /\<script type="text\/template7"\>(.*)<\/script>/.exec(template)[1];
      }
      const vlParams = self.props.virtualListParams || {};
      if (!template && !vlParams.renderItem && !vlParams.itemTemplate && !vlParams.renderExternal)
        return;
      if (template)
        template = self.$t7.compile(template);
      self.f7VirtualList = f7.virtualList.create(Utils.extend({
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
          }
        }
      }, vlParams));
    });
  }
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (el) {
      el.removeEventListener('sortable:enable', self.onSortableEnableBound);
      el.removeEventListener('sortable:disable', self.onSortableDisableBound);
      el.removeEventListener('sortable:sort', self.onSortableSortBound);
      el.removeEventListener('tab:show', self.onTabShowBound);
      el.removeEventListener('tab:hide', self.onTabHideBound);
    }
    if (!(self.virtualList && self.f7VirtualList))
      return;
    if (self.f7VirtualList.destroy)
      self.f7VirtualList.destroy();
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  get refs() {
    return this.__reactRefs;
  }
  set refs(refs) {
  }
}
__reactComponentSetProps(F7List, {
  id: [
    String,
    Number
  ],
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
  tab: Boolean,
  tabActive: Boolean,
  form: Boolean,
  formStoreData: Boolean,
  inlineLabels: Boolean,
  virtualList: Boolean,
  virtualListParams: Object,
  ...Mixins.colorProps
});
export default F7List;