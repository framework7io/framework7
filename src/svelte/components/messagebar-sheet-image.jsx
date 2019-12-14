
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
        <input ref="inputEl" type="checkbox" checked={checked} onChange={self.onChange} />
      );
    }
    if (process.env.COMPILER === 'vue') {
      inputEl = (
        <input ref="inputEl" type="checkbox" domProps={{ checked }} onChange={self.onChange} />
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
  componentDidCreate() {
    Utils.bindMethods(this, ['onChange']);
  },
  methods: {
    onChange(event) {
      if (this.props.checked) this.dispatchEvent('checked', event);
      else this.dispatchEvent('unchecked', event);
      this.dispatchEvent('change', event);
    },
  },
};
