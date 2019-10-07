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
    push: Boolean,
    swipeToClose: Boolean,
    swipeToStep: Boolean,
    swipeHandler: [String, Object, window.HTMLElement]
  }, Mixins.colorProps),
  render: function render() {
    var _h = this.$createElement;
    var self = this;
    var fixedList = [];
    var staticList = [];
    var props = self.props;
    var id = props.id,
        style = props.style,
        className = props.className,
        top = props.top,
        bottom = props.bottom,
        position = props.position,
        push = props.push;
    var fixedTags;
    fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'.split(' ');
    var slotsDefault = self.$slots.default;

    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach(function (child) {
        if (typeof child === 'undefined') return;
        var isFixedTag = false;
        {
          var tag = child.tag;

          if (!tag) {
            return;
          }

          for (var j = 0; j < fixedTags.length; j += 1) {
            if (tag.indexOf(fixedTags[j]) >= 0) {
              isFixedTag = true;
            }
          }
        }
        if (isFixedTag) fixedList.push(child);else staticList.push(child);
      });
    }

    var innerEl = _h('div', {
      class: 'sheet-modal-inner'
    }, [staticList]);

    var positionComputed = 'bottom';
    if (position) positionComputed = position;else if (top) positionComputed = 'top';else if (bottom) positionComputed = 'bottom';
    var classes = Utils.classNames(className, 'sheet-modal', "sheet-modal-".concat(positionComputed), {
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
      var self = this;
      if (!self.f7Sheet) return;

      if (opened) {
        self.f7Sheet.open();
      } else {
        self.f7Sheet.close();
      }
    }
  },
  created: function created() {
    Utils.bindMethods(this, ['onOpen', 'onOpened', 'onClose', 'onClosed', 'onStepOpen', 'onStepClose', 'onStepProgress']);
  },
  mounted: function mounted() {
    var self = this;
    var el = self.$refs.el;
    if (!el) return;
    var props = self.props;
    var opened = props.opened,
        backdrop = props.backdrop,
        backdropEl = props.backdropEl,
        closeByBackdropClick = props.closeByBackdropClick,
        closeByOutsideClick = props.closeByOutsideClick,
        closeOnEscape = props.closeOnEscape,
        swipeToClose = props.swipeToClose,
        swipeToStep = props.swipeToStep,
        swipeHandler = props.swipeHandler;
    var sheetParams = {
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
      var propsData = self.$options.propsData;
      if (typeof propsData.backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') sheetParams.backdropEl = backdropEl;
      if (typeof propsData.closeByBackdropClick !== 'undefined') sheetParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeByOutsideClick !== 'undefined') sheetParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof propsData.closeOnEscape !== 'undefined') sheetParams.closeOnEscape = closeOnEscape;
      if (typeof propsData.swipeToClose !== 'undefined') sheetParams.swipeToClose = swipeToClose;
      if (typeof propsData.swipeToStep !== 'undefined') sheetParams.swipeToStep = swipeToStep;
      if (typeof propsData.swipeHandler !== 'undefined') sheetParams.swipeHandler = swipeHandler;
    }
    self.$f7ready(function () {
      self.f7Sheet = self.$f7.sheet.create(sheetParams);

      if (opened) {
        self.f7Sheet.open(false);
      }
    });
  },
  beforeDestroy: function beforeDestroy() {
    var self = this;
    if (self.f7Sheet) self.f7Sheet.destroy();
  },
  methods: {
    onStepProgress: function onStepProgress(instance, progress) {
      this.dispatchEvent('sheet:stepprogress sheetStepProgress', instance, progress);
    },
    onStepOpen: function onStepOpen(instance) {
      this.dispatchEvent('sheet:stepopen sheetStepOpen', instance);
    },
    onStepClose: function onStepClose(instance) {
      this.dispatchEvent('sheet:stepclose sheetStepClose', instance);
    },
    onOpen: function onOpen(instance) {
      this.dispatchEvent('sheet:open sheetOpen', instance);
    },
    onOpened: function onOpened(instance) {
      this.dispatchEvent('sheet:opened sheetOpened', instance);
    },
    onClose: function onClose(instance) {
      this.dispatchEvent('sheet:close sheetClose', instance);
    },
    onClosed: function onClosed(instance) {
      this.dispatchEvent('sheet:closed sheetClosed', instance);
    },
    open: function open(animate) {
      var self = this;
      if (!self.f7Sheet) return undefined;
      return self.f7Sheet.open(animate);
    },
    close: function close(animate) {
      var self = this;
      if (!self.f7Sheet) return undefined;
      return self.f7Sheet.close(animate);
    },
    dispatchEvent: function dispatchEvent(events) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      __vueComponentDispatchEvent.apply(void 0, [this, events].concat(args));
    }
  },
  computed: {
    props: function props() {
      return __vueComponentProps(this);
    }
  }
};