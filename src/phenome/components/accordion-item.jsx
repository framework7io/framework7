import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-accordion-item',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    opened: Boolean,
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    const self = this;
    self.onBeforeOpenBound = self.onBeforeOpen.bind(self);
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onBeforeCloseBound = self.onBeforeClose.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.addEventListener('accordion:beforeopen', self.onBeforeOpenBound);
    el.addEventListener('accordion:open', self.onOpenBound);
    el.addEventListener('accordion:opened', self.onOpenedBound);
    el.addEventListener('accordion:beforeclose', self.onBeforeCloseBound);
    el.addEventListener('accordion:close', self.onCloseBound);
    el.addEventListener('accordion:closed', self.onClosedBound);
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    el.removeEventListener('accordion:beforeopen', self.onBeforeOpenBound);
    el.removeEventListener('accordion:open', self.onOpenBound);
    el.removeEventListener('accordion:opened', self.onOpenedBound);
    el.removeEventListener('accordion:beforeclose', self.onBeforeCloseBound);
    el.removeEventListener('accordion:close', self.onCloseBound);
    el.removeEventListener('accordion:closed', self.onClosedBound);
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      opened,
    } = props;
    const classes = Utils.classNames(
      className,
      'accordion-item',
      {
        'accordion-item-opened': opened,
      },
      Mixins.colorClasses(props),
    );
    return (
      <div id={id} style={style} className={classes} ref="el">
        <slot />
      </div>
    );
  },
  methods: {
    onBeforeOpen(event) {
      this.dispatchEvent('accordionBeforeOpen accordion:beforeopen', event, event.detail.prevent);
    },
    onOpen(event) {
      this.dispatchEvent('accordionOpen accordion:open', event);
    },
    onOpened(event) {
      this.dispatchEvent('accordionOpened accordion:opened', event);
    },
    onBeforeClose(event) {
      this.dispatchEvent('accordionBeforeClose accordion:beforeclose', event, event.detail.prevent);
    },
    onClose(event) {
      this.dispatchEvent('accordionClose accordion:close', event);
    },
    onClosed(event) {
      this.dispatchEvent('accordionClosed accordion:closed', event);
    },
  },
};
