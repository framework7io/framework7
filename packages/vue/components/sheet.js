import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-sheet',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean,
    backdrop: Boolean,
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean
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

  created() {
    Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    el.addEventListener('sheet:open', self.onOpen);
    el.addEventListener('sheet:opened', self.onOpened);
    el.addEventListener('sheet:close', self.onClose);
    el.addEventListener('sheet:closed', self.onClosed);
    const props = self.props;
    const {
      opened,
      backdrop,
      closeByBackdropClick,
      closeByOutsideClick
    } = props;
    const sheetParams = {
      el: self.$refs.el
    };
    let useDefaultBackdrop;
    {
      useDefaultBackdrop = self.$options.propsData.backdrop === undefined;
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') sheetParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeByOutsideClick !== 'undefined') sheetParams.closeByOutsideClick = closeByOutsideClick;
    }
    self.$f7ready(f7 => {
      if (useDefaultBackdrop) {
        sheetParams.backdrop = f7.params.sheet && f7.params.sheet.backdrop !== undefined ? f7.params.sheet.backdrop : !self.$theme.ios;
      } else {
        sheetParams.backdrop = backdrop;
      }

      self.f7Sheet = self.$f7.sheet.create(sheetParams);

      if (opened) {
        self.f7Sheet.open(false);
      }
    });
  },

  beforeDestroy() {
    const self = this;
    if (self.f7Sheet) self.f7Sheet.destroy();
    const el = self.$refs.el;
    if (!el) return;
    el.removeEventListener('popup:open', self.onOpen);
    el.removeEventListener('popup:opened', self.onOpened);
    el.removeEventListener('popup:close', self.onClose);
    el.removeEventListener('popup:closed', self.onClosed);
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