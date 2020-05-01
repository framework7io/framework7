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
    backdropEl: [String, Object],
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
    closeOnEscape: Boolean,
    push: Boolean,
    swipeToClose: Boolean,
    swipeToStep: Boolean,
    swipeHandler: [String, Object]
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
      position,
      push
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
    const classes = Utils.classNames(className, 'sheet-modal', `sheet-modal-${positionComputed}`, {
      'sheet-modal-push': push
    }, Mixins.colorClasses(props));
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
      el: self.$refs.el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed,
        stepOpen: self.onStepOpen,
        stepClose: self.onStepClose,
        stepProgress: self.onStepProgress
      }
    };
    {
      const propsData = self.$options.propsData;
      if (typeof propsData.backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') sheetParams.backdropEl = backdropEl;
      if (typeof propsData.closeByBackdropClick !== 'undefined') sheetParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeByOutsideClick !== 'undefined') sheetParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof propsData.closeOnEscape !== 'undefined') sheetParams.closeOnEscape = closeOnEscape;
      if (typeof propsData.swipeToClose !== 'undefined') sheetParams.swipeToClose = swipeToClose;
      if (typeof propsData.swipeToStep !== 'undefined') sheetParams.swipeToStep = swipeToStep;
      if (typeof propsData.swipeHandler !== 'undefined') sheetParams.swipeHandler = swipeHandler;
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
  },

  methods: {
    onStepProgress(instance, progress) {
      this.dispatchEvent('sheet:stepprogress sheetStepProgress', instance, progress);
    },

    onStepOpen(instance) {
      this.dispatchEvent('sheet:stepopen sheetStepOpen', instance);
    },

    onStepClose(instance) {
      this.dispatchEvent('sheet:stepclose sheetStepClose', instance);
    },

    onOpen(instance) {
      this.dispatchEvent('sheet:open sheetOpen', instance);
    },

    onOpened(instance) {
      this.dispatchEvent('sheet:opened sheetOpened', instance);
    },

    onClose(instance) {
      this.dispatchEvent('sheet:close sheetClose', instance);
    },

    onClosed(instance) {
      this.dispatchEvent('sheet:closed sheetClosed', instance);
    },

    open(animate) {
      const self = this;
      if (!self.f7Sheet) return undefined;
      return self.f7Sheet.open(animate);
    },

    close(animate) {
      const self = this;
      if (!self.f7Sheet) return undefined;
      return self.f7Sheet.close(animate);
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