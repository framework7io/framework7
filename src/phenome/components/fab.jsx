import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

/* phenome-dts-imports
import { Tooltip as TooltipNamespace } from 'framework7/components/tooltip/tooltip';
*/

/* phenome-dts-instance
f7Tooltip: TooltipNamespace.Tooltip
*/

export default {
  name: 'f7-fab',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    morphTo: String,
    href: [Boolean, String],
    target: String,
    text: String,
    position: {
      type: String,
      default: 'right-bottom',
    },
    tooltip: String,
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      morphTo,
      href: initialHref,
      position,
      text,
      target,
    } = props;

    let href = initialHref;
    if (href === true) href = '#';
    if (href === false) href = undefined; // no href attribute

    const linkChildren = [];
    const rootChildren = [];

    const { link: linkSlots, default: defaultSlots, root: rootSlots, text: textSlots } = self.slots;

    if (defaultSlots) {
      for (let i = 0; i < defaultSlots.length; i += 1) {
        const child = defaultSlots[i];
        let isRoot;
        if (process.env.COMPILER === 'react') {
          const tag = child.type && (child.type.displayName || child.type.name);
          if (tag === 'F7FabButtons' || tag === 'f7-fab-buttons') isRoot = true;
        }
        if (process.env.COMPILER === 'vue') {
          if (child.tag && child.tag.indexOf('fab-buttons') >= 0) isRoot = true;
        }
        if (isRoot) rootChildren.push(child);
        else linkChildren.push(child);
      }
    }
    let textEl;
    if (text || (textSlots && textSlots.length)) {
      textEl = (
        <div className="fab-text">{text || textSlots}</div>
      );
    }
    let linkEl;
    if (linkChildren.length || (linkSlots && linkSlots.length)) {
      linkEl = (
        <a ref="linkEl" target={target} href={href} key="f7-fab-link">
          {linkChildren}
          {textEl}
          {linkSlots}
        </a>
      );
    }

    const classes = Utils.classNames(
      className,
      'fab',
      `fab-${position}`,
      {
        'fab-morph': morphTo,
        'fab-extended': typeof textEl !== 'undefined',
      },
      Mixins.colorClasses(props),
    );
    return (
      <div
        id={id}
        style={style}
        className={classes}
        data-morph-to={morphTo}
      >
        {linkEl}
        {rootChildren}
        {rootSlots}
      </div>
    );
  },
  watch: {
    'props.tooltip': function watchTooltip(newText) {
      const self = this;
      if (!newText || !self.f7Tooltip) return;
      self.f7Tooltip.setText(newText);
    },
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick'])
  },
  componentDidMount() {
    const self = this;
    if (self.refs.linkEl) {
      self.refs.linkEl.addEventListener('click', self.onClick);
    }
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
    if (self.refs.linkEl) {
      self.refs.linkEl.removeEventListener('click', self.onClick);
    }
    if (self.f7Tooltip && self.f7Tooltip.destroy) {
      self.f7Tooltip.destroy();
      self.f7Tooltip = null;
      delete self.f7Tooltip;
    }
  },
  methods: {
    onClick(event) {
      const self = this;
      self.dispatchEvent('click', event);
    },
  },
};
