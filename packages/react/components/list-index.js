import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import __reactComponentWatch from '../runtime-helpers/react-component-watch.js';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';

class F7ListIndex extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.__reactRefs = {};
  }

  update() {
    if (!this.f7ListIndex) return;
    this.f7ListIndex.update();
  }

  scrollListToIndex(indexContent) {
    if (!this.f7ListIndex) return;
    this.f7ListIndex.scrollListToIndex(indexContent);
  }

  render() {
    const props = this.props;
    const {
      className,
      id,
      style
    } = props;
    const classes = Utils.classNames(className, 'list-index', Mixins.colorClasses(props));
    return React.createElement('div', {
      ref: __reactNode => {
        this.__reactRefs['el'] = __reactNode;
      },
      id: id,
      style: style,
      className: classes
    }, this.slots['default']);
  }

  componentDidMount() {
    const self = this;
    if (!self.props.init) return;
    self.$f7ready(f7 => {
      const el = self.refs.el;
      const {
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        auroraItemHeight,
        scrollList,
        label
      } = self.props;
      self.f7ListIndex = f7.listIndex.create({
        el,
        listEl,
        indexes,
        iosItemHeight,
        mdItemHeight,
        auroraItemHeight,
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

  componentWillUnmount() {
    if (!this.props.init) return;

    if (this.f7ListIndex && this.f7ListIndex.destroy) {
      this.f7ListIndex.destroy();
    }
  }

  get slots() {
    return __reactComponentSlots(this.props);
  }

  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }

  get refs() {
    return this.__reactRefs;
  }

  set refs(refs) {}

  componentDidUpdate(prevProps, prevState) {
    __reactComponentWatch(this, 'props.indexes', prevProps, prevState, () => {
      if (!this.f7ListIndex) return;
      this.f7ListIndex.params.indexes = this.props.indexes;
      this.update();
    });
  }

}

__reactComponentSetProps(F7ListIndex, Object.assign({
  id: [String, Number],
  className: String,
  style: Object,
  init: {
    type: Boolean,
    default: true
  },
  listEl: [String, Object],
  indexes: {
    type: [String, Array],
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
  },
  auroraItemHeight: {
    type: Number,
    default: 14
  }
}, Mixins.colorProps));

F7ListIndex.displayName = 'f7-list-index';
export default F7ListIndex;