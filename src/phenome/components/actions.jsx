import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-actions',
  props: {
    id: [String, Number],
    opened: Boolean,
    grid: Boolean,
    convertToPopover: Boolean,
    forceToPopover: Boolean,
    target: [String, Object],
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
    } = props;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('actions:open', self.onOpenBound);
    el.addEventListener('actions:opened', self.onOpenedBound);
    el.addEventListener('actions:close', self.onCloseBound);
    el.addEventListener('actions:closed', self.onClosedBound);
    self.$f7ready(() => {
      const actionsParams = {
        el: self.refs.el,
        grid,
      };
      if (target) actionsParams.targetEl = target;

      // phenome-vue-next-line
      if (typeof self.$options.propsData.convertToPopover !== 'undefined') actionsParams.convertToPopover = convertToPopover;
      // phenome-vue-next-line
      if (typeof self.$options.propsData.forceToPopover !== 'undefined') actionsParams.forceToPopover = forceToPopover;

      // phenome-react-next-line
      if ('convertToPopover' in props) actionsParams.convertToPopover = convertToPopover;
      // phenome-react-next-line
      if ('forceToPopover' in props) actionsParams.forceToPopover = forceToPopover;

      self.f7Actions = self.$f7.actions.create(actionsParams);

      if (opened) {
        self.f7Actions.open(false);
      }
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Actions) self.f7Actions.destroy();
    const el = self.el;
    if (!el) return;
    el.removeEventListener('actions:open', self.onOpenBound);
    el.removeEventListener('actions:opened', self.onOpenedBound);
    el.removeEventListener('actions:close', self.onCloseBound);
    el.removeEventListener('actions:closed', self.onClosedBound);
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('actions:open actionsOpen', event);
    },
    onOpened(event) {
      this.dispatchEvent('actions:opened actionsOpened', event);
    },
    onClose(event) {
      this.dispatchEvent('actions:close actionsClose', event);
    },
    onClosed(event) {
      this.dispatchEvent('actions:closed actionsClosed', event);
    },
    open(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.open(self.refs.el, animate);
    },
    close(animate) {
      const self = this;
      if (!self.$f7) return undefined;
      return self.$f7.actions.close(self.refs.el, animate);
    },
  },
};
