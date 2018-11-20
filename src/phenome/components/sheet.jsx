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
    backdrop: Boolean,
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
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

    const classes = Utils.classNames(
      className,
      'sheet-modal',
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
  componentDidMount() {
    const self = this;

    const el = self.refs.el;
    if (!el) return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('sheet:open', self.onOpenBound);
    el.addEventListener('sheet:opened', self.onOpenedBound);
    el.addEventListener('sheet:close', self.onCloseBound);
    el.addEventListener('sheet:closed', self.onClosedBound);

    const props = self.props;
    const {
      opened,
      backdrop,
      closeByBackdropClick,
      closeByOutsideClick,
    } = props;

    const sheetParams = {
      el: self.refs.el,
    };

    let useDefaultBackdrop;
    if (process.env.COMPILER === 'vue') {
      useDefaultBackdrop = self.$options.propsData.backdrop === undefined;
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') sheetParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeByOutsideClick !== 'undefined') sheetParams.closeByOutsideClick = closeByOutsideClick;
    }
    if (process.env.COMPILER === 'react') {
      useDefaultBackdrop = typeof backdrop === 'undefined';
      if ('closeByBackdropClick' in props) sheetParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) sheetParams.closeByOutsideClick = closeByOutsideClick;
    }

    self.$f7ready((f7) => {
      if (useDefaultBackdrop) {
        sheetParams.backdrop = f7.params.sheet && f7.params.sheet.backdrop !== undefined
          ? f7.params.sheet.backdrop
          : self.$theme.md;
      } else {
        sheetParams.backdrop = backdrop;
      }
      self.f7Sheet = self.$f7.sheet.create(sheetParams);
      if (opened) {
        self.f7Sheet.open(false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Sheet) self.f7Sheet.destroy();

    const el = self.refs.el;
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
      return self.$f7.sheet.open(self.refs.el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.refs.el, animate);
    },
  },
};
