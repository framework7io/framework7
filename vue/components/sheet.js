import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
let __vueComponentPropsKeys;
function __vueComponentGetPropKeys(props) {
  __vueComponentPropsKeys = Object.keys(props);
  return props;
}
const SheetProps = Utils.extend({
  opened: Boolean,
  backdrop: Boolean
}, Mixins.colorProps);
export default {
  name: 'f7-sheet',
  props: __vueComponentGetPropKeys(SheetProps),
  render() {
    var _h = this.$createElement;
    const self = this;
    const fixedList = [];
    const staticList = [];
    let fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
    const slotsDefault = self.$slots.default;
    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach(child => {
        let isFixedTag = false;
        {
          const tag = child.tag;
          if (!tag) {
            return;
          }
          for (let j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixedTag = true;
            }
          }
        }
        if (isFixedTag)
          fixedList.push(child);
        else
          staticList.push(child);
      });
    }
    const innerEl = _h('div', { class: 'sheet-modal-inner' }, [staticList]);
    return _h('div', {
      ref: 'el',
      style: self.props.style,
      class: self.classes,
      attrs: { id: self.props.id }
    }, [
      fixedList,
      innerEl
    ]);
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Sheet)
        return;
      if (opened) {
        self.f7Sheet.open();
      } else {
        self.f7Sheet.close();
      }
    }
  },
  computed: {
    classes() {
      const self = this;
      return Utils.classNames(self.props.className, 'sheet-modal', Mixins.colorClasses(self));
    },
    props() {
      return __vueComponentProps(this, __vueComponentPropsKeys);
    }
  },
  beforeDestroy() {
    const self = this;
    if (self.f7Sheet)
      self.f7Sheet.destroy();
    const el = self.$el;
    if (!el)
      return;
    el.removeEventListener('popup:open', self.onOpenBound);
    el.removeEventListener('popup:opened', self.onOpenedBound);
    el.removeEventListener('popup:close', self.onCloseBound);
    el.removeEventListener('popup:closed', self.onClosedBound);
  },
  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el)
      return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('sheet:open', self.onOpenBound);
    el.addEventListener('sheet:opened', self.onOpenedBound);
    el.addEventListener('sheet:close', self.onCloseBound);
    el.addEventListener('sheet:closed', self.onClosedBound);
    self.$f7ready(() => {
      let backdrop;
      let useDefaultBackdrop;
      useDefaultBackdrop = self.$options.propsData.backdrop === undefined;
      if (useDefaultBackdrop) {
        const app = self.$f7;
        backdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
      }
      self.f7Sheet = self.$f7.sheet.create({
        el: self.$refs.el,
        backdrop
      });
      if (self.props.opened) {
        self.f7Sheet.open(false);
      }
    });
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('sheet:open sheetOpen', event);
    },
    onOpened(event) {
      this.dispatchEvent('sheet:opened sheetOpened', event);
    },
    onClose(event) {
      this.dispatchEvent('sheet:close sheetClose', event);
    },
    onClosed(event) {
      this.dispatchEvent('sheet:closed sheetClosed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7)
        return undefined;
      return self.$f7.sheet.open(self.$refs.el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7)
        return undefined;
      return self.$f7.sheet.close(self.$refs.el, animate);
    },
    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }
  }
};