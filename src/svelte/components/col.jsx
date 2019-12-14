import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-col',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    tag: {
      type: String,
      default: 'div',
    },
    width: {
      type: [Number, String],
      default: 'auto',
    },
    xsmall: { type: [Number, String] },
    small: { type: [Number, String] },
    medium: { type: [Number, String] },
    large: { type: [Number, String] },
    xlarge: { type: [Number, String] },
    resizable: Boolean,
    resizableFixed: Boolean,
    resizableAbsolute: Boolean,
    resizableHandler: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      className,
      id,
      style,
      tag,
      width,
      xsmall,
      small,
      medium,
      large,
      xlarge,
      resizable,
      resizableFixed,
      resizableAbsolute,
      resizableHandler,
    } = props;

    const ColTag = tag;

    const classes = Utils.classNames(
      className,
      {
        col: width === 'auto',
        [`col-${width}`]: width !== 'auto',
        [`xsmall-${xsmall}`]: xsmall,
        [`small-${small}`]: small,
        [`medium-${medium}`]: medium,
        [`large-${large}`]: large,
        [`xlarge-${xlarge}`]: xlarge,
        resizable,
        'resizable-fixed': resizableFixed,
        'resizable-absolute': resizableAbsolute,
      },
      Mixins.colorClasses(props),
    );

    return (
      <ColTag id={id} style={style} className={classes} ref="el">
        <slot />
        {resizable && resizableHandler && (
          <span className="resize-handler" />
        )}
      </ColTag>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick', 'onResize']);
  },
  componentDidMount() {
    const self = this;
    self.eventTargetEl = self.refs.el;
    self.eventTargetEl.addEventListener('click', self.onClick);
    self.$f7ready((f7) => {
      f7.on('gridResize', self.onResize);
    });
  },
  componentWillUnmount() {
    const self = this;
    const el = self.refs.el;
    if (!el || !self.$f7) return;
    el.removeEventListener('click', self.onClick);
    self.$f7.off('gridResize', self.onResize);
    delete self.eventTargetEl;
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
    onResize(el) {
      if (el === this.eventTargetEl) {
        this.dispatchEvent('grid:resize gridResize');
      }
    },
  },
};
