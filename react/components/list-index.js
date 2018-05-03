import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
const ListIndexProps = Utils.extend({
  init: {
    type: Boolean,
    default: true
  },
  listEl: [
    String,
    Object
  ],
  indexes: {
    type: [
      String,
      Array
    ],
    default: 'auto'
  },
  scrollList: {
    type: Boolean,
    default: true
  },
  label: {
    type: Boolean,
    default: false
  },
  iosItemHeight: {
    type: Number,
    default: 14
  },
  mdItemHeight: {
    type: Number,
    default: 14
  }
}, Mixins.colorProps);
class F7ListIndex extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return React.createElement('div', {
      ref: 'el',
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, this.slots['default']);
  }
  get classes() {
    const self = this;
    return Utils.classNames(this.props.className, 'list-index', Mixins.colorClasses(self));
  }
  componentWillUnmount() {
    if (!this.props.init)
      return;
    if (this.f7ListIndex && this.f7ListIndex.destroy) {
      this.f7ListIndex.destroy();
    }
  }
  componentDidMount() {
    const self = this;
    if (!self.props.init)
      return;
    self.$f7ready(f7 => {
      const el = self.refs.el;
      const {listEl, indexes, iosItemHeight, mdItemHeight, scrollList, label} = self.props;
      self.f7ListIndex = f7.listIndex.create({
        el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        scrollList,
        label,
        on: {
          select(index, itemContent, itemIndex) {
            self.dispatchEvent('listindex:select listIndexSelect', itemContent, itemIndex);
          }
        }
      });
    });
  }
  update() {
    if (!this.f7ListIndex)
      return;
    this.f7ListIndex.update();
  }
  scrollListToIndex(indexContent) {
    if (!this.f7ListIndex)
      return;
    this.f7ListIndex.scrollListToIndex(indexContent);
  }
  get slots() {
    return __reactComponentSlots(this);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.indexes', prevProps, prevState, () => {
      if (!this.f7ListIndex)
        return;
      this.f7ListIndex.params.indexes = this.indexes;
      this.update();
    });
  }
}
__reactComponentSetProps(F7ListIndex, ListIndexProps);
export default F7ListIndex;