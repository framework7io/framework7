import Mixins from '../utils/mixins';
import Utils from '../utils/utils';

export default {
  name: 'f7-actions-button',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    bold: Boolean,
    close: {
      type: Boolean,
      default: true,
    },
    ...Mixins.colorProps,
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      id,
      className,
      style,
      bold,
    } = props;

    let mediaEl;

    if (self.slots.media && self.slots.media.length) {
      mediaEl = (
        <div className="actions-button-media">
          <slot name="media" />
        </div>
      );
    }

    const classes = Utils.classNames(
      className,
      {
        'actions-button': true,
        'actions-button-bold': bold,
      },
      Mixins.colorClasses(props),
    );

    return (
      <div id={id} style={style} className={classes} ref="el">
        { mediaEl }
        <div className="actions-button-text">
          <slot />
        </div>
      </div>
    );
  },
  componentDidCreate() {
    Utils.bindMethods(this, ['onClick'])
  },
  componentDidMount() {
    this.refs.el.addEventListener('click', this.onClick);
  },
  componentWillUnmount() {
    this.refs.el.removeEventListener('click', this.onClick);
  },
  methods: {
    onClick(event) {
      const self = this;
      const $$ = self.$$;
      const el = self.refs.el;
      if (self.props.close && self.$f7 && el) {
        self.$f7.actions.close($$(el).parents('.actions-modal'));
      }
      self.dispatchEvent('click', event);
    },
  },
};
