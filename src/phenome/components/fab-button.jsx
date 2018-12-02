import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
*/

export default {
  name: 'f7-fab-button',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    fabClose: Boolean,
    label: String,
    target: String,
    tooltip: String,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      fabClose,
      label,
      target,
    } = props;

    const classes = Utils.classNames(
      className,
      {
        'fab-close': fabClose,
        'fab-label-button': label,
      },
      Mixins.colorClasses(props),
    );

    let labelEl;
    if (label) {
      labelEl = (
        <span className="fab-label">{label}</span>
      );
    }

    return (
      <a
        ref="el"
        id={id}
        style={style}
        target={target}
        className={classes}
      >
        <slot />
        {labelEl}
      </a>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick'])
  },
  componentDidCreate() {
    this.onClick = this.onClick.bind(this);
  },
  componentDidMount() {
    const self = this;
    self.refs.el.addEventListener('click', self.onClick);
    const { tooltip } = self.props;
    if (!tooltip) return;
    self.$f7ready((f7) => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: self.refs.el,
        text: tooltip,
      });
    });
  },
  componentWillUnmount() {
    const self = this;
    self.refs.el.removeEventListener('click', self.onClick);
    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
  },
};
