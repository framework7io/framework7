import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

/* phenome-dts-imports
import { Actions as ActionsNamespace } from 'framework7/components/actions/actions';
*/

/* phenome-dts-instance
f7Actions: ActionsNamespace.Actions
*/

export default {
  name: 'f7-actions',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    opened: Boolean,
    grid: Boolean,
    convertToPopover: Boolean,
    forceToPopover: Boolean,
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
      grid,
    } = props;

    const classes = Utils.classNames(
      className,
      'actions-modal',
      {
        'actions-grid': grid,
      },
      Mixins.colorClasses(props),
    );
    return (
      <div id={id} style={style} ref="el" className={classes}>
        <slot />
      </div>
    );
  },
  watch: {
    'props.opened': function watchOpened(opened) {
      const self = this;
      if (!self.f7Actions) return;
      if (opened) {
        self.f7Actions.open();
      } else {
        self.f7Actions.close();
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
    const {
      grid,
      target,
      convertToPopover,
      forceToPopover,
      opened,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
      backdrop,
      backdropEl,
    } = props;

    const actionsParams = {
      el,
      grid,
      on: {
        open: self.onOpen,
        opened: self.onOpened,
        close: self.onClose,
        closed: self.onClosed,
      },
    };
    if (target) actionsParams.targetEl = target;

    if (process.env.COMPILER === 'vue') {
      const propsData = self.$options.propsData;
      if (typeof propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = convertToPopover;
      if (typeof propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = forceToPopover;
      if (typeof propsData.backdrop !== 'undefined') actionsParams.backdrop = backdrop;
      if (typeof propsData.backdropEl !== 'undefined') actionsParams.backdropEl = backdropEl;
      if (typeof propsData.closeByBackdropClick !== 'undefined') actionsParams.closeByBackdropClick = closeByBackdropClick;
      if (typeof propsData.closeByOutsideClick !== 'undefined') actionsParams.closeByOutsideClick = closeByOutsideClick;
      if (typeof propsData.closeOnEscape !== 'undefined') actionsParams.closeOnEscape = closeOnEscape;
    }
    if (process.env.COMPILER === 'react') {
      if ('convertToPopover' in props) actionsParams.convertToPopover = convertToPopover;
      if ('forceToPopover' in props) actionsParams.forceToPopover = forceToPopover;
      if ('backdrop' in props) actionsParams.backdrop = backdrop;
      if ('backdropEl' in props) actionsParams.backdropEl = backdropEl;
      if ('closeByBackdropClick' in props) actionsParams.closeByBackdropClick = closeByBackdropClick;
      if ('closeByOutsideClick' in props) actionsParams.closeByOutsideClick = closeByOutsideClick;
      if ('closeOnEscape' in props) actionsParams.closeOnEscape = closeOnEscape;
    }

    self.$f7ready(() => {
      self.f7Actions = self.$f7.actions.create(actionsParams);

      if (opened) {
        self.f7Actions.open(false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Actions) self.f7Actions.destroy();
    delete self.f7Actions;
  },
  methods: {
    onOpen(instance) {
      this.dispatchEvent('actions:open actionsOpen', instance);
    },
    onOpened(instance) {
      this.dispatchEvent('actions:opened actionsOpened', instance);
    },
    onClose(instance) {
      this.dispatchEvent('actions:close actionsClose', instance);
    },
    onClosed(instance) {
      this.dispatchEvent('actions:closed actionsClosed', instance);
    },
    open(animate) {
      const self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.open(animate);
    },
    close(animate) {
      const self = this;
      if (!self.f7Actions) return undefined;
      return self.f7Actions.close(animate);
    },
  },
};
