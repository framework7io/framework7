import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-swipeout-button',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    text: String,
    confirmText: String,
    overswipe: Boolean,
    close: Boolean,
    delete: Boolean,
    href: String,
    ...Mixins.colorProps,
  },
  render() {
    const props = this.props;
    const {
      className,
      id,
      style,
      overswipe,
      delete: deleteProp,
      close,
      href,
      confirmText,
      text,
    } = props;

    const classes = Utils.classNames(
      className,
      {
        'swipeout-overswipe': overswipe,
        'swipeout-delete': deleteProp,
        'swipeout-close': close,
      },
      Mixins.colorClasses(props),
    );

    return (
      <a
        href={href || '#'}
        id={id}
        style={style}
        data-confirm={confirmText || undefined}
        className={classes}
        onClick={this.onClick.bind(this)}
      >
        <slot>{text}</slot>
      </a>
    );
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
