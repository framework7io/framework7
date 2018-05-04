import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-accordion-item',
  props: {
    opened: Boolean,
    ...Mixins.colorProps,
  },
  componentDidMount() {
    const self = this;
    const el = self.el;
    if (!el) return;
    self.onOpenBound = self.onOpen.bind(self);
    self.onOpenedBound = self.onOpened.bind(self);
    self.onCloseBound = self.onClose.bind(self);
    self.onClosedBound = self.onClosed.bind(self);
    el.addEventListener('accordion:open', self.onOpenBound);
    el.addEventListener('accordion:opened', self.onOpenedBound);
    el.addEventListener('accordion:close', self.onCloseBound);
    el.addEventListener('accordion:closed', self.onClosedBound);
  },
  componentWillUnmount() {
    const self = this;
    const el = self.el;
    if (!el) return;
    el.removeEventListener('accordion:open', self.onOpenBound);
    el.removeEventListener('accordion:opened', self.onOpenedBound);
    el.removeEventListener('accordion:close', self.onCloseBound);
    el.removeEventListener('accordion:closed', self.onClosedBound);
  },
  render() {
    const classes = Utils.classNames(
      this.props.className,
      {
        'accordion-item': true,
        'accordion-item-opened': this.props.opened,
      },
      Mixins.colorClasses(this),
    );
    return (
      <div id={this.props.id} style={this.props.style} className={classes}>
        <slot />
      </div>
    );
  },
  methods: {
    onOpen(event) {
      this.dispatchEvent('accordionOpen accordion:open', event);
    },
    onOpened(event) {
      this.dispatchEvent('accordionOpened accordion:opened', event);
    },
    onClose(event) {
      this.dispatchEvent('accordionClose accordion:close', event);
    },
    onClosed(event) {
      this.dispatchEvent('accordionClosed accordion:closed', event);
    },
  },
};
