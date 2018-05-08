import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-swipeout-button',
  props: {
    id: [String, Number],
    text: String,
    confirmText: String,
    overswipe: Boolean,
    close: Boolean,
    delete: Boolean,
    href: String,
    ...Mixins.colorProps,
  },
  render() {
    this.onClick = this.onClick.bind(this);
    return (
      <a
        href={this.props.href || '#'}
        id={this.props.id}
        style={this.props.style}
        data-confirm={this.props.confirmText || undefined}
        className={this.classes}
        onClick={this.onClick}
      >
        <slot>{this.props.text}</slot>
      </a>
    );
  },
  computed: {
    classes() {
      return Utils.classNames(
        this.props.className,
        {
          'swipeout-overswipe': this.props.overswipe,
          'swipeout-delete': this.props.delete,
          'swipeout-close': this.props.close,
        },
        Mixins.colorClasses(this),
      );
    },
  },
  methods: {
    onClick(event) {
      this.dispatchEvent('click', event);
    },
  },
};
