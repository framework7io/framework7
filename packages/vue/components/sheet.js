import Mixins from '../utils/mixins';
import Utils from '../utils/utils';
import __vueComponentDispatchEvent from '../runtime-helpers/vue-component-dispatch-event.js';
import __vueComponentProps from '../runtime-helpers/vue-component-props.js';
export default {
  name: 'f7-sheet',
  props: Object.assign({
    id: [String, Number],
    opened: Boolean,
    top: Boolean,
    bottom: Boolean,
    position: String,
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
    closeOnEscape: Boolean,
    swipeToClose: Boolean,
    swipeToStep: Boolean,
    swipeHandler: [String, Object, window.HTMLElement]
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
      className,
      top,
      bottom,
      position
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

    let positionComputed = 'bottom';
    if (position) positionComputed = position;else if (top) positionComputed = 'top';else if (bottom) positionComputed = 'bottom';
    const classes = Utils.classNames(className, 'sheet-modal', `sheet-modal-${positionComputed}`, Mixins.colorClasses(props));
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
    Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onStepOpen', 'onStepClose', 'onStepProgress']);
  },

  mounted() {
    const self = this;
    const el = self.$refs.el;
    if (!el) return;
    el.addEventListener('sheet:open', self.onOpen);
    el.addEventListener('sheet:opened', self.onOpened);
    el.addEventListener('sheet:close', self.onClose);
    el.addEventListener('sheet:closed', self.onClosed);
    el.addEventListener('sheet:stepopen', self.onStepOpen);
    el.addEventListener('sheet:stepclose', self.onStepClose);
    el.addEventListener('sheet:stepprogress', self.onStepProgress);
    const props = self.props;
    const {
      opened,
      backdrop,
      backdropEl,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
      swipeToClose,
      swipeToStep,
      swipeHandler
    } = props;
    const sheetParams = {
      el: self.$refs.el
    };
    {
      if (typeof self.$options.propsData.backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if (typeof self.$options.propsData.backdropEl !== 'undefined') sheetParams.backdropEl = backdropEl;
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') sheetParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeByOutsideClick !== 'undefined') sheetParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof self.$options.propsData.closeOnEscape !== 'undefined') sheetParams.closeOnEscape = closeOnEscape;
      if (typeof self.$options.propsData.swipeToClose !== 'undefined') sheetParams.swipeToClose = swipeToClose;
      if (typeof self.$options.propsData.swipeToStep !== 'undefined') sheetParams.swipeToStep = swipeToStep;
      if (typeof self.$options.propsData.swipeHandler !== 'undefined') sheetParams.swipeHandler = swipeHandler;
    }
    self.$f7ready(() => {
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
    el.removeEventListener('sheet:open', self.onOpen);
    el.removeEventListener('sheet:opened', self.onOpened);
    el.removeEventListener('sheet:close', self.onClose);
    el.removeEventListener('sheet:closed', self.onClosed);
    el.removeEventListener('sheet:stepopen', self.onStepOpen);
    el.removeEventListener('sheet:stepclose', self.onStepClose);
    el.removeEventListener('sheet:stepprogress', self.onStepProgress);
  },

  methods: {
    onStepProgress(event) {
      this.dispatchEvent('sheet:stepprogress sheetStepProgress', event.detail);
    },

    onStepOpen(event) {
      this.dispatchEvent('sheet:stepopen sheetStepOpen', event);
    },

    onStepClose(event) {
      this.dispatchEvent('sheet:stepclose sheetStepClose', event);
    },

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