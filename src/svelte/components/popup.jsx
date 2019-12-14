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
    animate: Boolean,
    backdrop: Boolean,
    backdropEl: [String, Object, window.HTMLElement],
    closeByBackdropClick: Boolean,
    closeOnEscape: Boolean,
    swipeToClose: {
      type: [Boolean, String],
      default: false,
    },
    swipeHandler: [String, Object, window.HTMLElement],
    push: Boolean,
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
      push,
    } = props;

    const classes = Utils.classNames(
      className,
      'popup',
      {
        'popup-tablet-fullscreen': tabletFullscreen,
        'popup-push': push,
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

    const props = self.props;
    const { closeByBackdropClick, backdrop, backdropEl, animate, closeOnEscape, swipeToClose, swipeHandler } = props;

    const popupParams = {
      el,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed,
      },
    };

    if (process.env.COMPILER === 'vue') {
      const propsData = self.$options.propsData;
      if (typeof propsData.closeByBackdropClick !== 'undefined') popupParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeOnEscape !== 'undefined') popupParams.closeOnEscape = closeOnEscape;
      if (typeof propsData.animate !== 'undefined') popupParams.animate = animate;
      if (typeof propsData.backdrop !== 'undefined') popupParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') popupParams.backdropEl = backdropEl;
      if (typeof propsData.swipeToClose !== 'undefined') popupParams.swipeToClose = swipeToClose;
      if (typeof propsData.swipeHandler !== 'undefined') popupParams.swipeHandler = swipeHandler;
    }
    if (process.env.COMPILER === 'react') {
      if ('closeByBackdropClick' in props) popupParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeOnEscape' in props) popupParams.closeOnEscape = closeOnEscape;
      if ('animate' in props) popupParams.animate = animate;
      if ('backdrop' in props) popupParams.backdrop = backdrop;
      if ('backdropEl' in props) popupParams.backdropEl = backdropEl;
      if ('swipeToClose' in props) popupParams.swipeToClose = swipeToClose;
      if ('swipeHandler' in props) popupParams.swipeHandler = swipeHandler;
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
  },
  methods: {
    onOpen(instance) {
      this.dispatchEvent('popup:open popupOpen', instance);
    },
    onOpened(instance) {
      this.dispatchEvent('popup:opened popupOpened', instance);
    },
    onClose(instance) {
      this.dispatchEvent('popup:close popupClose', instance);
    },
    onClosed(instance) {
      this.dispatchEvent('popup:closed popupClosed', instance);
    },
    open(animate) {
      const self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.open(animate);
    },
    close(animate) {
      const self = this;
      if (!self.f7Popup) return undefined;
      return self.f7Popup.close(animate);
    },
  },
};
