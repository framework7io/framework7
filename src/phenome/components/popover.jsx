import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

/* phenome-dts-imports
import { Popover as PopoverNamespace } from 'framework7/components/popover/popover';
*/

/* phenome-dts-instance
f7Popover: PopoverNamespace.Popover
*/

export default {
  name: 'f7-popover',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    opened: Boolean,
    target: [String, Object],
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeByOutsideClick: Boolean,
    closeOnEscape: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
    } = props;
    const classes = Utils.classNames(
      className,
      'popover',
      Mixins.colorClasses(props),
    );
    return (
      <div
        ref="el"
        id={id}
        style={style}
        className={classes}
      >
        <div className="popover-angle" />
        <div className="popover-inner">
          <slot />
        </div>
      </div>
    );
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Popover) return;
      if (opened) {
        self.f7Popover.open();
      } else {
        self.f7Popover.close();
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
    el.addEventListener('popover:open', self.onOpen);
    el.addEventListener('popover:opened', self.onOpened);
    el.addEventListener('popover:close', self.onClose);
    el.addEventListener('popover:closed', self.onClosed);

    const props = self.props;
    const {
      target,
      opened,
      backdrop,
      backdropEl,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
    } = props;

    const popoverParams = { el };
    if (target) popoverParams.targetEl = target;

    if (process.env.COMPILER === 'vue') {
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') popoverParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.closeByOutsideClick !== 'undefined') popoverParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof self.$options.propsData.closeOnEscape !== 'undefined') popoverParams.closeOnEscape = closeOnEscape;
      if (typeof self.$options.propsData.backdrop !== 'undefined') popoverParams.backdrop = backdrop;
      if (typeof self.$options.propsData.backdropEl !== 'undefined') popoverParams.backdropEl = backdropEl;
    }
    if (process.env.COMPILER === 'react') {
      if ('closeByBackdropClick' in props) popoverParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) popoverParams.closeByOutsideClick = closeByOutsideClick;
      if ('closeOnEscape' in props) popoverParams.closeOnEscape = closeOnEscape;
      if ('backdrop' in props) popoverParams.backdrop = backdrop;
      if ('backdropEl' in props) popoverParams.backdropEl = backdropEl;
    }

    self.$f7ready(() => {
      self.f7Popover = self.$f7.popover.create(popoverParams);

      if (opened && target) {
        self.f7Popover.open(target, false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Popover) self.f7Popover.destroy();
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('popover:open', self.onOpen);
    el.removeEventListener('popover:opened', self.onOpened);
    el.removeEventListener('popover:close', self.onClose);
    el.removeEventListener('popover:closed', self.onClosed);
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('popover:open popoverOpen', event);
    },
    onOpened(event) {
      this.dispatchEvent('popover:opened popoverOpened', event);
    },
    onClose(event) {
      this.dispatchEvent('popover:close popoverClose', event);
    },
    onClosed(event) {
      this.dispatchEvent('popover:closed popoverClosed', event);
    },
    open(target, animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popover.open(self.refs.el, target, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.sheet.close(self.refs.el, animate);
    },
  },
};
