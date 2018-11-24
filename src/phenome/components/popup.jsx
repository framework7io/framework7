import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

/* phenome-dts-imports
import { Popup as PopupNamespace } from 'framework7/components/popup/popup';
*/

/* phenome-dts-instance
f7Popup: PopupNamespace.Popup
*/

export default {
  name: 'f7-popup',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    tabletFullscreen: Boolean,
    opened: Boolean,
    closeByBackdropClick: Boolean,
    backdrop: Boolean,
    animate: Boolean,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tabletFullscreen,
    } = props;

    const classes = Utils.classNames(
      className,
      'popup',
      {
        'popup-tablet-fullscreen': tabletFullscreen,
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
        <slot />
      </div>
    );
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Popup) return;
      if (opened) {
        self.f7Popup.open();
      } else {
        self.f7Popup.close();
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
    el.addEventListener('popup:open', self.onOpen);
    el.addEventListener('popup:opened', self.onOpened);
    el.addEventListener('popup:close', self.onClose);
    el.addEventListener('popup:closed', self.onClosed);

    const props = self.props;
    const { closeByBackdropClick, backdrop, animate } = props;

    const popupParams = { el };

    if (process.env.COMPILER === 'vue') {
      if (typeof self.$options.propsData.closeByBackdropClick !== 'undefined') popupParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof self.$options.propsData.animate !== 'undefined') popupParams.animate = animate;
      if (typeof self.$options.propsData.backdrop !== 'undefined') popupParams.backdrop = backdrop;
    }
    if (process.env.COMPILER === 'react') {
      if ('closeByBackdropClick' in props) popupParams.closeByBackdropClick = closeByBackdropClick;
      if ('animate' in props) popupParams.animate = animate;
      if ('backdrop' in props) popupParams.backdrop = backdrop;
    }

    self.$f7ready(() => {
      self.f7Popup = self.$f7.popup.create(popupParams);
      if (self.props.opened) {
        self.f7Popup.open(false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Popup) self.f7Popup.destroy();
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('popup:open', self.onOpen);
    el.removeEventListener('popup:opened', self.onOpened);
    el.removeEventListener('popup:close', self.onClose);
    el.removeEventListener('popup:closed', self.onClosed);
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('popup:open popupOpen', event);
    },
    onOpened(event) {
      this.dispatchEvent('popup:opened popupOpened', event);
    },
    onClose(event) {
      this.dispatchEvent('popup:close popupClose', event);
    },
    onClosed(event) {
      this.dispatchEvent('popup:closed popupClosed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.open(self.refs.el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.popup.close(self.refs.el, animate);
    },
  },
};
