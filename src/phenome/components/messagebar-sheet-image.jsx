
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';

export default {
  name: 'f7-messagebar-sheet-image',
  props: {
    id: [String, Number],
    className: String, // phenome-react-line
    style: Object, // phenome-react-line
    image: String,
    checked: Boolean,
    ...Mixins.colorProps,
  },
  componentDidCreate() {
    this.onChangeBound = this.onChange.bind(this);
  },
  render() {
    const self = this;
    const props = self.props;
    const {
      image,
      checked,
      id,
      className,
      style,
    } = props;

    const classes = Utils.classNames(
      className,
      'messagebar-sheet-image',
      'checkbox',
      Mixins.colorClasses(props),
    );
    const styles = Utils.extend({
      backgroundImage: image && `url(${image})`,
    }, style || {});

    let inputEl;
    if (process.env.COMPILER === 'react') {
      inputEl = (
        <input type="checkbox" checked={checked} onChange={self.onChangeBound} />
      );
    }
    if (process.env.COMPILER === 'vue') {
      inputEl = (
        <input type="checkbox" domProps={{ checked }} onChange={self.onChangeBound} />
      );
    }
    return (
      <label id={id} className={classes} style={styles}>
        {inputEl}
        <i className="icon icon-checkbox" />
        <slot />
      </label>
    );
  },
  methods: {
    onChange(event) {
      if (this.props.checked) this.dispatchEvent('checked', event);
      else this.dispatchEvent('unchecked', event);
      this.dispatchEvent('change', event);
    },
  },
};
