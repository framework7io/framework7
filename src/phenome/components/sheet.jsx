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

    let positionComputed = 'bottom';
    if (position) positionComputed = position;
    else if (top) positionComputed = 'top';
    else if (bottom) positionComputed = 'bottom';

    const classes = Utils.classNames(
      className,
      'sheet-modal',
      `sheet-modal-${positionComputed}`,
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
    ]);
  },
  componentDidMount() {
    const self = this;

    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('sheet:open', self.onOpen);
    el.addEventListener('sheet:opened', self.onOpened);
    el.addEventListener('sheet:close', self.onClose);
    el.addEventListener('sheet:closed', self.onClosed);

    const props = self.props;
    const {
      opened,
      backdrop,
      backdropEl,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
    } = props;

    const sheetParams = {
      el: self.refs.el,
    };

    if (process.env.COMPILER === 'vue') {
      if (typeof self.$options.propsData.backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if (typeof self.$options.propsData.backdropEl !== 'undefined') sheetParams.backdropEl = backdropEl;
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') sheetParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeByOutsideClick !== 'undefined') sheetParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof self.$options.propsData.closeOnEscape !== 'undefined') sheetParams.closeOnEscape = closeOnEscape;
    }
    if (process.env.COMPILER === 'react') {
      if ('backdrop' in props && typeof backdrop !== 'undefined') sheetParams.backdrop = backdrop;
      if ('backdropEl' in props) sheetParams.backdropEl = backdropEl;
      if ('closeByBackdropClick' in props) sheetParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) sheetParams.closeByOutsideClick = closeByOutsideClick;
      if ('closeOnEscape' in props) sheetParams.closeOnEscape = closeOnEscape;
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

    const el = self.refs.el;
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
      return self.$f7.sheet.open(self.refs.el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.refs.el, animate);
    },
  },
};
