import React from 'react';
import Utils from '../utils/utils';
import Mixins from '../utils/mixins';
import F7Link from './link';
import __reactComponentDispatchEvent from '../runtime-helpers/react-component-dispatch-event.js';
import __reactComponentSlots from '../runtime-helpers/react-component-slots.js';
import __reactComponentSetProps from '../runtime-helpers/react-component-set-props.js';
class F7NavLeft extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  onBackClick(e) {
    this.dispatchEvent('back-click backClick click:back clickBack', e);
  }
  get classes() {
    return Utils.classNames(this.props.className, {
      left: true,
      sliding: this.props.slidng
    }, Mixins.colorClasses(this));
  }
  render() {
    const {backLink, backLinkUrl} = this.props;
    let linkEl;
    if (backLink) {
      linkEl = React.createElement(F7Link, {
        href: backLinkUrl || '#',
        back: true,
        icon: 'icon-back',
        className: backLink === true || backLink && this.$theme.md ? 'icon-only' : undefined,
        text: backLink !== true && !this.$theme.md ? backLink : undefined,
        onClick: this.onBackClick.bind(this)
      });
    }
    return React.createElement('div', {
      id: this.props.id,
      style: this.props.style,
      className: this.classes
    }, linkEl, this.slots['default']);
  }
  get slots() {
    return __reactComponentSlots(this.props);
  }
  dispatchEvent(events, ...args) {
    return __reactComponentDispatchEvent(this, events, ...args);
  }
}
__reactComponentSetProps(F7NavLeft, {
  id: [
    String,
    Number
  ],
  backLink: [
    Boolean,
    String
  ],
  backLinkUrl: String,
  sliding: Boolean,
  ...Mixins.colorProps
});
export default F7NavLeft;