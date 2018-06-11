import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-sheet',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean,
    backdrop: Boolean
  }, Mixins.colorProps),

  render() {
    const _h = this.$createElement;
    const self = this;
    const fixedList = [];
    const staticList = [];
    const props = self.props;
    const {
      id,
      style,
      className
    } = props;
    let fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
    const slotsDefault = self.$slots.default;

    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach(child => {
        if (typeof child === 'undefined') return;
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
        if (isFixedTag) fixedList.push(child);else staticList.push(child);
      });
    }

    const innerEl = _h('div', {
      class: 'sheet-modal-inner'
    }, [staticList]);

    const classes = Utils.classNames(className, 'sheet-modal', Mixins.colorClasses(props));
    return _h('div', {
      ref: 'el',
      style: style,
      class: classes,
      attrs: {
        id: id
      }
    }, [fixedList, innerEl]);
  },

  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Sheet) return;

      if (opened) {
        self.f7Sheet.open();
      } else {
        self.f7Sheet.close();
      }
    }
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('sheet:open', self.onOpenBound);
    el.addEventListener('sheet:opened', self.onOpenedBound);
    el.addEventListener('sheet:close', self.onCloseBound);
    el.addEventListener('sheet:closed', self.onClosedBound);
    self.$f7ready(() => {
      let useBackdrop;
      let useDefaultBackdrop;
      const {
        opened,
        backdrop
      } = self.props;
      useDefaultBackdrop = self.$options.propsData.backdrop === undefined;

      if (useDefaultBackdrop) {
        const app = self.$f7;
        useBackdrop = app.params.sheet && app.params.sheet.backdrop !== undefined ? app.params.sheet.backdrop : self.$theme.md;
      }

      self.f7Sheet = self.$f7.sheet.create({
        el: self.$refs.el,
        backdrop: useBackdrop
      });

      if (opened) {
        self.f7Sheet.open(false);
      }
    });
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Sheet) self.f7Sheet.destroy();
    const el = self.$el;
    if (!el) return;
    el.removeEventListener('popup:open', self.onOpenBound);
    el.removeEventListener('popup:opened', self.onOpenedBound);
    el.removeEventListener('popup:close', self.onCloseBound);
    el.removeEventListener('popup:closed', self.onClosedBound);
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
      if (!self.$f7) return undefined;
      return self.$f7.sheet.open(self.$refs.el, animate);
    },

    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.$refs.el, animate);
    },

    dispatchEvent(events, ...args) {
      __vueComponentDispatchEvent(this, events, ...args);
    }

  },
  computed: {
    props() {
      return __vueComponentProps(this);
    }

  }
};