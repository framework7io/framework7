import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
*/

export default {
  name: 'f7-badge',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    tooltip: String,
    tooltipTrigger: String,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'badge',
      Mixins.colorClasses(props),
    );
    return <span ref="el" id={id} style={style} className={classes}><slot /></span>;
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText && self.f7Tooltip) {
        self.f7Tooltip.destroy();
        self.f7Tooltip = null;
        delete self.f7Tooltip;
        return;
      }
      if (newText && !self.f7Tooltip && self.$f7) {
        self.f7Tooltip = self.$f7.tooltip.create({
          targetEl: self.refs.el,
          text: newText,
          trigger: self.props.tooltipTrigger,
        });
        return;
      }
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
  },
  componentDidMount() {
    const self = this;
    const el = self.refs.el;
    if (!el) return;
    const { tooltip, tooltipTrigger } = self.props;
    if (!tooltip) return;

    self.$f7ready((f7) => {
      self.f7Tooltip = f7.tooltip.create({
        targetEl: el,
        text: tooltip,
        trigger: tooltipTrigger,
      });
    });
  },
  componentWillUnmount() {
    const self = this;
    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },
};
