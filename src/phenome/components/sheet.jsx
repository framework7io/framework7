import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

/* phenome-dts-imports
import { Sheet as SheetNamespace } from 'framework7/components/sheet/sheet';
*/

/* phenome-dts-instance
f7Sheet: SheetNamespace.Sheet
*/

export default {
  name: 'f7-sheet',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
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
    swipeHandler: [String, Object, window.HTMLElement],
    ...Mixins.colorProps,
  },
  render() {
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
      push,
    } = props;

    let fixedTags;
    // phenome-vue-next-line
    fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab list-index').split(' ');
    // phenome-react-next-line
    fixedTags = ('navbar toolbar tabbar subnavbar searchbar messagebar fab list-index').split(' ').map(tagName => `f7-${tagName}`);

    const slotsDefault = self.slots.default;

    if (slotsDefault && slotsDefault.length) {
      slotsDefault.forEach((child) => {
        if (typeof child === 'undefined') return;
        let isFixedTag = false;
        if (process.env.COMPILER === 'react') {
          const tag = child.type && (child.type.displayName || child.type.name);
          if (!tag) {
            staticList.push(child);
            return;
          }
          if (fixedTags.indexOf(tag) >= 0) {
            isFixedTag = true;
          }
        }
        if (process.env.COMPILER === 'vue') {
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
        if (isFixedTag) fixedList.push(child);
        else staticList.push(child);
      });
    }
    const innerEl = (
      <div className="sheet-modal-inner">{staticList}</div>
    );

    let positionComputed = 'bottom';
    if (position) positionComputed = position;
    else if (top) positionComputed = 'top';
    else if (bottom) positionComputed = 'bottom';

    const classes = Utils.classNames(
      className,
      'sheet-modal',
      `sheet-modal-${positionComputed}`,
      {
        'sheet-modal-push': push,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div
        ref="el"
        id={id}
        style={style}
        className={classes}
      >
        {fixedList}
        {innerEl}
      </div>
    );
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
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, [
      'onOpen',
      'onOpened',
      'onClose',
      'onClosed',
      'onStepOpen',
      'onStepClose',
      'onStepProgress',
    ]);
  },
  componentDidMount() {
    const self = this;

    const el = self.refs.el;
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
      swipeHandler,
    } = props;

    const sheetParams = {
      el: self.refs.el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed,
        stepOpen: self.onStepOpen,
        stepClose: self.onStepClose,
        stepProgress: self.onStepProgress,
      },
    };

    if (process.env.COMPILER === 'vue') {
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
    if (process.env.COMPILER === 'react') {
      if ('backdrop' in props && typeof backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if ('backdropEl' in props) sheetParams.backdropEl = backdropEl;
      if ('closeByBackdropClick' in props) sheetParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) sheetParams.closeByOutsideClick = closeByOutsideClick;
      if ('closeOnEscape' in props) sheetParams.closeOnEscape = closeOnEscape;
      if ('swipeToClose' in props) sheetParams.swipeToClose = swipeToClose;
      if ('swipeToStep' in props) sheetParams.swipeToStep = swipeToStep;
      if ('swipeHandler' in props) sheetParams.swipeHandler = swipeHandler;
    }

    self.$f7ready(() => {
      self.f7Sheet = self.$f7.sheet.create(sheetParams);
      if (opened) {
        self.f7Sheet.open(false);
      }
    });
  },
  componentWillUnmount() {
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
  },
};
